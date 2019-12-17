import React from "react";
import { Platform, StatusBar } from "react-native";
import { createBottomTabNavigator } from "react-navigation";
import { Icon } from "react-native-elements";
import HomeScreen from "../screens/main/home/HomeScreen";
import MessengerScreen from "../screens/main/Messenger/MessengerScreen";

export const SignedIn = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Home", 
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" type="octicons" color="#517fa4" />
        )
      }
    },
    albums: {
      screen: MessengerScreen,
      navigationOptions: {
        tabBarLabel: "Messenger",
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" type="entypo" color="#517fa4" />
        )
      }
    }
  },
  {
    tabBarOptions: {
      style: {
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
      }
    }
  }
);
