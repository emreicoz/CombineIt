import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {Button, Text} from 'native-base';
import ClothesCard from '../elements/ClothesCard';
import {UserContext} from '../elements/UserContext';
import firestore from '@react-native-firebase/firestore';


export default function Wardrobe({navigation}) {
  const {user} = useContext(UserContext);
  const [wardrobe, setWardrobe] = useState([]);
  
  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach((item) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
}
  const getWardrobe = () => {
    firestore()
      .collection('users')
      .doc(user.userId)
      .collection('clothes')
      .onSnapshot(clothesCollection => {
        const tempClothes = [];
        clothesCollection.forEach(clotheDocument => {
          let category = clotheDocument.data().clotheCategory;
          tempClothes.push({
            title: category,
            ...clotheDocument.data(),
          });
        });
        const clothesMap = groupBy(tempClothes, clothe => clothe.clotheCategory);
        const clothesArray = Array.from(clothesMap, ([category, clothes]) => ({ category, clothes }));
        clothesArray.sort((a,b) => (a.category > b.category) ? 1 : -1);
        setWardrobe(clothesArray);
        console.log('Wardrobe: ', clothesArray);
      });
  };
  /*useEffect(() => {
    navigation.addListener('focus', () => {
      alert('Screen was focused');
      getWardrobe();
    });
  }, []);

  useEffect(() => {
    navigation.addListener('blur', () => {
      alert('Screen was unfocused');
    });
  }, []);*/
  useEffect(() => {
    getWardrobe();
  }, []);

  console.log(user);
  return (
    <View style={{flex: 1, paddingHorizontal: 5}}>
      <FlatList
        data={wardrobe}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View>
            <Text style={{marginLeft: '2%'}}>{item.category}</Text>
            <FlatList
              data={item.clothes}
              horizontal={true}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <TouchableOpacity onPress={() => navigation.navigate('ClotheDetail', {clothe: item})}><ClothesCard clothe={item.clothePicture} /></TouchableOpacity> }
            />
          </View>
        )}
      />
      <Button
        onPress={() => navigation.navigate('NewClothe')}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: 0,
          borderRadius: 80,
          margin: 10,
        }}>
        <Text>Ekle</Text>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '1%',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#39426250',
  },
  categorycontainer: {},
  categoryheader: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
  },
  contentcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
