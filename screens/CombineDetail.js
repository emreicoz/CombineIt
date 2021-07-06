import React, {useState} from 'react';
import {
  Image,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  ScrollView,
} from 'react-native';
import {Root} from 'native-base';
import SharePostCard from '../elements/SharePostCard';
import moment from 'moment/min/moment-with-locales';

import firestore from '@react-native-firebase/firestore';

export default function combineDetail({route, navigation}) {
  const {combine} = route.params;
  const {currentUser} = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [postDescription, setPostDescription] = useState();

  const sharePost = () => {
    firestore()
      .collection('posts')
      .doc()
      .set({
        combineInfo: combine,
        userInfo: currentUser,
        postInfo: {
          description: postDescription,
          likes: 0,
          comments: 0,
          date: moment().format(),
        },
      });
    console.log('combinedetail firestore çağırdı post paylaşımı için');
    setModalVisible(false);
    setPostDescription(null);
    navigation.navigate('Fashion');
  };

  return (
    <Root>
      <View style={styles.container}>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 6,
          }}>
          <View>
            <Image
              source={{
                uri: combine.topClothe
                  ? combine.topClothe.clothePicture
                  : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
              }}
              style={styles.top}
            />
          </View>
          <View>
            <Image
              source={{
                uri: combine.bottomClothe
                  ? combine.bottomClothe.clothePicture
                  : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
              }}
              style={styles.bottom}
            />
          </View>
          <View>
            <Image
              source={{
                uri: combine.shoeClothe
                  ? combine.shoeClothe.clothePicture
                  : 'https://i1.sndcdn.com/artworks-000469480059-3qjhvs-t500x500.jpg',
              }}
              style={styles.foot}
            />
          </View>
        </View>
        <View style={{flex: 1}}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalVisible(true);
            }}>
            <Text>Kombin Paylaş</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.modalContainer}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <TouchableOpacity
              style={styles.modalOut}
              onPress={() => {
                setModalVisible(false);
              }}>
              <ScrollView>
                <TouchableWithoutFeedback
                  onPress={() => {
                    Keyboard.dismiss();
                  }}>
                  <View style={styles.modalView}>
                    <SharePostCard
                      currentUser={currentUser}
                      combine={combine}
                    />
                    <TextInput
                      value={postDescription}
                      onChangeText={value => {
                        setPostDescription(value);
                      }}
                      style={styles.postDescription}
                      placeholder={
                        'Buraya açıklama girebilirsiniz'
                      }></TextInput>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                      <TouchableOpacity
                        style={styles.sharePostButton}
                        onPress={sharePost}>
                        <Text>Paylaş</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.cancelPostButton}
                        onPress={() => {
                          setModalVisible(false);
                          setPostDescription(null);
                        }}>
                        <Text>İptal</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </ScrollView>
            </TouchableOpacity>
          </Modal>
        </View>
      </View>
    </Root>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 15,
    marginBottom: 5,
    color: 'navy',
  },
  top: {
    height: 150,
    width: 140,
    borderRadius: 10,
  },
  bottom: {
    height: 150,
    width: 140,
    borderRadius: 10,
  },
  foot: {
    height: 70,
    width: 140,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#483D8B',
    borderRadius: 50,
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 10,
    position: 'absolute',
    bottom: 10,
  },
  sharePostButton: {
    backgroundColor: '#483D8B',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    marginLeft: '42%',
  },
  cancelPostButton: {
    backgroundColor: '#B22222',
    borderRadius: 50,
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
    marginLeft: '24%',
  },
  modalContainer: {
    flex: 1,
    position: 'absolute',
  },
  modalView: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#778899',
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    marginTop: '3%',
  },
  modalOut: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  postDescription: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    width: '95%',
  },
});
