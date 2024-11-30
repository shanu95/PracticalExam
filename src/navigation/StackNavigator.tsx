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
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          {/* navigating to home tab if authenticated */}
          <Stack.Screen name="HomeTab" component={BottomTabs} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </>
      ) : (
        <>
          {/* if not show login screen */}
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
