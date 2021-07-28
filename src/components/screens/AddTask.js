import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";

function AddTask({ navigation }) {
  const { state } = useContext(ProjectContext);

  return (
    <View>
      <Text>Hello from AddTask</Text>
      <Text>{state.currentProject.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});

export default AddTask;
