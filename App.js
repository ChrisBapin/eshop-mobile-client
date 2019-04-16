import {
  createSwitchNavigator,
  createStackNavigator,
  createAppContainer,
} from "react-navigation";

// import AuthLoadingScreen from "./containers/AuthLoadingScreen";
// import SignInScreen from "./containers/SignInScreen";
// import SignUpScreen from "./containers/SignUpScreen";
import CategoryScreen from "./containers/CategoryScreen";
import ProductScreen from "./containers/ProductScreen";

const AppStack = createStackNavigator({
  // Tab: TabNavigator,
  // SignIn: SignInScreen,
  // SignUp: SignUpScreen,
  Category: CategoryScreen,
  Product: ProductScreen,
});
// const AuthStack = createStackNavigator({
//   // SignIn: SignInScreen,
//   // SignUp: SignUpScreen,
// });

// export default createAppContainer(
//   createSwitchNavigator(
//     {
//       // AuthLoading: AuthLoadingScreen,
//       // Category: CategoryScreen,
//       App: AppStack,
//       Auth: AuthStack,
//     },
//     {
//       initialRouteName: "App",
//     }
//   )
// );

const App = createAppContainer(AppStack);

export default App;
