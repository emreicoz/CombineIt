import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/Main';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import WardrobeScreen from './screens/Wardrobe';
import CombineScreen from './screens/Combine';
import FashionScreen from './screens/Fashion';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';


const AuthStack = createStackNavigator();
const AuthStackScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Main"
      component={MainScreen}
      options={{headerShown: false}}
    />
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{
        title: 'Giriş Yap',
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
    />
    <AuthStack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{
        title: 'Kayıt Ol',
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
        },
      }}
    />
  </AuthStack.Navigator>
);
const AppStack = createStackNavigator();
const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen
      name="AppTabScreen"
      component={AppDrawerScreens}
      options={{
        title: 'CombineIt',
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          alignSelf: 'center',
        },
      }}
    />
    
  </AppStack.Navigator>
);
const AppTab = createMaterialBottomTabNavigator();
const AppTabScreens = () => (
  <AppTab.Navigator >
    <AppTab.Screen name="Wardrobe" component={WardrobeScreen} />
    <AppTab.Screen name="Combine" component={CombineScreen} />
    <AppTab.Screen name="Fashion" component={FashionScreen} />
  </AppTab.Navigator>
);
const AppDrawer = createDrawerNavigator();
const AppDrawerScreens = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen name ="Home" component ={AppTabScreens}/>
  </AppDrawer.Navigator>
);

export default function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? <AppStackScreen /> : <AuthStackScreens />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
