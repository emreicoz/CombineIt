import React, {useContext, useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import {Text} from 'native-base';
import {UserContext} from '../elements/UserContext';

export default function Combine({navigation}) {
  const {user} = useContext(UserContext);
  console.log('Kombin tarafı: ' + user);
  var deneme = "";


  return (
    <View>
      <Text>Kombin sayfası. </Text>
      <Text>Deneme: {deneme} </Text>
      <TextInput placeholder="deneme" />
    </View>
  );
}
