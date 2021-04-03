import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from 'native-base';
import auth from '@react-native-firebase/auth';

function signingOut() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

var count = 0;

export default function Wardrobe() {
  return (
    <View style={styles.container}>
      <View style={styles.categoryheader}>
        <Text>Ceket</Text>
        <Text style={{right:0}}>{count}</Text>
      </View>
      <View style={styles.categoryindex}></View>
      <Button onPress={signingOut}>
        <Text>Çıkış Yap</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  categorycontainer: {
    backgroundColor: 'gold',
  },
  categoryheader: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
  },
});
