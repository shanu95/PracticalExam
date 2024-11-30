import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as SecureStore from "expo-secure-store";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/authSlice";
import { loginUser } from "../utils/apiService";
import theme from "../utils/theme";

const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    if (!email || !email.includes("@")) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const { token } = await loginUser(email, password); 

     
      dispatch(setToken(token));

      // saving token to SecureStorage
      await SecureStore.setItemAsync("userToken", token);

      navigation.navigate("HomeTab");
    } catch (error: any) {
      Alert.alert(
        "Login Failed",
        error.response?.data?.error || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
         
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/logo.png")}
              style={styles.logo}
            />
          </View>

          
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#999"
          />

         
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              placeholderTextColor="#999"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPasswordText}>
                {showPassword ? "Hide" : "Show"}
              </Text>
            </TouchableOpacity>
          </View>

         
          <TouchableOpacity onPress={() => Alert.alert("Feature Coming Soon!")}>
            <Text style={styles.forgotPassword}>Forgot your password?</Text>
          </TouchableOpacity>

         
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.loginButtonText}>
              {loading ? "Loading..." : "LOGIN"}
            </Text>
          </TouchableOpacity>

         
          <Text style={styles.orContinueText}>or continue with</Text>
          <View style={styles.socialLoginContainer}>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/fb.png")}
                style={styles.socialLogo}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton}>
              <Image
                source={require("../../assets/google.png")}
                style={styles.socialLogo}
              />
            </TouchableOpacity>
          </View>

        
          <Text style={styles.footerText}>
            By continuing, you agree to our{" "}
            <Text style={styles.linkText}>Terms of Service</Text>,{" "}
            <Text style={styles.linkText}>Privacy Policy</Text>
          </Text>

         
          <View style={styles.divider} />

         
          <Text style={styles.signupText}>
            Not have an account yet? <Text style={styles.linkTextFooter}>Join Us</Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
    keyboardAvoidingView: {
      flex: 1,
    },
    scrollView: {
      flexGrow: 1,
    },
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    logoContainer: {
      alignItems: "center",
      marginVertical: 10,
    },
    logo: {
      width: 160,
      height: 160,
    },
    label: {
      color: theme.colors.textPrimary,
      fontSize: 14,
      marginBottom: 8,
    },
    input: {
      backgroundColor: theme.colors.textInputBackground,
      color: theme.colors.textPrimary,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: theme.colors.loginLabels,
    },
    passwordContainer: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.colors.textInputBackground,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.colors.loginLabels,
      paddingHorizontal: 12,
    },
    passwordInput: {
      flex: 1,
      color: theme.colors.textPrimary,
      paddingVertical: 12,
    },
    showPasswordText: {
      color: theme.colors.brand,
      fontWeight: "bold",
    },
    forgotPassword: {
      color: theme.colors.brand,
      textAlign: "left",
      marginVertical: 10,
    },
    loginButton: {
      backgroundColor: theme.colors.brand,
      borderRadius: 25,
      padding: 15,
      alignItems: "center",
      marginBottom: 20,
    },
    loginButtonText: {
      color: theme.colors.textPrimary,
      fontWeight: "bold",
    },
    orContinueText: {
      color: theme.colors.textPrimary,
      textAlign: "center",
      marginBottom: 16,
    },
    socialLoginContainer: {
      flexDirection: "row",
      justifyContent: "center",
      marginBottom: 20,
    },
    socialButton: {
      backgroundColor: theme.colors.textInputBackground,
      borderRadius: 50,
      padding: 10,
      marginHorizontal: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    socialLogo: {
      width: 40,
      height: 40,
    },
    footerText: {
      color: theme.colors.textPrimary,
      textAlign: "center",
      fontSize: 12,
      marginBottom: 10,
    },
    linkText: {
      color: theme.colors.textPrimary,
      fontWeight: "bold",
    },
    linkTextFooter: {
      color: theme.colors.brand,
      fontWeight: "bold",
    },
    divider: {
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.textPrimary,
      marginVertical: 15,
    },
    signupText: {
      color: theme.colors.textPrimary,
      textAlign: "center",
      fontSize: 12,
    },
  });
  

export default LoginScreen;
