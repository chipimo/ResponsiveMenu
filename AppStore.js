import { combineReducers, createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import IsUserLogedInReducer from "./app/reducers/authReducer/isUserLoggedIn";
import SocketConfigReducer from "./app/reducers/sockets/SocketConfig";
import ActivityReducer from "./app/reducers/activity/ActivityHandler";
import ProductsReducer from "./app/reducers/products/ProductList";
import TabNavReducer from "./app/reducers/routes/tabNav";
import NavToReducer from "./app/reducers/routes/NavTo";
import AppGlobalRoutesReducer from "./app/reducers/routes/AppGlobalRoutes";
import CartReducer from "./app/reducers/Cart";
import MapReducer from "./app/reducers/mapView/MapReducer";
import SubscriptionReducer from "./app/reducers/subscription/Subscription";
import ProductActivityReducer from "./app/reducers/productState/ActivityState";
import FacebookInfoReducer from "./app/reducers/authReducer/FacebookInfo";
import DeciveIDReducer from "./app/reducers/DeciveId";

const AllReducers = combineReducers({
  User: IsUserLogedInReducer,
  Cart: CartReducer,
  Map: MapReducer,
  Subscription: SubscriptionReducer,
  NavTo: NavToReducer,
  SocketConfig: SocketConfigReducer,
  Activity: ActivityReducer,
  Products: ProductsReducer,
  TabNav: TabNavReducer,
  ProductActivity: ProductActivityReducer,
  AppGlobalRoutes: AppGlobalRoutesReducer,
  FacebookInfo: FacebookInfoReducer,
  DeciveID:DeciveIDReducer
});

const store = createStore(AllReducers, applyMiddleware(thunk));

export default store;
