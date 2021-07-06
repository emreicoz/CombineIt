import React, {useContext, useEffect, useState, useCallback} from 'react';
import {ScrollView, Text, FlatList, TouchableOpacity, View} from 'react-native';
import PostCard from '../elements/PostCard';
import {UserContext} from '../elements/UserContext';
import moment from 'moment/min/moment-with-locales';

import firestore from '@react-native-firebase/firestore';

export default function Fashion() {
  const {user} = useContext(UserContext);
  const [posts, setPosts] = useState();
  const [isFollowingAnyone, setIsFollowingAnyone] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    getRecentPosts();
    console.log('Fashion useeffect çalıştı');
  }, []);

  console.log('Fashion render edildi');

  const getRecentPosts = async () => {
    let followingIdArray = [];
    let tempPosts = [];
    let yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    console.log('Date : ', yesterday);
    await firestore()
      .collection('users')
      .doc(user.userId)
      .collection('following')
      .get()
      .then(user => {
        user.forEach(following => {
          followingIdArray.push(following.id);
        });
      });
    console.log('Following array:', followingIdArray);
    if (followingIdArray != '') {
      await firestore()
        .collection('posts')
        .where('userInfo.userId', 'in', followingIdArray)
        .orderBy('postInfo.date', 'desc')
        .limit(10)
        .get()
        .then(posts => {
          posts.forEach(post => {
            tempPosts.push({postid: post.id, ...post.data()});
          });
        });
      setIsFollowingAnyone(true);
      if (tempPosts != '') {
        setPosts(tempPosts);
        setIsRefreshing(false);
      }
    } else {
      setIsFollowingAnyone(false);
      setIsRefreshing(false);
    }
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    getRecentPosts();
    console.log('posts on refresh', posts);
  };

  const calculateAgo = date => {
    let now = moment().format();
    let createdAt = date;
    let ago = moment(now).diff(createdAt, 'minutes');
    let agoM = ago % 60;
    let agoH = parseInt(ago / 60);
    let agoD;
    if (agoH > 24) {
      agoD = parseInt(agoH / 24);
    }
    let agoreturn = {agoMin: agoM, agoHour: agoH, agoDay: agoD};
    console.log('Ago return :  :      : :  : : ', agoreturn);
    return agoreturn;
  };

  const keyExtractor = useCallback((item, index) => item + index);

  const renderItem = useCallback(({item}) => (
    <PostCard
      user={item.userInfo}
      currentUser={user}
      combine={item.combineInfo}
      post={item.postInfo}
      postId={item.postid}
      postAll={item.post}
      ago={calculateAgo(item.postInfo.date)}
    />
  ));

  console.log('Posts : -------------------', posts);
  return isFollowingAnyone ? (
    posts ? (
      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={() => {
          onRefresh();
        }}
      />
    ) : (
      <View>
        <Text>Takip ettiğiniz kişiler henüz bir paylaşımda bulunmamış.</Text>
        <TouchableOpacity
          onPress={() => {
            getRecentPosts();
          }}>
          <Text>Yenile</Text>
        </TouchableOpacity>
      </View>
    )
  ) : (
    <View>
      <Text>
        Henüz kimseyi takip etmediniz. Keşfet kısmından arama yaparak
        kullanıcıları takip etmeye başlayabilirsiniz.
      </Text>
      <TouchableOpacity
        onPress={() => {
          getRecentPosts();
        }}>
        <Text>Yenile</Text>
      </TouchableOpacity>
    </View>
  );
}
