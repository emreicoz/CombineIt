import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

export default function combineTwoCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Kombin Öneriniz</Text>
      <View>
        <Image
          source={{
            uri:
              'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
          }}
          style={styles.top}
        />
      </View>
      <View>
        <Image
          source={{
            uri:
              'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
          }}
          style={styles.foot}
        />
      </View>
    </View>
  );
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
    height: 300,
    width: 150,
    borderRadius: 10,
  },
  foot: {
    marginBottom: 5,
    height: 80,
    width: 150,
    borderRadius: 10,
  },
});
