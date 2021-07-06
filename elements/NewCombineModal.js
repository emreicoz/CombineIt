import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {Toast, Root} from 'native-base';
import {Checkbox} from 'react-native-paper';
import CombineOneCard from './CombineOneCard';
import CombineTwoCard from './CombineTwoCard';

import firestore from '@react-native-firebase/firestore';

export default function newCombineModal(props) {
  const [firstChecked, setFirstChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);
  const [giveMeMyCombine, setGiveMeMyCombine] = useState(false);
  const [wardrobe, setWardrobe] = useState();
  const [likedCombine, setLikedCombine] = useState();
  const [mergedWardrobe, setMergedWardrobe] = useState();
  const [apiData, setApiData] = useState();

  const getLikedCombines = () => {
    firestore()
      .collection('users')
      .doc(props.currentUser.userId)
      .collection('likedCombines')
      .limit(1)
      .onSnapshot(clothesCollection => {
        const likedArray = [];
        clothesCollection.forEach(clotheDocument => {
          likedArray.push({
            ...clotheDocument.data(),
          });
        });
        if (likedArray.length > 0) {
          setLikedCombine(likedArray[0]);
          console.log('Likedcombine firestoredan çekildi ', likedArray[0]);
        } else {
          setLikedCombine(null);
          console.log('Likedcombine firestoredan boş geldi ');

        }
      });
  };
  const getUsersWardrobe = () => {
    firestore()
      .collection('users')
      .doc(props.currentUser.userId)
      .collection('clothes')
      .onSnapshot(clothesCollection => {
        const tempClothes = [];
        clothesCollection.forEach(clotheDocument => {
          tempClothes.push({
            ...clotheDocument.data(),
          });
        });
        if (tempClothes.length > 0) {
          setWardrobe(tempClothes);
          console.log(
            'Kombin önerisi yaparken kullanılacak gardırop firestoredan çekildi ',
            tempClothes.length,
          );
        }
      });
  };

  const mergeWardrobe = () => {
    if (likedCombine) {
      const mergedWardrobeArray = [];
      wardrobe.forEach(combine => {
        mergedWardrobeArray.push(combine);
      });
      mergedWardrobeArray.push(likedCombine.combineInfo.topClothe);
      mergedWardrobeArray.push(likedCombine.combineInfo.bottomClothe);
      mergedWardrobeArray.push(likedCombine.combineInfo.shoeClothe);
      console.log(
        'wardrobe and likedcombine merged',
        mergedWardrobeArray.length,
      );
      setMergedWardrobe(mergedWardrobeArray);
    } else {
      setMergedWardrobe(wardrobe);
      console.log('wardrobe  merged', wardrobe.length);
    }
  };

  const getApi = async () => {
    let top = 0;
    let bottom = 0;
    let shoe = 0;

    if (likedCombine) {
      top = parseInt(likedCombine.combineInfo.topClothe.clotheId);
      bottom = parseInt(likedCombine.combineInfo.bottomClothe.clotheId);
      shoe = parseInt(likedCombine.combineInfo.shoeClothe.clotheId);
    } else {
      while (true) {
        var randomNumber =
          Math.floor(Math.random() * (mergedWardrobe.length - 1)) + 0;
        console.log(randomNumber);
        if (mergedWardrobe[randomNumber].clotheTopCategory == 'Üst Giyim') {
          top = parseInt(mergedWardrobe[randomNumber].clotheId);
        } else if (
          mergedWardrobe[randomNumber].clotheTopCategory == 'Alt Giyim'
        ) {
          bottom = parseInt(mergedWardrobe[randomNumber].clotheId);
        } else if (
          mergedWardrobe[randomNumber].clotheTopCategory == 'Ayakkabı'
        ) {
          shoe = parseInt(mergedWardrobe[randomNumber].clotheId);
        }
        if (top != 0 && bottom != 0 && shoe != 0) {
          break;
        }
      }
    }

    /*let top = likedCombine.combineInfo.topClothe.clotheId;
    let bottom = likedCombine.combineInfo.bottomClothe.clotheId;
    let shoe = likedCombine.combineInfo.shoeClothe.clotheId;*/
    /*let top = 57202118459;
    let bottom = 57202118220;
    let shoe = 57202118951;*/
    console.log('toptoptoptoptoptoptoptoptoptop', top);
    console.log('bottombottombottombottombottom', bottom);
    console.log('shoeshoeshoeshoeshoeshoeshoe', shoe);

    try {
      await fetch('https://combineit.pythonanywhere.com/post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          wardrobe: mergedWardrobe,
          top: top,
          bottom: bottom,
          shoe: shoe,
        }),
      })
        .then(response => response.json())
        .then(json => {
          const jsonobj = JSON.parse(json.recommendations);
          console.log('JSON responee : ------------ ', jsonobj);
          setApiData(jsonobj);
          console.log('JSON responee : ------------ ', jsonobj[0]);
          return json;
        });
    } catch (error) {
      console.error('ERror : ', error);
    }
    console.log('Api a ulaşıldı');
  };

  const getCombine = async () => {
    if (wardrobe && wardrobe.length > 3) {
      await getApi();
      setGiveMeMyCombine(true);
    } else {
      props.setModalVisible(false);
      Toast.show({
        text:
          'Lütfen öncelikle kombin önerisi yapılacak en az 3 kıyafet ekleyin !',
        type: 'warning',
      });
    }
  };

  const deleteFromLikedCombines = () => {
    if (likedCombine) {
      firestore()
        .collection('users')
        .doc(props.currentUser.userId)
        .collection('likedCombines')
        .doc(likedCombine.combineInfo.combineId)
        .delete()
        .then(() => {
          console.log(
            'deletefromlikedcombines ile kombin firestoredan silindi',
          );
        });
    }
  };

  return (
    <Root>
      <View style={styles.container}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={props.modalVisible}
          onRequestClose={() => {
            props.setModalVisible(false);
            setFirstChecked(false);
            setSecondChecked(false);
          }}
          onShow={() => {
            getLikedCombines();
            getUsersWardrobe();
          }}>
          <TouchableOpacity
            style={styles.modalOut}
            activeOpacity={1}
            onPressOut={() => {
              props.setModalVisible(false);
              setFirstChecked(false);
              setSecondChecked(false);
              setGiveMeMyCombine(false);
            }}>
            <TouchableWithoutFeedback>
              {giveMeMyCombine ? (
                <View style={styles.combineModalContainer}>
                  {firstChecked ? (
                    <CombineOneCard
                      wardrobe={wardrobe}
                      top={apiData[0]}
                      bottom={apiData[1]}
                      shoe={apiData[2]}
                      currentUser={props.currentUser}
                      closeModal={() => {
                        props.setModalVisible(false);
                        setGiveMeMyCombine(false);
                        deleteFromLikedCombines();
                        setFirstChecked(false);
                        setSecondChecked(false);
                      }}
                    />
                  ) : secondChecked ? (
                    <CombineTwoCard />
                  ) : null}
                </View>
              ) : (
                <View style={styles.modalContainer}>
                  <View
                    style={{width: 300, marginBottom: 15, alignSelf: 'center'}}>
                    <Text
                      style={{
                        color: '#4169E1',
                        fontWeight: 'bold',
                        fontSize: 17,
                        textAlign: 'center',
                      }}>
                      Hangi kombin önerisini istersiniz ?
                    </Text>
                  </View>
                  <View style={styles.centeredView}>
                    <View style={styles.checkboxContainer}>
                      <Checkbox
                        status={firstChecked ? 'checked' : 'unchecked'}
                        color={'#8A2BE2'}
                        onPress={() => {
                          setFirstChecked(!firstChecked);
                          setSecondChecked(false);
                          mergeWardrobe();
                        }}
                      />
                      <View style={styles.packages}>
                        <Text style={styles.checkboxText}>Üst Giyim</Text>
                        <Text style={styles.checkboxText}>Alt Giyim</Text>
                        <Text style={styles.checkboxText}>Ayakkabı</Text>
                      </View>
                    </View>
                    {/*<View style={styles.checkboxContainer}>
                      <Checkbox
                        status={secondChecked ? 'checked' : 'unchecked'}
                        color={'#8A2BE2'}
                        onPress={() => {
                          setSecondChecked(!secondChecked);
                          setFirstChecked(false);
                        }}
                      />
                      <View style={styles.packages}>
                        <Text style={styles.checkboxText}>Tek Parça</Text>
                        <Text style={styles.checkboxText}>Ayakkabı</Text>
                      </View>
                      </View>*/}
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      getCombine();
                    }}
                    disabled={!firstChecked && !secondChecked}
                    style={
                      !firstChecked && !secondChecked
                        ? styles.buttonDisabled
                        : styles.button
                    }>
                    <Text style={styles.textStyle}>Öneri Yap</Text>
                  </TouchableOpacity>
                </View>
              )}
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#FDF5E6',
    padding: 15,
    borderRadius: 30,
  },
  combineModalContainer: {
    width: '80%',
    height: '90%',
    backgroundColor: '#FDF5E6',
    padding: 15,
    borderRadius: 30,
  },
  modalOut: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  centeredView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    backgroundColor: '#ADD8E6',
    padding: 10,
    borderRadius: 20,
    borderColor: '#6495ED',
  },
  packages: {
    flexDirection: 'column',
    marginLeft: 5,
  },
  checkboxText: {
    color: '#191970',
    marginVertical: 2,
  },
  button: {
    backgroundColor: '#008080',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#808080',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    marginTop: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
