import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import LoginScreen from "../screens/LoginScreen";
import BottomTabs from "./BottomTabs";
import DetailsScreen from "../screens/DetailsScreen";
import { RootState } from "../redux/store";

const Stack = createStackNavigator();

const StackNavigator = () => {
  const isAuthenticated = useSelector((state: RootState) => !!state.auth.token);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    initialRouteName={isAuthenticated ? "HomeTabs" : "Login"}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="HomeTabs" component={BottomTabs} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
