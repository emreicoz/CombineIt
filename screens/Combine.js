import React, {useContext, useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import {Text} from 'native-base';
import {UserContext} from '../elements/UserContext';

export default function Combine({navigation}) {
  const {user} = useContext(UserContext);
  console.log('Kombin tarafı: ' + user);
  var deneme = "";

  /*const {spawn} = require('child_process');

  const childPython = spawn('python',['--version']);

  childPython.stdout.on('data', (data) => {
    deneme = data;
  })

  childPython.stderr.on('data', (data)=> {
    console.log('stderr: ' ,data);
  })

  childPython.on('close', (code)=>{
    console.log('child process executed with code: ',code);
  })*/

  return (
    <View>
      <Text>Kombin sayfası. </Text>
      <Text>Deneme: {deneme} </Text>
      <TextInput placeholder="deneme" />
    </View>
  );
}
