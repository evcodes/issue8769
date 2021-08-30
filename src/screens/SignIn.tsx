import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Switch } from "react-native";
import { Auth } from "@aws-amplify/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import AppTextInput from "../components/AppTextInput";
import AppButton from "../components/Button";

export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log("✅ Login Successful");
      updateAuthState("loggedIn");
    } catch (error) {
      console.log("❌ Error signing in...", error);
    }
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Sign in to your account</Text>
        
		<AppTextInput
          value={username}
          onChangeText={(text) => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          leftIcon="lock"
          placeholder="Enter password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        <Text>Remember Device</Text>

        <AppButton title="Login" onPress={signIn} />
        <View style={styles.footerButtonContainer}>	
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.forgotPasswordButtonText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#202020",
    fontWeight: "500",
    marginVertical: 15,
  },
  footerButtonContainer: {
    marginVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  forgotPasswordButtonText: {
    color: "tomato",
    fontSize: 18,
    fontWeight: "600",
  },
});
