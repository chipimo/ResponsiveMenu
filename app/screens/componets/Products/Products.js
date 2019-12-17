import React, { Component } from "react";
import { View, Animated,Text } from "react-native";
import { connect } from "react-redux";
import Screen2 from "./Screen2";
// import { RkText } from "react-native-ui-kitten";
import { Ionicons } from "@expo/vector-icons";
import { IconToggle } from "react-native-material-ui";

class ScreenDragger extends Component {
  state = {
    isLoading: false,
    yNotify: new Animated.Value(0)
  };

  handleProps = newProps => {
    if (newProps.ProductActivity.isSet) {
      this.openNotify();
    }
  };

  componentWillReceiveProps(nextProps) {
    this.handleProps(nextProps);
  }

  openNotify = () => {
    Animated.spring(this.state.yNotify, {
      toValue: 0
    }).start();
  };

  closeNotify = () => {
    this.props.dispatchEvent({ type: "ActivityOut" });
    Animated.spring(this.state.yNotify, {
      toValue: -70
    }).start();
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: "center" }}>
        <Animated.View
          style={{
            height: 60,
            width: "90%",
            elevation: 5,
            backgroundColor: "#fff",
            borderRadius: 5,
            overflow: "hidden",
            position: "absolute",
            top: 2,
            zIndex: 150,
            borderColor: "transparent",
            borderWidth: 1,
            borderStyle: "solid",
            borderRightColor: "#23B8B0",
            transform: [
              {
                translateY: this.state.yNotify
              }
            ]
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <View
              style={{
                backgroundColor: "#23B8B0",
                width: 60,
                height: 63,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Ionicons
                name="ios-information-circle-outline"
                size={50}
                color="#fff"
              />
            </View>
            <View style={{ width: 190 }}>
              <Text style={{ color: "#23B8B0" }}>
                {this.props.ProductActivity.item.name}
              </Text>
              <Text  style={{ color: "gray" }}>
                {this.props.ProductActivity.msg}
              </Text>
            </View>
            <IconToggle onPress={this.closeNotify} name="close" />
          </View>
        </Animated.View>

        <Screen2 navigation={this.props.navigation} />
      </View>
    );
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#D8D8D8"
        }}
      />
    );
  };
}

const mapStateToProps = state => ({
  Subscription: state.Subscription,
  ProductActivity: state.ProductActivity
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenDragger);
