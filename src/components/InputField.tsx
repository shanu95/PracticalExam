import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../utils/theme";

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  showPassword?: boolean;
  togglePassword?: () => void;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  showPassword,
  togglePassword,
  keyboardType = "default",
}) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputContainer, secureTextEntry && styles.passwordContainer]}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry && !showPassword}
        placeholderTextColor="#999"
        keyboardType={keyboardType}
      />
      {secureTextEntry && togglePassword && (
        <TouchableOpacity onPress={togglePassword}>
          <Text style={styles.togglePassword}>{showPassword ? "Hide" : "Show"}</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    color: theme.colors.textPrimary,
    fontSize: 14,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.textInputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: theme.colors.loginLabels,
    height: 50,
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    color: theme.colors.textPrimary,
    fontSize: 16,
    paddingVertical: 0,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  togglePassword: {
    color: theme.colors.brand,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default InputField;
