import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import theme from "../../theme";
import SignupForm from "../forms/SignupForm";

function Signup({ navigation }) {
  return (
    <View style={styles.container}>
      <SignupForm />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text>
          Already got an account? <Text style={styles.signin}>Sign in</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 10,
    backgroundColor: theme.colors.backgroundWhite,
  },
  signin: {
    color: theme.colors.primary,
  },
});

export default Signup;
