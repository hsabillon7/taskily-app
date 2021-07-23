import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Button, FAB, Text, Title } from "react-native-paper";
import { Context as AuthContext } from "../../providers/AuthContext";
import theme from "../../theme";

function Home({ navigation }) {
  const { signout } = useContext(AuthContext);

  return (
    <>
      <View>
        <Title style={styles.title}>My projects</Title>
        {/* Listado de proyectos existentes */}
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
