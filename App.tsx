import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NavigationContainer } from "@react-navigation/native";
import store, { persistor } from "./src/redux/store";
import { enableScreens } from "react-native-screens";
import StackNavigator from "./src/navigation/StackNavigator";
import { StatusBar, SafeAreaView, StyleSheet, ActivityIndicator } from "react-native";

enableScreens();

const App = () => {
  return (
    <Provider store={store}>
     
      <PersistGate loading={<ActivityIndicator size="large" color="#FFD700" />} persistor={persistor}>
        <NavigationContainer>
         
          <StatusBar barStyle="light-content" backgroundColor="#121212" />
          
        
          <SafeAreaView style={styles.safeArea}>
            <StackNavigator />
          </SafeAreaView>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
});

export default App;
