import React, {useContext, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import {UserContext} from '../elements/UserContext';
import NewCombineModal from '../elements/NewCombineModal';
import CombinesCard from '../elements/CombinesCard';

import firestore from '@react-native-firebase/firestore';

export default function Combine({navigation}) {
  const {user} = useContext(UserContext);
  console.log('Kombin tarafı: ', user.email);
  const [modalVisible, setModalVisible] = useState(false);
  const [combines, setCombines] = useState();

  const getCombines = () => {
    firestore()
      .collection('users')
      .doc(user.userId)
      .collection('combines')
      .onSnapshot(clothesCollection => {
        const tempCombines = [];
        clothesCollection.forEach(clotheDocument => {
          tempCombines.push({
            ...clotheDocument.data(),
          });
        });
        setCombines(tempCombines);
        console.log('Kombin: ', tempCombines);
      });
  };

  const keyExtractor = useCallback((item, index) => item + index);

  const renderItem = useCallback(({item}) => (
    <View style={{marginLeft: 3}}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CombineDetail', {
            combine: item,
            currentUser: user,
          });
        }}>
        <CombinesCard
          topClothe={item.topClothe}
          bottomClothe={item.bottomClothe}
          shoeClothe={item.shoeClothe}
        />
      </TouchableOpacity>
    </View>
  ));

  useEffect(() => {
    getCombines();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={combines}
        horizontal={true}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
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
