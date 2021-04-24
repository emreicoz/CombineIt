import React from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Button, Text} from 'native-base';
import ClothesCard from '../elements/ClothesCard';

export default function Wardrobe({navigation}) {
  const DATA = [
    {
      title: 'Pantolon',
      data: [
        {
          name: 'panth',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth1',
          imagePath: require('../images/panth2.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth2.png'),
        },
      ],
    },
    {
      title: 'Ayakkabı',
      data: [
        {
          name: 'shoe1',
          imagePath: require('../images/shoe1.png'),
        },
        {
          name: '"shoe2',
          imagePath: require('../images/shoe2.png'),
        },
        {
          name: 'shoe1',
          imagePath: require('../images/shoe1.png'),
        },
        {
          name: 'shoe2',
          imagePath: require('../images/shoe2.png'),
        },
        {
          name: 'shoe2',
          imagePath: require('../images/shoe2.png'),
        },
        {
          name: 'shoe2',
          imagePath: require('../images/shoe2.png'),
        },
        {
          name: 'shoe2',
          imagePath: require('../images/shoe2.png'),
        },
      ],
    },
    {
      title: 'Pantolon',
      data: [
        {
          name: 'panth',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth1',
          imagePath: require('../images/panth2.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth2.png'),
        },
      ],
    },
    {
      title: 'Pantolon',
      data: [
        {
          name: 'panth',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth1.png'),
        },
        {
          name: 'panth1',
          imagePath: require('../images/panth2.png'),
        },
        {
          name: 'panth2',
          imagePath: require('../images/panth2.png'),
        },
      ],
    },
  ];

  return (
    <View style={{flex: 1, paddingHorizontal: 5}}>
      <FlatList
        data={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View>
            <Text style={{marginLeft: '2%'}}>{item.title}</Text>
            <FlatList
              data={item.data}
              horizontal={true}
              keyExtractor={(item, index) => item + index}
              renderItem={({item}) => <ClothesCard clothe={item.imagePath} />}
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
