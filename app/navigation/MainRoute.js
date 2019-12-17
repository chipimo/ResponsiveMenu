import { createStackNavigator } from "react-navigation";
import MainView from "../screens/componets/Main/MainView";
import Profile from "../screens/componets/profile/Profile";
import { Notification } from "../screens/componets/Notifications/Notification";
import MapViewComp from "../screens/componets/MapView";
import Billing from "../screens/componets/Billing/Billing";
import CustomerCare from "../screens/componets/CustomerCare/CustomerCare";
import About from "../screens/componets/About/About";
import Tcs from "../screens/componets/TCS/tcs";
import Share from "../screens/componets/Share/Share";
import RateUs from "../screens/componets/RateUs/RateUs";

const ProfileRoute = createStackNavigator(
  {
    ProfileView: {
      screen: Profile
    },
    Location: {
      screen: MapViewComp
    },
    Billing: {
      screen: Billing
    },
    CustomerCare: {
      screen: CustomerCare
    },
    About: {
      screen: About
    },
    Tcs: {
      screen: Tcs
    },
    Share: {
      screen: Share
    },
    RateUs: {
      screen: RateUs
    },
  },
  {
    headerMode: "none"
  }
);

export const MainRoute = createStackNavigator(
  {
    Main: {
      screen: MainView
    },
    Profile: {
      screen: ProfileRoute
    },
    Notification: {
      screen: Notification
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);
