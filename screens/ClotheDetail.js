import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

export default function ClotheDetail({route}) {
  const {clothe} = route.params;

  const getColor = colorName => {
    switch (colorName) {
      case 'Antrasit':
        return require('../Colors/antrasit.png');
      case 'Sarı':
        return require('../Colors/sari.png');
      case 'Beyaz':
        return require('../Colors/beyaz.png');
      case 'Siyah':
        return require('../Colors/siyah.png');
      case 'Bej':
        return require('../Colors/bej.png');
      case 'Bordo':
        return require('../Colors/bordo.png');
      case 'Ekru':
        return require('../Colors/ekru.png');
      case 'Fuşya':
        return require('../Colors/fusya.png');
      case 'Gri':
        return require('../Colors/gri.png');
      case 'Haki':
        return require('../Colors/haki.png');
      case 'İndigo':
        return require('../Colors/indigo.png');
      case 'Kahve':
        return require('../Colors/kahve.png');
      case 'Kırmızı':
        return require('../Colors/kirmizi.png');
      case 'Lacivert':
        return require('../Colors/lacivert.png');
      case 'Mavi':
        return require('../Colors/mavi.png');
      case 'Mercan':
        return require('../Colors/mercan.png');
      case 'Mor':
        return require('../Colors/mor.png');
      case 'Mürdüm':
        return require('../Colors/murdum.png');
      case 'Pembe':
        return require('../Colors/pembe.png');
      case 'Petrol':
        return require('../Colors/petrol.png');
      case 'Turkuaz':
        return require('../Colors/turkuaz.png');
      case 'Turuncu':
        return require('../Colors/turuncu.png');
      case 'Yeşil':
        return require('../Colors/yesil.png');
      case 'Çok-Renkli':
        return require('../Colors/cokrenkli.png');
    }
  };
  return (
    <ScrollView>
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
            <View style={{flexDirection: 'row'}}>
              <Image
                source={getColor(clothe.colorNameTR)}
                style={{
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  marginRight: 10
                }}></Image>
                <Text
                style={{alignSelf: 'center'}}>
                {clothe.colorNameTR}
              </Text>
            </View>
          </View>
          <View style={styles.attribute}>
            <Text>Ana Kategori: </Text>
            <Text>{clothe.clotheTopCategory}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Kategori: </Text>
            <Text>{clothe.clotheCategory}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Kalıp: </Text>
            <Text>{clothe.clotheMold}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Kumaş: </Text>
            <Text>{clothe.clotheFabric}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Uzunluk: </Text>
            <Text>{clothe.clotheLength}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Mevsimlik Tercih: </Text>
            <Text>{clothe.clotheSeason}</Text>
          </View>
          <View style={styles.attribute}>
            <Text>Tarz: </Text>
            <Text>{clothe.clotheStyle}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
