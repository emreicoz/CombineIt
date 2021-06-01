import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Image,
  FlatList,
  Modal,
} from 'react-native';
import ImagePickerModal from '../elements/ImagePickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Picker} from 'native-base';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

export default function NewClothe({navigation}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [profilePict, setProfilePict] = useState();
  const launchCam = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setProfilePict(response);
        setModalVisible(false);
      }
    });
  };
  const launchImageLib = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);
      setModalVisible(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setProfilePict(response);
      }
    });
  };
  const colors = [
    {
      color: '#154',
    },
    {
      color: '#547',
    },
    {
      color: '#215',
    },
    {
      color: '#985',
    },
    {
      color: '#abf',
    },
    {
      color: '#acd',
    },
    {
      color: '#154',
    },
    {
      color: '#547',
    },
    {
      color: '#215',
    },
    {
      color: '#985',
    },
    {
      color: '#abf',
    },
    {
      color: '#acd',
    },
  ];
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [clothe, setClothe] = useState({
    id: '0',
    color: '#fff',
    category: 'Ceket',
    season: 'İlkbahar',
    topCategory: '',
  });
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var uniqueid =
      date + '' + month + '' + year + '' + hours + '' + min + '' + sec;
    setClothe({...clothe, id: uniqueid});
    console.log('DAte effect çalıştı');
  }, [profilePict]);

  const uploadClothe = async () => {
    const currentuser = auth().currentUser;
    const imageRef = storage().ref(
      'users/' + currentuser.uid + '/clothes/' + clothe.id + '.png',
    );
    const uploadImage = async () => {
      await imageRef.putFile(profilePict.uri);
      const url = await imageRef.getDownloadURL();
      return url;
    };
    function getBodyPart() {  
      if(clothe.category == "Ceket"){
        clothe.topCategory = "Dış Giyim"
      }else if(clothe.category == "Gömlek" || clothe.category == "Kazak" || clothe.category == "Tişört"){
        clothe.topCategory = "Üst Giyim";
      }else if (clothe.category == "Etek" || clothe.category == "Pantolon" || clothe.category == "Şort"){
        clothe.topCategory = "Alt Giyim";
      }else if (clothe.category == "Bot" || clothe.category == "Sandalet" || clothe.category == "Spor Ayakkabı"){
        clothe.topCategory = "Ayakkabı";
      }else if (clothe.category == "Çanta"){
        clothe.topCategory = "Aksesuar";
      }else if(clothe.category == "Elbise"){
        clothe.topCategory = "Tüm Giyim"
      }
    }
    getBodyPart();
    const tempurl = await uploadImage();
    await firestore()
      .collection('users')
      .doc(currentuser.uid)
      .collection('clothes')
      .doc()
      .set({
        clotheId: clothe.id,
        clotheColor: clothe.color,
        clotheSeason: clothe.season,
        clotheCategory: clothe.category,
        clotheTopCategory: clothe.topCategory,
        clothePicture: tempurl
          ? tempurl
          : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3nYiOoheQylXsev372LxOs&ust=1620296583645000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCOsqWpsvACFQAAAAAdAAAAABAI',
      });
    navigation.popToTop();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity
          style={styles.profile}
          onPress={() => setModalVisible(true)}>
          <Image
            source={
              profilePict
                ? {
                    uri: profilePict.uri,
                  }
                : require('../images/panth1.png')
            }
            style={{width: 150, height: 150, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>
      <ImagePickerModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        launchCam={launchCam}
        launchImageLib={launchImageLib}
      />
      <View style={styles.attributes}>
        <View style={styles.attribute}>
          <Text>Renk: </Text>
          <Modal
            animationType="fade"
            transparent={true}
            visible={colorModalVisible}
            onRequestClose={() => {
              setColorModalVisible(false);
            }}>
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => setColorModalVisible(false)}>
                <TouchableWithoutFeedback>
                  <View style={styles.modal}>
                    <FlatList
                      key="#"
                      data={colors}
                      numColumns={5}
                      keyExtractor={(item, index) => item + index}
                      renderItem={({item}) => (
                        <View style={{padding: 2}}>
                          <TouchableOpacity
                            onPress={() => {
                              setClothe({...clothe, color: item.color});
                              setColorModalVisible(false);
                            }}>
                            <View
                              style={{
                                width: 30,
                                height: 30,
                                backgroundColor: item.color,
                                borderRadius: 50,
                              }}></View>
                          </TouchableOpacity>
                        </View>
                      )}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity onPress={() => setColorModalVisible(true)}>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: clothe.color,
                borderRadius: 50,
              }}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.attribute}>
          <Text>Kategori: </Text>
          <Picker
            style={{maxWidth: 150, height: 40}}
            mode="dropdown"
            selectedValue=""
            onValueChange={(itemValue, itemIndex) =>
              setClothe({...clothe, category: itemValue})
            }>
            <Picker.Item label="Ceket" value="Ceket" key="4" /> 
            <Picker.Item label="Gömlek" value="Gömlek" key="6" /> 
            <Picker.Item label="Kazak" value="Kazak" key="2" />
            <Picker.Item label="Tişört" value="Tişört" key="0" />
            <Picker.Item label="Elbise" value="Elbise" key="3" /> 
            <Picker.Item label="Etek" value="Etek" key="10" /> 
            <Picker.Item label="Pantolon" value="Pantolon" key="1" /> 
            <Picker.Item label="Şort" value="Şort" key="11" /> 
            <Picker.Item label="Bot" value="Bot" key="9" /> 
            <Picker.Item label="Sandalet" value="Sandalet" key="5" /> 
            <Picker.Item label="Spor Ayakkabı" value="Spor Ayakkabı" key="7" /> 
            <Picker.Item label="Çanta" value="Çanta" key="8" /> 
          </Picker>
        </View>
        <View style={styles.attribute}>
          <Text>Mevsimlik Tercih: </Text>
          <Picker
            style={{maxWidth: 150, height: 40}}
            mode="dropdown"
            selectedValue="spring"
            onValueChange={(itemValue, itemIndex) =>
              setClothe({...clothe, season: itemValue})
            }>
            <Picker.Item label="İlkbahar" value="İlkbahar" />
            <Picker.Item label="Yaz" value="Yaz" />
            <Picker.Item label="Sonbahar" value="Sonbahar" />
            <Picker.Item label="Kış" value="Kış" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          backgroundColor: profilePict ? 'tomato' : 'grey',
          borderRadius: 50,
          width: 80,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={uploadClothe}
        disabled={profilePict ? false : true}>
        <Text>Ekle</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    margin: '2%',
  },
  profile: {
    flex: 1,
    backgroundColor: '#95a5a6',
    borderRadius: 20,
    borderColor: 'gray',
  },
  attributes: {
    padding: 15,
    alignContent: 'flex-end',
  },
  attribute: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    marginVertical: '50%',
    marginHorizontal: '24%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  colorView: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
