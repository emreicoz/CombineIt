import React, {useEffect, useState} from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

import firestore from '@react-native-firebase/firestore';

export default function combineOneCard(props) {
  const [topClothe, setTopClothe] = useState();
  const [bottomClothe, setBottomClothe] = useState();
  const [shoeClothe, setShoeClothe] = useState();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(async () => {
    setTopClothe(await getClothe(props.top));
    setBottomClothe(await getClothe(props.bottom));
    setShoeClothe(await getClothe(props.shoe));
    console.log('Combineonecard useeffect çalıştı');
    setIsLoaded(true);
  }, []);

  const getClothe = async id => {
    const clotheArray = props.wardrobe.filter(function (item) {
      return item.clotheId == id;
    });
    const clothe = clotheArray[0];
    console.log('getclothe fonskyion çalıştı ', clothe);
    return clothe;
  };

  const saveCombinetoFirestore = () => {
    firestore()
      .collection('users')
      .doc(props.currentUser.userId)
      .collection('combines')
      .doc()
      .set({
        combineId:
          topClothe.clotheId + bottomClothe.clotheId + shoeClothe.clotheId,
        topClothe: topClothe,
        bottomClothe: bottomClothe,
        shoeClothe: shoeClothe,
      });
    console.log('combinenonecard firestore çağırdı kombin kaydı için');
  };

  return isLoaded ? (
    <View style={styles.container}>
      <Text style={styles.text}>Kombin Öneriniz</Text>
      <View>
        <Image
          source={{
            uri: topClothe
              ? topClothe.clothePicture
              : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
          }}
          style={styles.top}
        />
      </View>
      <View>
        <Image
          source={{
            uri: bottomClothe
              ? bottomClothe.clothePicture
              : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
          }}
          style={styles.bottom}
        />
      </View>
      <View>
        <Image
          source={{
            uri: shoeClothe
              ? shoeClothe.clothePicture
              : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
          }}
          style={styles.foot}
        />
      </View>
      <View style={styles.likeDislikeContainer}>
        <TouchableOpacity
          onPress={() => {
            saveCombinetoFirestore();
            props.closeModal();
          }}>
          <Image
            source={require('../images/thumb-up.png')}
            style={styles.likeButton}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            props.closeModal();
          }}>
          <Image
            source={require('../images/thumb-down.png')}
            style={styles.dislikeButton}
          />
        </TouchableOpacity>
      </View>
    </View>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    marginTop: -10,
    color: 'navy',
  },
  top: {
    marginBottom: 5,
    height: 160,
    width: 150,
    borderRadius: 10,
  },
  bottom: {
    marginBottom: 5,
    height: 160,
    width: 150,
    borderRadius: 10,
  },
  foot: {
    marginBottom: 5,
    height: 80,
    width: 150,
    borderRadius: 10,
  },
  likeDislikeContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingVertical: 10,
  },
  likeButton: {
    width: 45,
    height: 45,
    marginRight: 20,
  },
  dislikeButton: {
    width: 45,
    height: 45,
  },
});
