import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';

export default function ClotheDetail({route}) {
  const {clothe} = route.params;
  return (
    <View style={styles.container}>
      <View style={styles.profileImageContainer}>
        <TouchableOpacity style={styles.profile}>
          <Image
            source={{
              uri: clothe.clothePicture,
            }}
            style={{width: 150, height: 150, borderRadius: 20}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.attributes}>
        <View style={styles.attribute}>
          <Text>Renk: </Text>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: clothe.clotheColor,
              borderRadius: 50,
            }}></View>
        </View>
        <View style={styles.attribute}>
          <Text>Kategori: </Text>
          <Text>{clothe.clotheCategory}</Text>
        </View>
        <View style={styles.attribute}>
          <Text>Mevsimlik Tercih: </Text>
          <Text>{clothe.clotheSeason}</Text>
        </View>
        <View style={styles.attribute}>
          <Text>Bölüm: </Text>
          <Text>{clothe.clotheTopCategory}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImageContainer: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    margin: '2%',
  },
  profile: {
    flex: 1,
    backgroundColor: '#95a5a6',
    borderRadius: 20,
    borderColor: 'gray',
  },
  attributes: {
    padding: 15,
    alignContent: 'flex-end',
  },
  attribute: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modal: {
    marginVertical: '50%',
    marginHorizontal: '24%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 15,
    alignItems: 'center',
  },
  colorView: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
  },
});
