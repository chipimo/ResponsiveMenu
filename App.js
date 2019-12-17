import React from "react";
import { StyleSheet, View, Animated, Dimensions } from "react-native";
import { createRootNavigator } from "./app/navigation/router";
import { Provider } from "react-redux";
import { createStackNavigator } from "react-navigation";
import { AppLoading, Font } from "expo";
import { bootstrap } from "./app/config/bootstrap";

import SplashScreen from "./app/screens/componets/splash";
import ErrorHandler from "./app/screens/componets/ErrorHandler";

import LoginV1 from "./app/screens/componets/Auth/login";
import SignUp from "./app/screens/componets/Auth/signUp";
import { PasswordRecovery } from "./app/screens/componets/Auth/passwordRecovery";
import * as StartScreens from "./app/screens/componets/walkthroughs";

import { BASE_URL, PRODUCT_LIST } from "./app/screens/types";
import { Permissions, Notifications, Constants } from "expo";

window.navigator.userAgent = "react-native";
import io from "socket.io-client/dist/socket.io";
import store from "./AppStore";
import UserId from "./app/screens/componets/Auth/UserId";
import FacebookLogin from "./app/screens/componets/Auth/FacebookLogin";

bootstrap();

const Layout = createRootNavigator();

const RenderApp = createStackNavigator(
  {
    Splash: {
      screen: SplashScreen
    },
    MainApp: {
      screen: Layout
    },
    AuthLogin: {
      screen: LoginV1
    },
    AuthSignUp: {
      screen: SignUp
    },
    FacebookLogin: {
      screen: FacebookLogin
    },
    UserId: {
      screen: UserId
    },
    PasswordRecover: {
      screen: PasswordRecovery
    },
    Welcome: {
      screen: StartScreens.WalkthroughScreen
    },
    ErrorHandler: {
      screen: ErrorHandler
    }
  },
  {
    headerMode: "none"
  }
);

const screenSize = Dimensions.get("window");

const width = screenSize.width;
const height = screenSize.height;

const ImageMoveUp = height / 1;
const socket = io(BASE_URL, { jsonp: false });
class Frame extends React.Component {
  state = {
    isLoaded: false,
    cart: "0",
    activeRoute: "Store",
    yModal: new Animated.Value(ImageMoveUp),
    isModalOpen: false,
    notification: {}
  };

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync()
      store.dispatch({
        type: "DeviceId", 
        token: token,
        isSet: true
      });
    } else {
      alert("Must use physical device for Push Notifications");
    }
  };

  _handleNotification = notification => {
    console.log(notification);

    this.setState({ notification: notification });
  };

  componentWillMount() {
    var isServerConn = true;
    this.loadAssets();

    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );

    socket.on("connect", () => {
      store.dispatch({
        type: "SocketConnected",
        payload: socket
      });
      this.registerForPushNotificationsAsync();
      
    });

    socket.on("disconnect", () => {
      store.dispatch({
        type: "SocketDisconnceted",
        payload: socket
      });
    });

    socket.emit("PRODUCTS", "all");
    socket.on("PRODUCTS_RESULTS_ERR", () => {
      store.dispatch({
        type: "ActivityDone",
        payload: "Error: Failed to update tabel",
        err: true
      });
    });

    store.dispatch({
      type: "OnActivity",
      payload: "Loading tabel contents",
      isLoading: true
    });

    socket.on("PRODUCTS_RESULTS", data => {
      if (data.product.length === 0) {
        store.dispatch({
          type: "ListEmpty"
        });
        // store.dispatch({
        //   type: "ActivityDone",
        //   payload: "Tabel is empty",
        //   err: false
        // });
      } else {
        store.dispatch({
          type: "LoadList",
          List: data.product,
          msg: "Products loaded"
        });
      }
    });

    socket.on("NEW_PROUDCT", callback => {
      store.dispatch({
        type: "ActivityDone",
        payload: "One Products has been added",
        item: callback.item,
        isSet: true
      });
      store.dispatch({
        type: "LoadList",
        List: callback.all.product,
        msg: "Products loaded"
      });
    });

    socket.on("PRODUCT_REMOVED", callback => {
      store.dispatch({
        type: "ActivityDone",
        payload: "One Products has been removed",
        item: callback.item,
        isSet: true
      });
      store.dispatch({
        type: "LoadList",
        List: callback.all.removed,
        msg: "Products loaded"
      });
    });

    store.subscribe(() => {
      if (store.getState().Cart.id === "cart")
        this.setState({
          cart: store.getState().Cart.cart
        });

      if (store.getState().NavTo.id === "router")
        this.setState({
          activeRoute: store.getState().NavTo.isAcitve
        });
    });
  }

  loadAssets = async () => {
    await Font.loadAsync({
      fontawesome: require("./app/assets/fonts/fontawesome.ttf"),
      icomoon: require("./app/assets/fonts/icomoon.ttf"),
      "Righteous-Regular": require("./app/assets/fonts/Righteous-Regular.ttf"),
      "Roboto-Bold": require("./app/assets/fonts/Roboto-Bold.ttf"),
      "Roboto-Medium": require("./app/assets/fonts/Roboto-Medium.ttf"),
      "Roboto": require("./app/assets/fonts/Roboto-Medium.ttf"),
      "Roboto-Regular": require("./app/assets/fonts/Roboto-Regular.ttf"),
      "Roboto-Light": require("./app/assets/fonts/Roboto-Light.ttf")
    });
    this.setState({ isLoaded: true });
  };

  renderLoading = () => <AppLoading />;

  renderApp = () => (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 23.5,
          backgroundColor: "#E11725"
        }}
      />
      <RenderApp />
    </View>
  );

  render = () =>
    this.state.isLoaded ? this.renderApp() : this.renderLoading();
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Frame />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
