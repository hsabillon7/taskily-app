import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Task from "./Task";

function TaskList({ tasks }) {
  const emptyFlatList = (
    <View style={styles.emptyProjects}>
      <Text>No task added yet</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        ListEmptyComponent={emptyFlatList}
        numColumns={1}
        keyExtractor={(item) => item.timestamp.toString()}
        renderItem={({ item }) => (
          <Task
            name={item.name}
            description={item.description}
            done={item.done}
            timestamp={item.timestamp}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  emptyProjects: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "center",
  },
});

export default TaskList;
