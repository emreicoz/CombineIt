import React from 'react';
import {StyleSheet, View, TextInput, ScrollView} from 'react-native';
import {Button, Text} from 'native-base';
import {Formik} from 'formik';
import * as yup from 'yup';

const LoginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Lütfen geçerli bir mail adresi giriniz')
    .required('Bu alan boş bırakılamaz'),
  password: yup
    .string()
    .min(8, 'Şifre 8 karakterden küçük olamaz.')
    .max(16, 'Şifre 16 karakterden büyük olamaz.')
    .required('Bu alan boş bırakılamaz'),
});

export default function SignUp() {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={(values, actions) => {
        actions.resetForm();
        console.log(values);
      }}>
      {({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
        <ScrollView style={styles.container}>
          <View style={styles.textinputcontainer}>
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
          </View>
          <View style={styles.buttoncontainer}>
            <Button
              title="Submit"
              block
              rounded
              style={styles.button}
              onPress={handleSubmit}>
              <Text style={styles.text}>Giriş Yap</Text>
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
  textinputcontainer: {
    flex: 4,
    width: '90%',
    alignSelf: 'center',
    backgroundColor: '#ecf0f1',
    paddingHorizontal: '3%',
    paddingVertical: '2%',
    justifyContent: 'space-around',
    marginTop: '5%',
  },
  textinput: {
    borderRadius: 10,
    backgroundColor: '#dfe5e9',
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 12,
    height: '30%',
  },
  buttoncontainer: {
    flex: 1,
    width: '60%',
    alignSelf: 'center',
    marginTop: '5%',
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#1ba1e2',
  },
  text: {
    color: '#E0E0E0',
    fontWeight: 'bold',
    fontSize: 13,
  },
  errorTitle: {
    fontSize: 10,
    fontFamily: 'Avenir-Medium',
    color: 'red',
    marginLeft: '3%',
  },
});
