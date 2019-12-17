import { createStackNavigator } from "react-navigation";
import MapViewComp from "../screens/componets/MapView";
import Store from "../screens/componets/Store";

const MainStore = createStackNavigator({
  StoreNav: {
    screen: Store,
    navigationOptions: {
      header: null
    }
  }
}); 

export const StorRootStack = createStackNavigator(
  {
    Main: {
      screen: MainStore
    },
    MapModal: {
      screen: MapViewComp
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

