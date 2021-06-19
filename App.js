import 'react-native-gesture-handler';
import React, {useState, useEffect, useMemo, useLayoutEffect} from 'react';
import {Text, ActivityIndicator} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from './screens/Main';
import LoginScreen from './screens/Login';
import SignUpScreen from './screens/SignUp';
import WardrobeScreen from './screens/Wardrobe';
import CombineScreen from './screens/Combine';
import FashionScreen from './screens/Fashion';
import DiscoverScreen from './screens/Discover';
import ProfileScreen from './screens/Profile';
import NewClotheScreen from './screens/NewClothe';
import SearchProfileScreen from './screens/SearchProfile';
import ClotheDetailScreen from './screens/ClotheDetail';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Provider as PaperProvider} from 'react-native-paper';
import {UserContext} from './elements/UserContext';
import firestore from '@react-native-firebase/firestore';
import {DrawerContent} from './elements/DrawerContent';

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
const WardrobeStack = createStackNavigator();
const WardrobeStackScreens = () => (
  <WardrobeStack.Navigator screenOptions={{headerShown: false}}>
    <WardrobeStack.Screen name="Wardrobe" component={WardrobeScreen} />
    <WardrobeStack.Screen
      name="NewClothe"
      component={NewClotheScreen}
      tabBarOptions={{tabBarVisible: false}}
    />
    <WardrobeStack.Screen
      name="ClotheDetail"
      component={ClotheDetailScreen}
      tabBarOptions={{tabBarVisible: false}}
    />
  </WardrobeStack.Navigator>
);
const FashionStack = createStackNavigator();
const FashionStackScreens = () => (
  <FashionStack.Navigator screenOptions={{headerShown: false}}>
    <FashionStack.Screen name="Fashion" component={FashionScreen} />
    <FashionStack.Screen
      name="SearchProfile"
      component={SearchProfileScreen}
      tabBarOptions={{tabBarVisible: false}}
    />
  </FashionStack.Navigator>
);
const DiscoverStack = createStackNavigator();
const DiscoverStackScreens = () => (
  <DiscoverStack.Navigator screenOptions={{headerShown: false}}>
    <DiscoverStack.Screen name="Discover" component={DiscoverScreen} />
    <DiscoverStack.Screen
      name="SearchProfile"
      component={SearchProfileScreen}
      tabBarOptions={{tabBarVisible: false}}
    />
  </DiscoverStack.Navigator>
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
      customtitle="Gardırop"
      component={WardrobeStackScreens}
      options={
        (route => ({title: route.params.customtitle}),
        {
          tabBarLabel: () => <Text style={{fontSize: 10}}> Gardırop </Text>,
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="wardrobe" color={color} size={22} />
          ),
          tabBarColor: '#03A9F4',
        })
      }
    />
    <AppTab.Screen
      name="Combine"
      customtitle="Kombin"
      component={CombineScreen}
      options={{
        tabBarLabel: () => <Text style={{fontSize: 10}}> Kombin </Text>,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="hanger" color={color} size={22} />
        ),
        tabBarColor: '#FF9800',
      }}
    />
    <AppTab.Screen
      name="Fashion"
      customtitle="Moda"
      component={FashionStackScreens}
      options={{
        tabBarLabel: () => <Text style={{fontSize: 10}}> Moda </Text>,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="briefcase" color={color} size={22} />
        ),
        tabBarColor: 'gold',
      }}
    />
    <AppTab.Screen
      name="Discover"
      customtitle="Keşfet"
      component={DiscoverStackScreens}
      options={{
        tabBarLabel: () => <Text style={{fontSize: 10}}> Keşfet </Text>,
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="magnify" color={color} size={22} />
        ),
        tabBarColor: 'gold',
      }}
    />
  </AppTab.Navigator>
);
const AppDrawer = createDrawerNavigator();
const AppDrawerScreens = () => (
  <AppDrawer.Navigator
    drawerStyle={{
      width: '60%',
    }}
    drawerContent={props => <DrawerContent {...props} />}>
    <AppDrawer.Screen
      name="Home"
      component={AppTabScreens}
      options={{
        headerShown: true,
        headerTitle: 'CombineIt',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#4b778d',
        },
      }}
    />
    <AppDrawer.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        headerShown: true,
        headerTitle: 'Profil',
        headerTitleAlign: 'center',
        headerTitleStyle: {
          fontSize: 16,
        },
        headerStyle: {
          backgroundColor: '#4b778d',
        },
      }}
    />
  </AppDrawer.Navigator>
);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [userid, setUserId] = useState(null);
  const [user, setUser] = useState(null);
  const userValue = useMemo(() => ({user, setUser}), [user, setUser]);
  const [isLoaded, setIsLoaded] = useState(true);

  function onAuthStateChanged(user) {
    setUserId(user);
    console.log('Userid:' + user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const getUser = async () => {
    const currentUser = auth().currentUser;
    const userDoc = await firestore()
      .collection('users')
      .doc(currentUser ? currentUser.uid : null)
      .get();

    if (!userDoc.exists) {
      console.log("User not found")
      setTimeout(getUser, 250);
    } else {
      const userData = userDoc.data();
      console.log('Userdoc: ', userData);
      setUser(userData);
      setIsLoaded(true);
    }
    console.log('GEtuser');
  };

  useEffect(() => {
    if (userid) {
        getUser();
        console.log('User:', user);
    } else {
      console.log('USerid yok');
      setIsLoaded(false);
    }
    return user;
  }, [userid]);

  if (initializing) return null;
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <NavigationContainer>
          {isLoaded ? (
            <UserContext.Provider value={userValue}>
              <AppDrawerScreens />
            </UserContext.Provider>
          ) : (
            <AuthStackScreens />
          )}
        </NavigationContainer>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
