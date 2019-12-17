import React from "react";
import { connect } from "react-redux";
import { ScrollView, Switch, StyleSheet, Text, View } from "react-native";
import { ListItem, Toolbar, IconToggle } from "react-native-material-ui";
import BaseIcon from "./Icon";
import InfoText from "./InfoText";
// import { RkText } from "react-native-ui-kitten";
import Chevron from "./Chevron";
import Avatar from "react-native-badge-avatar";
import { data } from "../../../data";

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: "white"
  },
  userRow: {
    alignItems: "center",
    flexDirection: "row",
    paddingBottom: 8,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 6
  },
  userImage: {
    marginRight: 12
  },
  listItemContainer: {
    height: 55,
    borderWidth: 0.5,
    borderColor: "#ECECEC"
  }
});

class Profile extends React.Component {
  state = {
    pushNotifications: true,
    suburb:'',
    city:''
  };

  onPressOptions = () => {
    this.props.navigation.navigate("options");
  };

  onChangePushNotifications = () => {
    this.setState(state => ({
      pushNotifications: !state.pushNotifications
    }));
  };

  componentDidMount() {
    data.getUser("region", region => {
      var obj= JSON.parse(region)
      console.log(obj);
      this.setState({
        suburb:obj.suburb,
        city:obj.city
      })
    })
  }

  render() {
    return (
      <View>
        <Toolbar
          centerElement="Settings"
          leftElement={
            <IconToggle
              onPress={() => {
                console.log("llo");

                this.props.navigation.goBack();
              }}
              name="arrow-back"
            />
          }
          style={{
            titleText: { color: "#383838" },
            container: {
              backgroundColor: "#EBEBEB"
            }
          }}
        />

        <ScrollView style={styles.scroll}>
          <View style={styles.userRow}>
            <View style={styles.userImage}>
              <Avatar
                borderColor="gray"
                borderWidth={1}
                size={75}
                name={this.props.User.userInfo.user_name}
                source={this.props.User.userInfo.Profile_pic.secure_url}
              />
            </View>
            <View>
              <Text style={{ fontSize: 16 }}>
                {this.props.User.userInfo.user_name}
              </Text>
              <Text
                style={{
                  color: "gray",
                  fontSize: 16
                }}
              >
                {this.props.User.userInfo.email}
              </Text>
            </View>
          </View>
          <InfoText text="Account" />
          <View>
            <ListItem
              centerElement={{
                primaryText: "Push Notifications"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={
                <Switch
                  onValueChange={this.onChangePushNotifications}
                  value={this.state.pushNotifications}
                />
              }
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#FFADF2"
                  }}
                  icon={{
                    type: "material",
                    name: "notifications"
                  }}
                />
              }
            />
            <ListItem
              centerElement={{
                primaryText: "Location"
              }}
              onPress={() => this.props.navigation.navigate("Location")}
              style={{ container: styles.listItemContainer }}
              rightElement={
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ color: "#848484" }}>{this.state.suburb}, {this.state.city}</Text>
                  <Chevron />
                </View>
              }
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#57DCE7"
                  }}
                  icon={{
                    name: "location-on"
                  }}
                />
              }
            />
            <ListItem
              onPress={() => this.props.navigation.navigate("Billing")}
              centerElement={{
                primaryText: "Billing"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={
                <View style={{ display: "flex", flexDirection: "row" }}>
                  <Text style={{ color: "#848484" }}>Visa</Text>
                  <Chevron />
                </View>
              }
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#FEA8A1"
                  }}
                  icon={{
                    name: "credit-card"
                  }}
                />
              }
            />
            <InfoText text="More" />
            <ListItem
              onPress={() => this.props.navigation.navigate("CustomerCare")}
              centerElement={{
                primaryText: "Customer care"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={<Chevron />}
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#00C001"
                  }}
                  icon={{
                    name: "message"
                  }}
                />
              }
            />
            <ListItem
              onPress={() => this.props.navigation.navigate("About")}
              centerElement={{
                primaryText: "About US"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={<Chevron />}
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#A4C8F0"
                  }}
                  icon={{
                    name: "info-outline"
                  }}
                />
              }
            />
            <ListItem
              onPress={() => this.props.navigation.navigate("Tcs")}
              centerElement={{
                primaryText: "Terms and Policies"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={<Chevron />}
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#C6C7C6"
                  }}
                  icon={{
                    name: "lightbulb-outline"
                  }}
                />
              }
            />
            <ListItem
              onPress={() => this.props.navigation.navigate("Share")}
              centerElement={{
                primaryText: "Share our App"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={<Chevron />}
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#C47EFF"
                  }}
                  icon={{
                    name: "share"
                  }}
                />
              }
            />
            <ListItem
              onPress={() => this.props.navigation.navigate("RateUs")}
              centerElement={{
                primaryText: "Rate Us"
              }}
              style={{ container: styles.listItemContainer }}
              rightElement={<Chevron />}
              leftElement={
                <BaseIcon
                  containerStyle={{
                    backgroundColor: "#FECE44"
                  }}
                  icon={{
                    name: "star"
                  }}
                />
              }
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  Map: state.Map,
  NavTo: state.NavTo,
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
)(Profile);
