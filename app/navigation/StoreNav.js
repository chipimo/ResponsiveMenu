import { createMaterialTopTabNavigator } from "react-navigation";
import Feed from "../screens/componets/feed";
import RootStack from "./Products";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import store from "../../AppStore";
import React from "react";
import { View, Text} from "react-native";
// import { Text } from "react-native-ui-kitten";

export const StoreNav = createMaterialTopTabNavigator(
  {
    Feeds: {
      screen: Feed,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) =>
          focused ? (
            (store.dispatch({ type: "SetActiveNav", ActiveNav: "feeds" }),
            (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  padding: 6,
                  alignItems: "center"
                }}
              >
                <Entypo name="list" size={20} color="green" />
                <View style={{ marginLeft: 10 }}>
                  <Text >FEEDS</Text>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 6,
                alignItems: "center"
              }}
            >
              <Entypo name="list" size={20} color="gray" />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "gray" }} >
                  FEEDS
                </Text>
              </View>
            </View>
          )
      }
    },
    Products: {
      screen: RootStack,
      navigationOptions: {
        tabBarLabel: ({ focused }: any) =>
          focused ? (
            (store.dispatch({ type: "SetActiveNav", ActiveNav: "products" }),
            (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 6
                }}
              >
                <MaterialCommunityIcons
                  name="format-list-checks"
                  size={20}
                  color="green"
                />
                <View style={{ marginLeft: 10 }}>
                  <Text >PRODUCTS</Text>
                </View>
              </View>
            ))
          ) : (
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                padding: 6,
                alignItems: "center"
              }}
            >
              <MaterialCommunityIcons
                name="format-list-checks"
                size={20}
                color="gray"
              />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ color: "gray" }} >
                  PRODUCTS
                </Text>
              </View>
            </View>
          )
      }
    }
  },

  {
    tabBarOptions: {
      style: {
        paddingTop: 0,
        backgroundColor: "#F6F8F8"
      },
      labelStyle: {
        color: "#525252"
      },
      indicatorStyle: {
        backgroundColor: "#E11725"
      },
      pressColor: "#E11725"
    }
  }
);
