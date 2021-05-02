import React, {useState} from 'react';
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

export default function NewClothe() {
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
  const [selectedColor, setSelectedColor] = useState('#fff');
  const [colorModalVisible, setColorModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('key2');

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
                              setSelectedColor(item.color);
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
                backgroundColor: selectedColor,
                borderRadius: 50,
              }}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.attribute}>
          <Text>Kategori: </Text>
          <Picker
            style={{maxWidth: 150, height: 40}}
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label="Tişört" value="tshirt" />
            <Picker.Item label="Ceket" value="jacket" />
            <Picker.Item label="Pantolon" value="panth" />
          </Picker>
        </View>
        <View style={styles.attribute}>
          <Text>Mevsimlik Tercih: </Text>
          <Picker
            style={{maxWidth: 150, height: 40}}
            mode="dropdown"
            selectedValue={selectedCategory}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedCategory(itemValue)
            }>
            <Picker.Item label="İlkbahar" value="spring" />
            <Picker.Item label="Yaz" value="summer" />
            <Picker.Item label="Sonbahar" value="autumn" />
            <Picker.Item label="Kış" value="winter" />
          </Picker>
        </View>
      </View>
      <TouchableOpacity
        style={{
          alignSelf: 'center',
          backgroundColor: 'tomato',
          borderRadius: 50,
          width: 80,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
