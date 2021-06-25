import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import CombineOneCard from './CombineOneCard';
import CombineTwoCard from './CombineTwoCard';

import firestore from '@react-native-firebase/firestore';

export default function newCombineModal(props) {
  const [firstChecked, setFirstChecked] = useState(false);
  const [secondChecked, setSecondChecked] = useState(false);
  const [giveMeMyCombine, setGiveMeMyCombine] = useState(false);
  const [wardrobe, setWardrobe] = useState([]);
  const [apiData, setApiData] = useState();

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }
  const getWardrobe = () => {
    firestore()
      .collection('users')
      .doc(props.currentUser.userId)
      .collection('clothes')
      .onSnapshot(clothesCollection => {
        const tempClothes = [];
        clothesCollection.forEach(clotheDocument => {
          let category = clotheDocument.data().clotheTopCategory;
          tempClothes.push({
            title: category,
            ...clotheDocument.data(),
          });
        });
        const clothesMap = groupBy(
          tempClothes,
          clothe => clothe.clotheTopCategory,
        );
        const clothesArray = Array.from(clothesMap, ([category, clothes]) => ({
          category,
          clothes,
        }));
        clothesArray.sort((a, b) => (a.category > b.category ? 1 : -1));
        setWardrobe(clothesArray);
        console.log(
          'Kombin önerisi yaparken kullanılacak gardırop firestoredan çekildi ',
          clothesArray,
        );
      });
  };

  const getApi = async () => {
    try {
      await fetch('https://combineit.pythonanywhere.com/post', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstParam: 'yourValue',
          secondParam: {
            lol: 'loll',
            hoh: 'hohh',
          },
        }),
      })
        .then(response => response.json())
        .then(json => {
          setApiData(json);
          console.log(json);
          return json;
        });
    } catch (error) {
      console.error('ERror : ', error);
    }
    console.log('Api a ulaşıldı');
  };

  const getCombine = () => {
    getWardrobe();
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          props.setModalVisible(false);
        }}>
        <TouchableOpacity
          style={styles.modalOut}
          activeOpacity={1}
          onPressOut={() => {
            props.setModalVisible(false);
          }}>
          <TouchableWithoutFeedback>
            {giveMeMyCombine ? (
              <View style={styles.combineModalContainer}>
                {firstChecked ? (
                  <CombineOneCard />
                ) : secondChecked ? (
                  <CombineTwoCard />
                ) : null}
                <View style={styles.likeDislikeContainer}>
                  <TouchableOpacity>
                    <Image
                      source={require('../images/thumb-up.png')}
                      style={styles.likeButton}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('../images/thumb-down.png')}
                      style={styles.dislikeButton}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                  onPress={() => {
                    setGiveMeMyCombine(false);
                  }}>
                  <Text>Geri Dön</Text>
                </TouchableOpacity>
                </View>
                
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
                      }}
                    />
                    <View style={styles.packages}>
                      <Text style={styles.checkboxText}>Üst Giyim</Text>
                      <Text style={styles.checkboxText}>Alt Giyim</Text>
                      <Text style={styles.checkboxText}>Ayakkabı</Text>
                    </View>
                  </View>
                  <View style={styles.checkboxContainer}>
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
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setGiveMeMyCombine(true);
                    getApi();
                  }}
                  disabled={!firstChecked && !secondChecked}
                  style={
                    !firstChecked && !secondChecked
                      ? styles.buttonDisabled
                      : styles.button
                  }>
                  <Text style={styles.textStyle}>Kombin Öner</Text>
                </TouchableOpacity>
              </View>
            )}
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </Modal>
    </View>
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
  likeDislikeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  likeButton: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  dislikeButton: {
    width: 45,
    height: 45,
  },
});
