import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Caption, Text, TextInput } from "react-native-paper";
import { Context as AuthContext } from "../../providers/AuthContext";
import { validate } from "email-validator";

function SignupForm({ navigation }) {
  const { state, signup } = useContext(AuthContext);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullnameError, setFullnameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [error, setError] = useState(false);

  // Verificar si el usuario se registra en la app
  useEffect(() => {
    if (state.registered) navigation.navigate("Home");
  }, [state.registered]);

  function handleVerify(input) {
    if (input === "fullname") {
      if (!fullname) setFullnameError(true);
      else setFullnameError(false);
    } else if (input === "email") {
      if (!email) setEmailError(true);
      else if (!validate(email)) setEmailError(true);
      else setEmailError(false);
    } else if (input === "password") {
      if (!password) setPasswordError(true);
      else if (password.length < 6) setPasswordError(true);
      else setPasswordError(false);
    } else if (input === "confirmPassword") {
      if (!confirmPassword) setConfirmPasswordError(true);
      else if (password !== confirmPassword) setConfirmPasswordError(true);
      else setConfirmPasswordError(false);
    } else if (input === "signup") {
      if (
        fullname &&
        email &&
        password &&
        confirmPassword &&
        !fullnameError &&
        !emailError &&
        !passwordError &&
        !confirmPasswordError
      ) {
        try {
          signup(fullname, email, password);
        } catch (error) {
          console.log(error);
        }
      } else setError("All fields are required!");
    }
  }

  return (
    <View>
      {error && <Text>{error}</Text>}
      {state.errorMessage != null && <Text>{state.errorMessage}</Text>}
      <TextInput
        mode="outlined"
        label="Fullname"
        value={fullname}
        onChangeText={setFullname}
        onBlur={() => handleVerify("fullname")}
      />
      {fullnameError && <Caption>Please enter your name</Caption>}
      <TextInput
        mode="outlined"
        label="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        onBlur={() => handleVerify("email")}
      />
      {emailError && <Caption>Please enter your email address</Caption>}
      <TextInput
        mode="outlined"
        label="Password"
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
        secureTextEntry
        onBlur={() => handleVerify("password")}
      />
      {passwordError && (
        <Caption>Please enter a valid password. Min 6 characters</Caption>
      )}
      <TextInput
        mode="outlined"
        label="Confirm password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        autoCapitalize="none"
        secureTextEntry
        onBlur={() => handleVerify("confirmPassword")}
      />
      {confirmPasswordError && (
        <Caption>Please enter your password confirmation</Caption>
      )}
      <Button
        mode="contained"
        style={styles.button}
        onPress={() => handleVerify("signup")}
      >
        Create account
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default SignupForm;
