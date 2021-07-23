import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, Text, TextInput } from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import theme from "../../theme";

function CreateProject({ navigation }) {
  const { createProject } = useContext(ProjectContext);
  const { state } = useContext(AuthContext);
  const [projectName, setProjectName] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());

  function handleSave() {
    if (projectName) {
      createProject(projectName, timestamp, state.user.id);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.iconBar}>
        <IconButton
          icon="close-circle-outline"
          color={theme.colors.primary}
          onPress={() => navigation.goBack()}
        />
        <IconButton
          icon="check-circle-outline"
          color={theme.colors.primary}
          onPress={() => handleSave()}
        />
      </View>
      <TextInput
        placeholder="Project name"
        value={projectName}
        onChangeText={setProjectName}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  iconBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
});

export default CreateProject;
