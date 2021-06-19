import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {SearchBar} from 'react-native-elements';
import UserCard from '../elements/UserCard';

import firestore from '@react-native-firebase/firestore';

export default function Discover({navigation}) {
  const [users, setUsers] = useState();
  const [filteredUsers, setFilteredUsers] = useState();
  const [searchValue, setSearchValue] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    console.log('Users için firestore a erişildi');
    getUsers();
  }, [isSearching]);
  const getUsers = () => {
    firestore()
      .collection('users')
      .get()
      .then(querySnapshot => {
        console.log('Total users: ', querySnapshot.size);
        let userArray = [];
        querySnapshot.forEach(documentSnapshot => {
          userArray.push(documentSnapshot.data());
        });
        setUsers(userArray);
      });
  };

  const searchUser = searchValue => {
    setFilteredUsers(users);
    const filteredData = users.filter(item =>
      item.userName.includes(searchValue),
    );
    if (searchValue) {
      setFilteredUsers(filteredData);
    } else {
      setFilteredUsers(null);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}>
      <View style={{flex: 1}}>
        <SearchBar
          placeholder=""
          onFocus={() => setIsSearching(!isSearching)}
          onChangeText={value => {
            setSearchValue(value);
            searchUser(value);
          }}
          value={searchValue}
          lightTheme={true}
          round={true}
          inputContainerStyle={{height: 30}}
          containerStyle={{backgroundColor: '#F2F2F2'}}
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <ScrollView>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('SearchProfile', {user: item})
                }>
                <UserCard user={item}></UserCard>
              </TouchableOpacity>
            </ScrollView>
          )}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
