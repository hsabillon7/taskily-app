import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Caption, IconButton, TextInput } from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import theme from "../../theme";

function CreateProject({ navigation }) {
  const { createProject } = useContext(ProjectContext);
  const { state } = useContext(AuthContext);
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [timestamp, setTimestamp] = useState(Date.now());
  const [projectNameError, setProjectNameError] = useState(false);
  const [projectDescriptionError, setProjectDescriptionError] = useState(false);

  function handleSave() {
    if (!projectName) setProjectNameError(true);
    else if (!projectDescription) setProjectDescriptionError(true);
    else if (projectName && projectDescription) {
      createProject(projectName, projectDescription, timestamp, state.user.id);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Project name"
        value={projectName}
        onChangeText={setProjectName}
        style={styles.inputs}
      />
      {projectNameError && (
        <Caption>A name for the project is required!</Caption>
      )}
      <TextInput
        placeholder="Describe the project"
        value={projectDescription}
        onChangeText={setProjectDescription}
        multiline
        numberOfLines={6}
        style={styles.inputs}
      />
      {projectDescriptionError && (
        <Caption>A description for the project is required!</Caption>
      )}
      <View style={styles.buttons}>
        <Button onPress={() => navigation.goBack()}>Cancel</Button>
        <Button onPress={handleSave}>Save</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundWhite,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
  },
  iconBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  inputs: {
    marginBottom: 10,
  },
});

export default CreateProject;
