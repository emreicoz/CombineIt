import React, {Component, useEffect, useState} from 'react';
import {Image, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {
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
import moment from 'moment/min/moment-with-locales';

import firestore from '@react-native-firebase/firestore';

export default function postCard(props) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(props.post.likes);

  const likePost = () => {
    firestore()
      .collection('posts')
      .doc(props.postId)
      .update({'postInfo.likes': firestore.FieldValue.increment(1)})
      .then(() => {
        setLikes(likes + 1);
        console.log('postcard likepost ile firestore a bağlandı');
      });
    firestore()
      .collection('users')
      .doc(props.currentUser.userId)
      .collection('likedCombines')
      .doc(props.combine.combineId)
      .set({combineInfo: props.combine})
      .then(() => {
        console.log('postcard likepost ile firestore likedcombines e eklendi ');
      });
  };
  const dislikePost = () => {
    firestore()
      .collection('posts')
      .doc(props.postId)
      .update({'postInfo.likes': firestore.FieldValue.increment(-1)})
      .then(() => {
        setLikes(likes - 1);
        console.log('postcard likepost ile firestore a bağlandı');
      });
  };

  return (
    <Card style={{flex: 1}}>
      <CardItem cardBody style={{marginVertical: 10, marginHorizontal: 5}}>
        <Left>
          <Thumbnail source={{uri: props.user.profilePicture}} />
          <Body>
            <Text>{props.user.nameSurname}</Text>
            <Text style={styles.subText}>{props.user.userName}</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Text style={styles.description}>{props.post.description}</Text>
      </CardItem>
      <CardItem cardBody style={{justifyContent: 'center'}}>
        <CombinesCard
          topClothe={props.combine.topClothe}
          bottomClothe={props.combine.bottomClothe}
          shoeClothe={props.combine.shoeClothe}
        />
      </CardItem>
      <CardItem cardBody style={{marginVertical: 5, marginHorizontal: 10}}>
        <Left>
          <Button transparent>
            {liked ? (
              <TouchableOpacity
                onPress={() => {
                  dislikePost();
                  setLiked(false);
                }}>
                <Icon active name="heart" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  likePost();
                  setLiked(true);
                }}>
                <Icon active name="heart-outline" />
              </TouchableOpacity>
            )}
            <Text style={styles.likeText}>{likes} Beğeni</Text>
          </Button>
        </Left>
        <Body>
          <Button transparent>
            <TouchableOpacity>
              <Icon active name="chatbubbles" />
            </TouchableOpacity>
            <Text style={styles.commentText}>{props.post.comments} Yorum</Text>
          </Button>
        </Body>
        <Right>
          {props.ago.agoDay ? (
            <Text style={{color: '#778899'}}>{props.ago.agoDay} gün önce</Text>
          ) : props.ago.agoHour ? (
            <Text style={{color: '#778899'}}>
              {props.ago.agoHour} saat önce
            </Text>
          ) : (
            <Text style={{color: '#778899'}}>
              {props.ago.agoMin} dakika önce
            </Text>
          )}
        </Right>
      </CardItem>
    </Card>
  );
}
const styles = StyleSheet.create({
  subText: {
    color: '#d3d3d3',
  },
  description: {
    width: '95%',
    paddingHorizontal: 15,
  },
  likeText: {
    marginLeft: 5,
  },
});
