import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { AppStackNavigator } from './AppStackNavigator'
import ComplaintScreen from '../screens/BookRequestScreen';


export const AppTabNavigator = createBottomTabNavigator({
  ComplaintScreen : {
    screen: ComplaintScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/truck.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "Raise a Complaint",
    }
  },
  BuzzerScreen: {
    screen: BuzzerScreen,
    navigationOptions :{
      tabBarIcon : <Image source={require("../assets/buzzer.png")} style={{width:20, height:20}}/>,
      tabBarLabel : "SOS",
    }
  }
});
