import React, {useState} from 'react';
import {Text, View, TouchableOpacity, StyleSheet, Image} from 'react-native';
import ImagePickerModal from '../elements/ImagePickerModal';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

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
        </View>
      </View>
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
});
