import React, {useContext, useState, useEffect} from 'react';
import {View, Image, TextInput} from 'react-native';
import {Text} from 'native-base';
import {UserContext} from '../elements/UserContext';

export default function Combine({navigation}) {
  const {user} = useContext(UserContext);
  console.log('Kombin tarafı: ' + user);
  const [apiData, setApiData] = useState();

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
            
          } 
        }),
      })
        .then(response => response.json())
        .then(json => {
          setApiData(json);
          console.log(json);
          return json.movies;
          
        });
    } catch (error) {
      console.error('ERror : ', error);
    }
  };

  useEffect(() => {
    console.log('Api a ulaşıldı');
    getApi();
  }, []);

  return (
    <View>
      <Text>Kombin sayfası. </Text>
      <Text>Deneme: {apiData ? apiData.data.firstParam : 'Yok'} </Text>
      <TextInput placeholder="deneme" />
    </View>
  );
}
