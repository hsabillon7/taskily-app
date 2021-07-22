import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import { Context as AuthContext } from "../../providers/AuthContext";

function Home() {
  const { signout } = useContext(AuthContext);

  return (
    <View>
      <Text>Welcome from home screen</Text>
      <Button onPress={signout}>Signout</Button>
    </View>
  );
}

const styles = StyleSheet.create({});

export default Home;
