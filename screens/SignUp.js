import React from 'react';
import {StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Button, Label, Text} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';

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
    .required("Bu alan boş bırakılamaz"),
});

export default function SignUp() {
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
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <ScrollView style={styles.container}>
          <View style={styles.profile}></View>
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
    margin: "2%",
  },
  textinputcontainer: {
    flex: 2,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    justifyContent: 'space-around'
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
    marginLeft: "3%",
  },
});
