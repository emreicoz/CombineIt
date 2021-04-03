import React, {useEffect, useState} from 'react';
import {StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Button, Toast, Text, Root} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import auth from '@react-native-firebase/auth';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity,TouchableWithoutFeedback} from 'react-native';
import {Modal} from 'react-native';

const launchCam = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchCamera(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};
      console.log('response', JSON.stringify(response));
    }
  });
};

const launchImageLib = () => {
  let options = {
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  launchImageLibrary(options, response => {
    console.log('Response = ', response);

    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
      alert(response.customButton);
    } else {
      const source = {uri: response.uri};
      console.log('response', JSON.stringify(response));
      this.setState({
        filePath: response,
        fileData: response.data,
        fileUri: response.uri,
      });
    }
  });
};

const SignUpSchema = yup.object().shape({
  nameSurname: yup
    .string()
    .min(3, 'Ad Soyad 4 karakterden küçük olamaz.')
    .required('Bu alan boş bırakılamaz'),
  userName: yup
    .string()
    .min(4, 'Kullanıcı adı 4 karakterden küçük olamaz.')
    .required('Bu alan boş bırakılamaz'),
  email: yup
    .string()
    .email('Lütfen geçerli bir mail adresi giriniz')
    .required('Bu alan boş bırakılamaz'),
  password: yup
    .string()
    .min(8, 'Şifre 8 karakterden küçük olamaz.')
    .max(16, 'Şifre 16 karakterden büyük olamaz.')
    .required('Bu alan boş bırakılamaz'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Şifreler birbirleri ile eşleşmiyor.')
    .required('Bu alan boş bırakılamaz'),
});

export default function SignUp() {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <Formik
      initialValues={{
        nameSurname: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: '',
      }}
      validationSchema={SignUpSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(() => {
            console.log('User account created & signed in!');
          })
          .catch(error => {
            if (error.code === 'auth/email-already-in-use') {
              Toast.show({
                text: 'Bu E posta adresi zaten kullanımda !',
                type: 'warning',
              });
            }
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <Root>
          <ScrollView style={styles.container}>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => setModalVisible(true)}></TouchableOpacity>
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style= {{backgroundColor:"#000000aa", flex:1}}>
                <TouchableOpacity style={{ flex:1}} onPress={()=> setModalVisible(false)}>
                  <TouchableWithoutFeedback>
                <View style={styles.modal}>
                  <TouchableOpacity onPress={launchCam}>
                    <Text>Kamerayı Kullan</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={launchImageLib}>
                    <Text>Galeriden Seç</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text>İptal</Text>
                  </TouchableOpacity>
                </View>
                </TouchableWithoutFeedback>
                </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.textinputcontainer}>
              <TextInput
                placeholder="Ad Soyad"
                style={styles.textinput}
                onChangeText={handleChange('nameSurname')}
                onBlur={handleBlur('nameSurname')}
                value={values.nameSurname}></TextInput>
              <Text style={styles.errorTitle}>
                {touched.nameSurname && errors.nameSurname}
              </Text>
              <TextInput
                placeholder="Kullanıcı Adı"
                style={styles.textinput}
                onChangeText={handleChange('userName')}
                onBlur={handleBlur('userName')}
                value={values.userName}></TextInput>
              <Text style={styles.errorTitle}>
                {touched.userName && errors.userName}
              </Text>
              <TextInput
                placeholder="E-Posta"
                style={styles.textinput}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}></TextInput>
              <Text style={styles.errorTitle}>
                {touched.email && errors.email}
              </Text>
              <TextInput
                placeholder="Şifre"
                style={styles.textinput}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}></TextInput>
              <Text style={styles.errorTitle}>
                {touched.password && errors.password}
              </Text>
              <TextInput
                placeholder="Şifre Tekrar"
                style={styles.textinput}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                value={values.confirmPassword}
                secureTextEntry={true}></TextInput>
              <Text style={styles.errorTitle}>
                {touched.confirmPassword && errors.confirmPassword}
              </Text>
            </View>
            <View style={styles.buttoncontainer}>
              <Button
                title="Submit"
                block
                rounded
                style={styles.button}
                onPress={handleSubmit}>
                <Text style={styles.text}>Kayıt Ol</Text>
              </Button>
            </View>
          </ScrollView>
        </Root>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dbe0e0',
  },
  profile: {
    flex: 1,
    backgroundColor: '#95a5a6',
    borderRadius: 80,
    width: 90,
    height: 90,
    alignSelf: 'center',
    margin: '2%',
  },
  textinputcontainer: {
    flex: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    justifyContent: 'space-around',
    borderRadius: 10,
  },
  textinput: {
    borderRadius: 10,
    backgroundColor: '#dfe5e9',
    justifyContent: 'center',
    height: '14%',
    fontSize: 12,
    paddingLeft: '5%',
  },
  buttoncontainer: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#1ba1e2',
    margin: 15,
    borderRadius: 10,
    height: '70%',
  },
  text: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 13,
  },
  labelTitle: {
    fontSize: 12,
    fontFamily: 'Avenir-Medium',
  },
  errorTitle: {
    fontSize: 10,
    fontFamily: 'Avenir-Medium',
    color: 'red',
    marginLeft: '3%',
  },
  modal: {
    marginVertical: '50%',
    marginHorizontal: '25%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
  },
});
