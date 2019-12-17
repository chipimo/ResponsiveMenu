import React from "react";
import { View, Text, Animated, Dimensions } from "react-native";
import { connect } from "react-redux";
import { StoreNav } from "../../navigation/StoreNav";
import { IconToggle, Icon } from "react-native-material-ui";
import { Ionicons } from "@expo/vector-icons";
// import { RkText } from "react-native-ui-kitten";
import CartHeader from "./Products/CartHeader";
import Avatar from "react-native-badge-avatar";

const screenSize = Dimensions.get("window");

const height = screenSize.height;

const ImageMoveUp = height / 2;

class Store extends React.Component {
  state = {
    yModal: new Animated.Value(0),
    yProducts: new Animated.Value(0)
  };

  openfeeds = () => {
    Animated.spring(this.state.yModal, {
      toValue: 0
    }).start();
  };

  closefeeds = () => {
    Animated.spring(this.state.yModal, {
      toValue: 56
    }).start();
  };

  openproducts = () => {
    Animated.spring(this.state.yProducts, {
      toValue: 0
    }).start();
  };

  closeproducts = () => {
    Animated.spring(this.state.yProducts, {
      toValue: 56
    }).start();
  };

  handleNav = data => {
    if (data.TabNav) {
      if (data.TabNav.ActiveNav === "feeds") {
        this.openfeeds();
        this.closeproducts();
      } else {
        this.closefeeds();
        this.openproducts();
      }
    }
  };

  componentWillReceiveProps(nextProps) {
    this.handleNav(nextProps);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: "90%" }}>
          <StoreNav />
        </View>

        <Animated.View
          style={{
            width: "100%",
            bottom: 0,
            position: "absolute",
            marginTop: 4,
            height: 55,
            backgroundColor: "#fff",
            elevation: 20,
            transform: [
              {
                translateY: this.state.yModal
              }
            ]
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "row",
              height: 55
            }}
          >
            <View
              style={{
                marginLeft: 15,
                height: 55,
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
              }}
            >
              <Avatar
              borderColor="gray"
          borderWidth={2}
                size={45}
                name={this.props.User.userInfo.user_name}
                source={this.props.User.userInfo.Profile_pic.secure_url}
              />
              <Text
                // rkType="s2"
                style={{
                  color: "gray",
                  borderColor: "transparent",
                  borderLeftColor: "gray",
                  borderWidth: 1,
                  borderStyle: "solid",
                  marginLeft: 8
                }}
              >
                Share your finest recipe
              </Text>
            </View>

            <View
              style={{
                height: 55,
                justifyContent: "center",
                display: "flex",
                flexDirection: "row",

                alignItems: "center",
                marginRight: 45
              }}
            >
              <Ionicons name="md-images" color="gray" size={32} />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          style={{
            width: "100%",
            position: "absolute",
            bottom: 0,
            marginTop: 4,
            height: 55,
            backgroundColor: "#fff",
            // borderColor: "transparent",
            // borderTopColor: "gray",
            // borderWidth: 1,
            // borderStyle: "solid",
            elevation: 30,
            transform: [
              {
                translateY: this.state.yProducts
              }
            ]
          }}
        >
          <CartHeader />
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Map: state.Map,
  NavTo: state.NavTo,
  TabNav: state.TabNav,
  User: state.User
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Store);
