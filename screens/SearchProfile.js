import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import SearchWardrobe from './SearchWardrobe';

import firestore from '@react-native-firebase/firestore';

export default function SearchProfile({route}) {
  const {currentUser} = route.params;
  const {searchedUser} = route.params;
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    console.log('is following effect ile çalıştı');
    isFollowing();
  }, []);

  console.log('Profile tarafı:', currentUser);
  console.log('Profile tarafı:', searchedUser);

  const isFollowing = () => {
    console.log('is following  çalıştı');
    firestore()
      .collection('users')
      .doc(currentUser.userId)
      .collection('following')
      .doc(searchedUser.userId)
      .get()
      .then(documentSnapshot => {
        if (documentSnapshot.exists) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
  };

  const followUser = () => {
    firestore()
      .collection('users')
      .doc(currentUser.userId)
      .collection('following')
      .doc(searchedUser.userId)
      .set({userInfo: searchedUser});

    firestore()
      .collection('users')
      .doc(searchedUser.userId)
      .collection('followers')
      .doc(currentUser.userId)
      .set({userInfo: currentUser});

    isFollowing();
  };

  const unfollowUser = () => {
    firestore()
      .collection('users')
      .doc(currentUser.userId)
      .collection('following')
      .doc(searchedUser.userId)
      .delete({});

    firestore()
      .collection('users')
      .doc(searchedUser.userId)
      .collection('followers')
      .doc(currentUser.userId)
      .delete({});

    isFollowing();
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileInfo}>
          <View style={styles.profilePicture}>
            <Image
              source={{
                uri: searchedUser && searchedUser?.profilePicture,
              }}
              style={{width: 80, height: 80, borderRadius: 45}}></Image>
          </View>
          <Text style={styles.profileText}>
            {(searchedUser && searchedUser?.nameSurname) || 'Deneme Kişisi'}
          </Text>
          <Text style={styles.subText}>
            {(searchedUser && searchedUser?.userName) || 'denemekisisi'}
          </Text>
        </View>
        {following ? (
          <TouchableOpacity
            style={styles.unfollowButton}
            onPress={unfollowUser}>
            <Text>Takibi Bırak</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.followButton} onPress={followUser}>
            <Text>Takip Et</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.mainContainer}>
        <Tabs
          defaultIndex={1} // default = 0
          uppercase={false} // true/false | default=true | labels are uppercase
          // showTextLabel={false} // true/false | default=false (KEEP PROVIDING LABEL WE USE IT AS KEY INTERNALLY + SCREEN READERS)
          //iconPosition= {'top'} // leading, top | default=leading
          style={{backgroundColor: '#fff'}} // works the same as AppBar in react-native-paper
          // dark={true} // works the same as AppBar in react-native-paper
          // theme={} // works the same as AppBar in react-native-paper
          //mode="scrollable" // fixed, scrollable | default=fixed
          // onChangeIndex={(newIndex) => {}} // react on index change
          //showLeadingSpace={false} //  (default=true) show leading space in scrollable tabs inside the header
        >
          <TabScreen label={'Kıyafet'}>
            <SearchWardrobe searchedUser={searchedUser} />
          </TabScreen>
          <TabScreen label={'Kombin'}>
            <Text>Kombin</Text>
          </TabScreen>
          <TabScreen label="Takip">
            <Text>Takip</Text>
          </TabScreen>
        </Tabs>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#95a4b5',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mainContainer: {
    flex: 2,
  },
  profileInfo: {
    alignItems: 'center',
    alignSelf: 'center',
    padding: '2%',
  },
  profilePicture: {
    backgroundColor: '#95a5a6',
    borderRadius: 45,
    width: 80,
    height: 80,
  },
  profileText: {
    fontSize: 15,
    color: '#212121',
  },
  subText: {
    fontSize: 15,
    color: '#6a6a6a',
  },
  unfollowButton: {
    backgroundColor: 'grey',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    right: 0,
    margin: 15,
  },
  followButton: {
    backgroundColor: '#1886b7',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    position: 'absolute',
    right: 0,
    margin: 15,
  },
});
