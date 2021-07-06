import React, { useContext} from 'react';
import {View, StyleSheet, Text, Image} from 'react-native';
import WardrobeScreen from './Wardrobe';
import CombineScreen from './Combine';
import FashionScreen from './Fashion';
import {Tabs, TabScreen} from 'react-native-paper-tabs';
import {UserContext} from '../elements/UserContext';


export default function Profile() {
  const count = 15;
  const {user} = useContext(UserContext);
  console.log('Profile tarafı:' + user);
  return (
    
    <View style={styles.container}>
      <View style={styles.profileInfo}>
        <View style={styles.profilePicture}>
          <Image
            source={{
              uri: user && user?.profilePicture,
            }}
            style={{width: 80, height: 80, borderRadius: 45}}></Image>
        </View>
        <Text style={styles.profileText}>{user && user?.nameSurname || "Deneme Kişisi"}</Text>
        <Text style={styles.subText}>{user && user?.userName || "denemekisisi"}</Text>
      </View>

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
        <TabScreen label={"Kıyafet"}>
          <WardrobeScreen />
        </TabScreen>
        <TabScreen label={"Kombin"}>
          <CombineScreen />
        </TabScreen>
        <TabScreen label="Moda">
          <FashionScreen />
        </TabScreen>
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileInfo: {
    backgroundColor: '#95a4b5',
    alignItems: 'center',
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
});
