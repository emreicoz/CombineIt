import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import {Text} from 'react-native';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/Main';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import WardrobeScreen from './screens/Wardrobe';
import CombineScreen from './screens/Combine';
import FashionScreen from './screens/Fashion';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Icon} from 'react-native-elements';

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
      options={({navigation}) => ({
        headerTitle: 'CombineIt',
        headerStyle: {
          backgroundColor: '#2c3e50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 16,
          alignSelf: 'center',
        },
        headerLeft: () => (
          <Icon
            name="menu"
            size={20}
            color="white"
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      })}
    />
  </AppStack.Navigator>
);
const AppTab = createMaterialTopTabNavigator();
const AppTabScreens = () => (
  <AppTab.Navigator
    barStyle={{backgroundColor: '#694fad'}}
    tabBarPosition="bottom"
    shifting="true"
    tabBarOptions={{
      indicatorStyle: {
        height: 0,
      },
      showIcon: true,
      style: {
        height: '11%',
      },
    }}
    shifting={true}>
    <AppTab.Screen
      name="Wardrobe"
      component={WardrobeScreen}
      options={
        (route => ({title: route.params.name}),
        {
          tabBarLabel: () => <Text style={{fontSize: 10}}> Gardırop </Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="dresser" color={color} size={22} />
          ),
          tabBarColor: '#03A9F4',
        })
      }
    />
    <AppTab.Screen
      name="Combine"
      component={CombineScreen}
      options={{
        tabBarLabel: () => <Text style={{fontSize: 10}}> Kombin </Text>,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="tshirt-crew" color={color} size={22} />
        ),
        tabBarColor: '#FF9800',
      }}
    />
    <AppTab.Screen
      name="Fashion"
      component={FashionScreen}
      options={{
        tabBarLabel: () => <Text style={{fontSize: 10}}> Moda </Text>,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="briefcase" color={color} size={22} />
        ),
        tabBarColor: 'gold',
      }}
    />
  </AppTab.Navigator>
);
const AppDrawer = createDrawerNavigator();
const AppDrawerScreens = () => (
  <AppDrawer.Navigator>
    <AppDrawer.Screen name="Home" component={AppTabScreens} />
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
