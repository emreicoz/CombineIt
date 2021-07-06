import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {Card, CardItem} from 'native-base';

export default function CombineOneCard(props) {
  return (
    <Card
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#5F9EA0',
      }}>
      <CardItem style={styles.carditem} cardBody>
        <Image
          source={{uri: props.topClothe.clothePicture}}
          style={{height: 100, width: 100, borderRadius: 10,margin:1,}}
        />
      </CardItem>
      <CardItem style={styles.carditem} cardBody>
        <Image
          source={{uri: props.bottomClothe.clothePicture}}
          style={{height: 100, width: 100, borderRadius: 10, margin:1,}}
        />
      </CardItem>
      <CardItem style={styles.carditem} cardBody>
        <Image
          source={{uri: props.shoeClothe.clothePicture}}
          style={{height: 50, width: 100, borderRadius: 10, margin:1,}}
        />
      </CardItem>
    </Card>
  );
}

const styles = StyleSheet.create({
  carditem: {
    borderRadius: 10,
    marginBottom: 5,
  },
});
