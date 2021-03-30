import React from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {Button, Text} from 'native-base';

const image = require('../images/main.png');

export default function Main({navigation}) {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.imagecontainer}>
        <View style={styles.buttoncontainer}>
            <Button
              block
              rounded
              style={styles.button}
              onPress={() => navigation.navigate('Login')}>
              <Text style={styles.text}>GİRİŞ YAP</Text>
            </Button>
            <Button
              style={styles.button}
              block
              rounded
              onPress={() => navigation.navigate('SignUp')}>
              <Text style={styles.text}>KAYIT OL</Text>
            </Button>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttoncontainer: {
    width: "70%",
    alignSelf: "center",
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#1ba1e2',
    margin: 15,
    borderRadius: 10,
    
  },
  text: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 13,
  },
  imagecontainer: {
    flex: 1,
    resizeMode: 'stretch',
    justifyContent: 'center',
  },
});
