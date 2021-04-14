import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {Text} from 'native-base';
import ClothesCard from '../elements/ClothesCard';

export default function Wardrobe() {
  return (
    <ScrollView >
      <View style={styles.container}>
        <View style={styles.categorycontainer}>
          <Text>Pantolon</Text>
        </View>
        <View style={styles.contentcontainer}>
          <ClothesCard clothe={require('../images/panth1.png')} />
          <ClothesCard clothe={require('../images/panth2.png')} />
          <ClothesCard clothe={require('../images/panth1.png')} />
          <ClothesCard clothe={require('../images/panth2.png')} />
          <ClothesCard clothe={require('../images/panth1.png')} />
          <ClothesCard clothe={require('../images/panth2.png')} />
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.categorycontainer}>
          <Text>Ayakkabı</Text>
        </View>
        <View style={styles.contentcontainer}>
          <ClothesCard clothe={require('../images/shoe1.png')} />
          <ClothesCard clothe={require('../images/shoe2.png')} />
        </View>
      </View>
    </ScrollView>
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
  categorycontainer: {
  },
  categoryheader: {
    fontWeight: 'bold',
    backgroundColor: 'yellow',
  },
  contentcontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
