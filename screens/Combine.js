import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {UserContext} from '../elements/UserContext';
import NewCombineModal from '../elements/NewCombineModal';

export default function Combine({navigation}) {
  const {user} = useContext(UserContext);
  console.log('Kombin tarafı: ', user);
  const [modalVisible, setModalVisible] = useState(false);


  return (
    <View style={styles.container}>
      <Text>Kombin sayfası. </Text>
      <NewCombineModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        currentUser={user}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setModalVisible(true);
        }}>
        <Text style={styles.textStyle}>Kombin Öner</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: 'tomato',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 10,
  },
  textStyle: {
    color: 'white',
    textAlign: 'center',
  },
});
