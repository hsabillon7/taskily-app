import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import Logo from "../../../assets/Taskily-logo-square.png";

const { width, height } = Dimensions.get("screen");

function TaskilyLogo({ width, height }) {
  return (
    <View style={styles.container}>
      {width && height ? (
        <Image style={{ ...styles.logo, width, height }} source={Logo} />
      ) : (
        <Image style={styles.logo} source={Logo} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
  },
  logo: {
    width: width * 0.6,
    height: height * 0.3,
    resizeMode: "contain",
  },
});

export default TaskilyLogo;
