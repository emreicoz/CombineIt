import React from 'react';
import {View} from 'react-native';
import {Text, Button} from 'native-base';
import auth from '@react-native-firebase/auth';

function signingOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export default function Wardrobe() {
  return (
    <View>
      <Text>Gardırop sayfası.</Text>
      <Button onPress={signingOut}>
        <Text>Çıkış Yap</Text>
      </Button>
    </View>
  );
}
