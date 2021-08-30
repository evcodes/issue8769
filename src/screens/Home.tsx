import React from "react";
import { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { Auth } from "@aws-amplify/auth";

export default function Home({ updateAuthState }) {
  const [identityId, setIdentityId] = useState("");
  const [identityPool, setIdentityPool] = useState("");

  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState("loggedOut");
    } catch (error) {
      console.log("Error signing out: ", error);
    }
  }

  async function showIdentityPool() {
    const user = await Auth.currentSession();
    setIdentityPool(user.getIdToken().payload["iss"]);
  }
  async function showIdentityId() {
    const user = await Auth.currentUserInfo();
    setIdentityId(user.id);
  }

  function clear() {
    setIdentityId("");
    setIdentityPool("");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Identity ID Demo</Text>
      <Text>Identity pool: {identityPool}</Text>
      <Text>Identity Id: {identityId}</Text>
      <Button onPress={showIdentityId} title="Show Identity Id" />
      <Button onPress={showIdentityPool} title="Show Identity Pool" />
      <Button color="tomato" onPress={clear} title="Clear Data" />

      <Button title="Sign Out" color="tomato" onPress={signOut} />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
    padding: 5,
    textAlign: "justify",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
});
