import { createStackNavigator } from "react-navigation";
import Products from "../screens/componets/Products/Products";
import Details from "../screens/componets/Products/Details";

const ProductsNavigator = createStackNavigator({
  ProductList: {
    screen: Products,
    navigationOptions: {
      header: null
    }
  }
});

const RootStack = createStackNavigator(
  {
    Main: {
      screen: ProductsNavigator
    },
    SubscriptionModal: {
      screen: Details
    }
  },
  {
    mode: "modal",
    headerMode: "none"
  }
);

export default RootStack;
