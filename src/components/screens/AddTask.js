import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  IconButton,
  Modal,
  Portal,
  Subheading,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import { Context as AuthContext } from "../../providers/AuthContext";
import ProgressCircle from "react-native-progress-circle";
import theme from "../../theme";
import TaskList from "../shared/TaskList";
import { getProjectTotalPercent } from "../../utils";

function AddTask({ navigation }) {
  const { state, addTask } = useContext(ProjectContext);
  const { state: authState } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    addTask(
      state.currentProject.id,
      authState.user.id,
      name,
      description,
      Date.now()
    );
    setShowModal(false);
  };

  const addTaskModal = () => (
    <Portal>
      <Modal visible={showModal} contentContainerStyle={styles.modal}>
        <TextInput
          placeholder="Task name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Task description"
          value={description}
          onChangeText={setDescription}
          style={styles.input}
        />
        <View style={styles.modalButtons}>
          <Button onPress={() => setShowModal(false)}>Cancel</Button>
          <Button onPress={handleAddTask}>Save</Button>
        </View>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Title>{state.currentProject.title}</Title>
        <View style={styles.projectInfo}>
          <View style={{ flex: 3 }}>
            <Text>{state.currentProject.description}</Text>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <ProgressCircle
              percent={getProjectTotalPercent(state.currentProject.tasks)}
              radius={40}
              borderWidth={8}
              color={theme.colors.primary}
              bgColor={theme.colors.backgroundWhite}
              shadowColor="#CCC"
            >
              <Text>{getProjectTotalPercent(state.currentProject.tasks)}%</Text>
            </ProgressCircle>
          </View>
        </View>
      </View>
      <View style={styles.addTaskContainer}>
        <Subheading style={styles.addTask}>Add task</Subheading>
        <IconButton
          onPress={() => setShowModal(true)}
          mode="contained"
          icon="plus-circle"
          color={theme.colors.primary}
        />
      </View>
      <TaskList tasks={state.currentProject.tasks} />
      {showModal && addTaskModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modal: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  input: {
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  header: {
    backgroundColor: theme.colors.backgroundWhite,
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 30,
  },
  projectInfo: {
    flexDirection: "row",
    marginTop: 20,
    justifyContent: "space-evenly",
  },
  addTaskContainer: {
    marginTop: 20,
    marginHorizontal: 20,
    flexDirection: "row",
  },
  addTask: {
    fontWeight: "bold",
    marginTop: 10,
  },
});

export default AddTask;
