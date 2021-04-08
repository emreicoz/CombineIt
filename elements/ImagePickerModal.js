import React, {useState} from 'react';
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

export default function ImagePickerModal(props) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.setModalVisible(false);
      }}>
      <View style={{backgroundColor: '#000000aa', flex: 1}}>
        <TouchableOpacity
          style={{flex: 1}}
          onPress={() => props.setModalVisible(false)}>
          <TouchableWithoutFeedback>
            <View style={styles.modal}>
              <TouchableOpacity onPress={props.launchCam}>
                <Text>Kamerayı Kullan</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={props.launchImageLib}>
                <Text>Galeriden Seç</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.setModalVisible(false)}>
                <Text>İptal</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginVertical: '50%',
    marginHorizontal: '25%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
});
