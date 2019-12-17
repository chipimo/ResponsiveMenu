import React, { Component } from "react";
import { View, ActivityIndicator, Dimensions } from "react-native";
import { connect } from "react-redux";
import Avatar from "react-native-badge-avatar";
import { LinearGradient } from "expo";
import { RkText, RkButton } from "react-native-ui-kitten";
import { GradientButton } from "../../../components";
import { ImagePicker } from "expo";
import { BASE_PIC_URL } from "../../types";
import { StackActions, NavigationActions } from "react-navigation";

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

class UserId extends Component {
  state = {
    pic: null,
    isLoading: false
  };
  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    });

    if (!result.cancelled) {
      this.setState({ pic: result.uri });
    }
  };

  uploadProfile = async () => {
    this.setState({ isLoading: true });
    let localUri = this.state.pic;
    let filename = localUri.split("/").pop();

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append("photo", {
      uri: localUri,
      name: filename,
      userId: this.props.User,
      type
    });
    const Token = this.props.User.userInfo.user_id;

    return await fetch(BASE_PIC_URL, {
      method: "POST",
      body: formData,
      withCredentials: true,
      credentials: "include",
      headers: new Headers({
        "content-type": "multipart/form-data",
        Authorization: Token
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.result) {
          

          this.props.dispatchEvent({
            type: "LOGGEDIN",
            payload: data.userInfo[0]
          });
          this.setState({
            isLoading: false
          });       
          const toHome = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "MainApp" })]
          });
          this.props.navigation.dispatch(toHome);
        } else {
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false
        });
        console.log(err);
      });
  };

  render() {
    return (
      <LinearGradient
        colors={["#C5C6CB", "#EDEDEF"]}
        style={{ flex: 1, paddingTop: 50 }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Avatar
            size={150}
            style={{ margin: 6 }}
            placeholder={
              this.state.pic
                ? null
                : require("../../../assets/images/user-placeholder.png")
            }
            source={this.state.pic}
          />
          <RkText>Hello {this.props.User.userInfo.user_name}</RkText>
          <View style={{ width: 200, marginTop: 40 }}>
            <RkButton
              style={{ width: 200 }}
              rkType="outline"
              onPress={this._pickImage}
            >
              Change profile
            </RkButton>
          </View>
          <View style={{ width: 250, height: 100, marginTop: 20 }}>
            <GradientButton
              style={{ marginVertical: 20 }}
              rkType="large"
              text="FINSH"
              onPress={() => {
                this.uploadProfile();
              }}
            />
          </View>
          <View
            style={{
              elevation: 5,
              borderRadius: 5,
              width: "95%",
              backgroundColor: "green",
              padding: 5,
              marginBottom: 10
            }}
          >
            <RkText style={{ color: "#ccc" }} rkType="s1">
              Your account has been successfully created. An email has been sent
              to you with detailed instructions on how to activate it.
            </RkText>
          </View>
        </View>
        {this.state.isLoading ? (
          <View
            style={{
              width: width,
              height: height,
              position: "absolute",
              top: 0,
              backgroundColor: "rgba(255,255,255,0.8)",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                height: 70,
                width: 200,
                elevation: 19,
                backgroundColor: "#fff",
                borderRadius: 5,
                justifyContent: "flex-start",
                alignItems: "center",
                paddingTop: 4
              }}
            >
              <ActivityIndicator size="large" color="#0000ff" />
              <RkText>Please wait</RkText>
            </View>
          </View>
        ) : null}
      </LinearGradient>
    );
  }
}

function mapStateToProps(state) {
  return {
    AppGlobalRoutes: state.AppGlobalRoutes,
    SocketConfig: state.SocketConfig,
    User: state.User,
  };
}

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserId);
