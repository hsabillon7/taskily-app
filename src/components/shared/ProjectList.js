import React, { useContext } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import Project from "./Project";
import { Context as ProjectContext } from "../../providers/ProjectContext";

function ProjectList({ projects, navigation }) {
  const { setCurrentProject } = useContext(ProjectContext);

  const handleSelectProject = (project) => {
    setCurrentProject(project);
    navigation.navigate("AddTask");
  };

  const emptyFlatList = (
    <View style={styles.emptyProjects}>
      <Text>You don't have any project yet...</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={projects}
        ListEmptyComponent={emptyFlatList}
        numColumns={2}
        renderItem={({ item }) => (
          <>
            <TouchableOpacity onPress={() => handleSelectProject(item)}>
              <Project
                id={item.id}
                title={item.title}
                timestamp={item.timestamp}
              />
            </TouchableOpacity>
          </>
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

export default ProjectList;
