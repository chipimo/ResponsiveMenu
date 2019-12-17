import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Toolbar, Badge } from "react-native-material-ui";
import { IconToggle } from "react-native-material-ui";
import { StorRootStack } from "../../../navigation/MainStoreView";
import { data } from "../../../data";

class MainView extends Component {

  componentDidMount() {
    if(this.props.SocketConfig.isCon){
      this.props.SocketConfig.socket.emit("LOGIN", {
        userId: this.props.User.userInfo.user_id, 
        socketId: this.props.SocketConfig.socket.id,
        notiId: this.props.DeciveID.token,
        name: this.props.User.userInfo.user_name,
      });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Toolbar
          centerElement="Store"
          leftElement={
            this.props.Cart.cart !== "0" ? (
              <Badge
                style={{ container: { bottom: 26, right: 5 } }}
                key="cart"
                text={this.props.Cart.cart}
              >
                <IconToggle color="#fff" name="shopping-cart" />
              </Badge>
            ) : (
              <IconToggle key="cart" color="#fff" name="shopping-cart" />
            )
          }
          rightElement={["notifications", "settings"]}
          onRightElementPress={label => {
            if (label.index === 1) this.props.navigation.navigate("Profile");
          }}
          style={{
            container: {
              backgroundColor: "#E11725"
            }
          }}
        />
        <StorRootStack />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Cart: state.Cart,
  SocketConfig: state.SocketConfig,
  User: state.User,
  DeciveID: state.DeciveID
});

const mapDispatchToProps = {};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainView);
