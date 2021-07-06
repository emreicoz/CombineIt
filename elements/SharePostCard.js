import React from 'react';
import {Image, Text, StyleSheet, ScrollView, View} from 'react-native';
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';
import CombinesCard from '../elements/CombinesCard';

export default function sharePostCard(props) {
  return (
        <Card style={{width:'95%',paddingBottom:10, }}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: props.currentUser.profilePicture}} />
              <Body>
                <Text>{props.currentUser.nameSurname}</Text>
                <Text style={styles.subText}>{props.currentUser.userName}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem
            cardBody
            style={{justifyContent: 'center', alignItems: 'center'}}>
            <View>
              <CombinesCard
                topClothe={props.combine.topClothe}
                bottomClothe={props.combine.bottomClothe}
                shoeClothe={props.combine.shoeClothe}
              />
            </View>
          </CardItem>
        </Card>
  );
}

const styles = StyleSheet.create({
  subText: {
    color: '#d3d3d3',
  },
});
