import { StatusBar } from 'expo-status-bar';
import { Form, Header } from 'native-base';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import CCSenderForm from './ClassComponent/CCSenderForm';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import CCDeliveryFeed from './ClassComponent/CCDeliveryFeed';
import CCMain from './ClassComponent/CCMain';
import CCLogin from './ClassComponent/CCLogin';
import CCRegister from './ClassComponent/CCRegister';
import CCHome from './ClassComponent/CCHome';
import HomeActivityList from './ClassComponent/HomeActivityList';
import CCLockers from './ClassComponent/CCLockers';

const Stack = createStackNavigator();

export default function App() {
  return (

<NavigationContainer>

<Stack.Navigator initialRouteName="Login">
<Stack.Screen name="Login" component={CCLogin}/>
<Stack.Screen name="DeliveryFeed" component={CCDeliveryFeed} />
<Stack.Screen name="NewDelivery" component={CCSenderForm} />
<Stack.Screen name="Register" component={CCRegister} />
<Stack.Screen name="Home" component={CCHome} />
<Stack.Screen name="HomeActivityList" component={HomeActivityList} />
<Stack.Screen name="CCLockers" component={CCLockers} />

</Stack.Navigator>

</NavigationContainer>

    


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
