import React, {useState} from 'react';
import {StyleSheet, View, TextInput, ScrollView, Image} from 'react-native';
import {Button, Toast, Text, Root} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TouchableOpacity} from 'react-native';
import ImagePickerModal from '../elements/ImagePickerModal';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const SignUpSchema = yup.object().shape({
  nameSurname: yup
    .string()
    .min(3, 'Ad Soyad 3 karakterden küçük olamaz.')
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
  const [profilePict, setProfilePict] = useState(null);
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
        setProfilePict(response);
        setModalVisible(false);
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
      setModalVisible(false);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        setProfilePict(response);
      }
    });
  };
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
      onSubmit={async (values, actions) => {
        actions.resetForm();
        await auth()
          .createUserWithEmailAndPassword(values.email, values.password)
          .then(cred => {
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
        const currentuser = auth().currentUser;
        const imageRef = storage().ref('users/' + currentuser.uid + '/profilePicture.png');
        const uploadImage = async () => {
          await imageRef.putFile(profilePict.uri);
          const url = await imageRef.getDownloadURL();
          return url;
        };
        const tempurl = await uploadImage();
        firestore()
          .collection('users')
          .doc(currentuser.uid)
          .set({
            userId: currentuser.uid,
            nameSurname: values.nameSurname,
            userName: values.userName,
            email: values.email,
            profilePicture: tempurl
              ? tempurl
              : 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fvectors%2Fblank-profile-picture-mystery-man-973460%2F&psig=AOvVaw3nYiOoheQylXsev372LxOs&ust=1620296583645000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCJCOsqWpsvACFQAAAAAdAAAAABAI',
          });
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <Root>
          <ScrollView style={styles.container}>
            <TouchableOpacity
              style={styles.profile}
              onPress={() => setModalVisible(true)}>
              <Image
                source={
                  profilePict
                    ? {
                        uri: profilePict.uri,
                      }
                    : require('../images/profile.png')
                }
                style={{width: 90, height: 90, borderRadius: 20}}
              />
            </TouchableOpacity>
            <ImagePickerModal
              modalVisible={modalVisible}
              setModalVisible={setModalVisible}
              launchCam={launchCam}
              launchImageLib={launchImageLib}
            />
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
    borderRadius: 20,
    width: 90,
    height: 90,
    alignSelf: 'center',
    margin: '2%',
    borderColor: 'gray',
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
});
