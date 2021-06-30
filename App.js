import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createSwitchNavigator, createAppContainer} from 'react-navigation'
import WelcomeScreen from './screens/WelcomeScreen'
import ComplaintScreen from './screens/ComplaintScreen';

export default function App() {
  return (
    <AppContainer/>
  );
}


const switchNavigator = createSwitchNavigator({
  WelcomeScreen:{screen: WelcomeScreen},
  ComplaintScreen:{screen: ComplaintScreen},
})

const AppContainer =  createAppContainer(switchNavigator);
