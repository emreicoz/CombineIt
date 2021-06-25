import React, {useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text} from 'react-native';
import ClothesCard from '../elements/ClothesCard';
import firestore from '@react-native-firebase/firestore';

export default function Wardrobe(props) {
  const [wardrobe, setWardrobe] = useState([]);

  function groupBy(list, keyGetter) {
    const map = new Map();
    list.forEach(item => {
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
      .doc(props.searchedUser.userId)
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
        const clothesMap = groupBy(
          tempClothes,
          clothe => clothe.clotheCategory,
        );
        const clothesArray = Array.from(clothesMap, ([category, clothes]) => ({
          category,
          clothes,
        }));
        clothesArray.sort((a, b) => (a.category > b.category ? 1 : -1));
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

  console.log('Wardrobe searched user:', props.searchedUser);
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
              renderItem={({item}) => (
                <TouchableOpacity>
                  <ClothesCard clothe={item.clothePicture} />
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      />
    </View>
  );
}
