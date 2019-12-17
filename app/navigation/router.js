import { createSwitchNavigator } from "react-navigation";
import { MainRoute } from "./MainRoute";

export const createRootNavigator = () => {
  return createSwitchNavigator({
    Main: {
      screen: MainRoute 
    },
    // Auth: {
    //   screen: Profile
    // }
  });
};
