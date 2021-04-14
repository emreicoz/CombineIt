import React from 'react';
import {ScrollView} from 'react-native';
import PostCard from '../elements/PostCard';

export default function Fashion() {
  return (
    <ScrollView>
      <PostCard
        profile={require('../images/profile.png')}
        clothe={require('../images/panth1.png')}
      />
      <PostCard
        profile={require('../images/profile2.jpg')}
        clothe={require('../images/panth2.png')}
      />
    </ScrollView>
  );
}
