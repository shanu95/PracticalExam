import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/ExploreScreen";
import LibraryScreen from "../screens/LibraryScreen";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === "HomeTab") {
            iconName = "home-outline";
          } else if (route.name === "Explore") {
            iconName = "search-outline";
          } else if (route.name === "Library") {
            iconName = "library-outline";
          } else {
            iconName = "alert";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFD700",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Library" component={LibraryScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: "#121212",
    borderTopWidth: 0,
    elevation: 5,
  },
});

export default BottomTabs;
