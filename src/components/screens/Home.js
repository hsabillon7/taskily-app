import React, { useContext, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB, Text, Title } from "react-native-paper";
import { Context as AuthContext } from "../../providers/AuthContext";
import { Context as ProjectContext } from "../../providers/ProjectContext";
import theme from "../../theme";
import ProjectList from "../shared/ProjectList";

function Home({ navigation }) {
  const { state, signout } = useContext(AuthContext);
  const { state: projectState, getProjects } = useContext(ProjectContext);

  useEffect(() => {
    getProjects(state.user.id);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <Title style={styles.title}>My projects</Title>
        {/* Listado de proyectos existentes */}
        <ProjectList projects={projectState.projects} navigation={navigation} />
        {/* <Button onPress={signout}>Signout</Button> */}
        {/* Una forma de acceder a la pantalla de creación de nuevos proyectos */}
      </View>
      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => navigation.navigate("CreateProject")}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 30,
    paddingLeft: 10,
  },
  fab: {
    backgroundColor: theme.colors.primary,
    position: "absolute",
    right: 0,
    bottom: 10,
    margin: 20,
  },
});

export default Home;
