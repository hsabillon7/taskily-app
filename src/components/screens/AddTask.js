import React, { useContext, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Modal,
  Portal,
  Text,
  TextInput,
  Title,
} from "react-native-paper";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import { Context as AuthContext } from "../../providers/AuthContext";

function AddTask({ navigation }) {
  const { state, addTask } = useContext(ProjectContext);
  const { state: authState } = useContext(AuthContext);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  // TODO: Agregar la tarea al proyecto
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
        />
        <TextInput
          placeholder="Task description"
          value={description}
          onChangeText={setDescription}
        />
        <Button onPress={handleAddTask}>Save</Button>
      </Modal>
    </Portal>
  );

  return (
    <View style={styles.container}>
      <Title>{state.currentProject.title}</Title>
      <Button onPress={() => setShowModal(true)}>Add task</Button>
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
});

export default AddTask;
