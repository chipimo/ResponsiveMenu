import React from "react";
import { View, Animated, TouchableOpacity, Dimensions,Text } from "react-native";
import { connect } from "react-redux";
import {  RkButton } from "react-native-ui-kitten";
import { IconToggle } from "react-native-material-ui";

import _ from "lodash";
import { EvilIcons } from "@expo/vector-icons";

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

class Details extends React.Component {
  state = {};

  render() {
    return (
      <View
        style={{
          flex: 1
        }}
      >
        <View
          style={{
            height: 50,
            width: "100%",
            borderColor: "#D9D9D9",
            borderWidth: 1,
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <IconToggle
            name="arrow-back"
            onPress={() => this.props.navigation.goBack()}
          />
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View>
              {/* <Text rkType="primary4">{days + " " + dow}</Text> */}
            </View>
            <IconToggle name="help-outline" />
          </View>
        </View>
        <View>
          {this.props.User.userInfo.isSubscriber ? (
            <View>
              <View>
                <Text>subscription</Text>
              </View>
            </View>
          ) : (
            <View>
              <Text>You are not eligible for this subscription</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Subscription: state.Subscription,
  User: state.User
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
