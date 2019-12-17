import React, { Component } from "react";
import {
  View,
  Dimensions,
  TextInput,
  ActivityIndicator,
  Animated,
  TouchableOpacity
} from "react-native";
import { connect } from "react-redux";
import { LinearGradient, ImagePicker } from "expo";
import Avatar from "react-native-badge-avatar";
import { RkText, RkStyleSheet } from "react-native-ui-kitten";
import { MaterialIcons } from "@expo/vector-icons";
import { scaleVertical } from "../../../utils/scale";
import { GradientButton } from "../../../components";
import { data } from "../../../data";
import { StackActions, NavigationActions } from "react-navigation";

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

const ImageMoveUp = height / 2;
const InputMoveUp = height / 2 - 120;

class FacebookLogin extends Component {
  state = {
    pic: null,
    isLoading: false,
    errorColor: "#B10417",
    yModal: new Animated.Value(InputMoveUp),
    iconColor: "#ccc",
    isModalOpen: false,
    isModal: false,
    isLoading: false,
    userTemp: {
      email: ""
    },
    emailErrorMsg: "",
    errors: {
      email: true
    }
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

  openModal = () => {
    this.setState({
      isModal: true
    });
    Animated.spring(this.state.yModal, {
      toValue: 0
    }).start();
  };

  closeModal = () => {
    this.setState({
      isModal: false
    });
    Animated.spring(this.state.yModal, {
      toValue: ImageMoveUp
    }).start();
  };

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  sendInfo = () => {
    if (!this.state.userTemp.email) {
      this.setState({
        emailErrorMsg: "Email is required",
        errors: {
          ...this.state.errors,
          email: false
        }
      });
    } else if (!this.validateEmail(this.state.userTemp.email)) {
      this.setState({
        emailErrorMsg: "Invalid email",
        errors: {
          ...this.state.errors,
          email: false
        }
      });
    } else {
      this.setState({ isSingedin: true, isModalOpen: true });

      var UserData = {
        name: this.props.FacebookInfo.Info.name,
        image: this.props.FacebookInfo.Info.picture.data.url,
        id: this.props.FacebookInfo.Info.id,
        email: this.state.userTemp.email,
        check: false
      };

      this.props.SocketConfig.socket.emit("VERIFY_FB_USER", UserData);
      this.props.SocketConfig.socket.on("USER_IS_REGSTARTED", callback => {
        if (callback.exists) {
          this.openModal();
        } else {
          if (callback.userData.isRegistered) {
            data.setTempData("userTemp", "isRegistered", responce => {
              if (responce) {
                this.props.dispatchEvent({
                  type: "LOGGEDIN",
                  payload: callback.userData.credentials[0]
                });

                const toHome = StackActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({ routeName: "Main" })
                  ]
                });
                this.props.navigation.dispatch(toHome);
              } else {
                console.log("else setTempData");
              }
            });
          } else {
            console.log("else");
          }
        }
        this.setState({
          isModalOpen: false
        });
      });
    }
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <LinearGradient
          colors={["#FF3224", "#FF821F"]}
          style={{ flex: 2, paddingTop: 20 }}
        >
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Avatar
              borderColor="#ccc"
              borderWidth={1}
              size={150}
              style={{ margin: 6 }}
              placeholder={
                this.state.pic
                  ? null
                  : require("../../../assets/images/user-placeholder.png")
              }
              source={
                this.state.pic
                  ? this.state.pic
                  : this.props.FacebookInfo.Info.picture.data.url
              }
            />

            <RkText style={{ color: "#fff", marginTop: 20 }}>
              Hello {this.props.FacebookInfo.Info.name}
            </RkText>
            <View
              style={{
                width: "90%",
                marginTop: 20,
                paddingTop: 20,
                alignItems: "center",
                borderColor: "transparent",
                borderTopColor: "#ccc",
                borderWidth: 1,
                borderStyle: "solid"
              }}
            >
              <RkText style={{ color: "#ccc", paddingBottom: 10 }} rkType="s1">
                Enter your email to complete regstration
              </RkText>
              <View
                style={[
                  styles.input,
                  {
                    marginBottom: 10,
                    borderColor: this.state.errors.email
                      ? "#ccc"
                      : this.state.errorColor
                  }
                ]}
              >
                <MaterialIcons
                  style={styles.InputIcon}
                  name="mail-outline"
                  size={38}
                  color={
                    this.state.errors.email
                      ? this.state.iconColor
                      : this.state.errorColor
                  }
                />
                <TextInput
                  ref={input => {
                    this.textInput = input;
                  }}
                  placeholder="Email Address"
                  keyboardType="email-address"
                  onChangeText={text =>
                    this.setState({
                      userTemp: {
                        ...this.state.userTemp,
                        email: text
                      },
                      errors: {
                        ...this.state.errors,
                        email: true
                      }
                    })
                  }
                  style={styles.textInput}
                  underlineColorAndroid="transparent"
                />
              </View>
              {this.state.errors.email ? null : (
                <RkText style={{ color: "#B10417" }} rkType="danger primary3">
                  {this.state.emailErrorMsg}
                </RkText>
              )}
            </View>
          </View>
        </LinearGradient>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={{ width: 250, height: 100, marginTop: 20 }}>
            <GradientButton
              style={{ marginVertical: 20 }}
              rkType="large"
              text="FINSH"
              onPress={() => {
                this.sendInfo();
              }}
            />
          </View>
        </View>
        {this.state.isModalOpen ? (
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
        {this.state.isModal ? (
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
          />
        ) : null}
        <Animated.View
          style={{
            height: 200,
            width: "100%",
            position: "absolute",
            bottom: 0,
            backgroundColor: "#fff",
            borderTopLeftRadius: 5,
            borderTopRightRadius: 5,
            justifyContent: "center",
            alignItems: "center",
            elevation: 20,
            transform: [
              {
                translateY: this.state.yModal
              }
            ]
          }}
        >
          <View style={{ paddingLeft: 30, paddingRight: 30 }}>
            <View style={{ marginBottom: 10 }}>
              <RkText style={{ color: "green" }} rkType="s3">
                Message from server
              </RkText>
            </View>
            <View>
              <RkText rkType="s3">
                We're sorry we could not create your account becouse the email
                address provided is already in use by another account.
              </RkText>
            </View>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                marginTop: 10,
                width: "100%",
                justifyContent: "flex-end"
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.closeModal();
                  this.textInput.clear();
                  this.setState({
                    userTemp: {
                      ...this.state.userTemp,
                      email: ""
                    }
                  });
                }}
                style={{
                  borderRadius: 10,
                  borderColor: "green",
                  borderWidth: 1,
                  borderStyle: "solid",
                  padding: 7,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <RkText rkType="s3">Enter a different email</RkText>
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = RkStyleSheet.create(theme => ({
  inputs: {
    backgroundColor: theme.colors.screen.base
  },

  image: {
    marginBottom: 5,
    height: scaleVertical(77),
    resizeMode: "contain"
  },

  textRow: {
    flexDirection: "row",
    justifyContent: "center"
  },
  input: {
    width: screenSize.width - 50,
    height: 50,
    borderRadius: 30,
    borderColor: "#ccc",
    borderWidth: 1,
    borderStyle: "solid",
    paddingLeft: 10,
    flexDirection: "row"
  },
  textInput: {
    height: 50,
    width: "80%",
    backgroundColor: "transparent",
    borderColor: "transparent",
    marginLeft: 10
  },
  InputIcon: {
    marginTop: 5
  }
}));

const mapStateToProps = state => ({
  FacebookInfo: state.FacebookInfo,
  SocketConfig: state.SocketConfig
});

const mapDispatchToProps = dispatch => {
  return {
    dispatchEvent: data => dispatch(data)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FacebookLogin);
