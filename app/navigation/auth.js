import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "react-navigation";
import SignIn from "../screens/auth/signin/SignIn";
import SignUp from "../screens/auth/signup/SignUp";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

export const SignedOut = createStackNavigator({
  WelcomeScreen: {
    screen: SignIn,
    navigationOptions: {
      header: null, 
      gesturesEnabled: false
    }
  },
  SignIn: {
    screen: SignUp,
    navigationOptions: {
      header: null,
      gesturesEnabled: false
    }
  }
});
