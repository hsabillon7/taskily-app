import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Card, Caption, Text, Subheading, Switch } from "react-native-paper";
import { format } from "date-fns";
import theme from "../../theme";
import { Context as ProjectContext } from "../../providers/ProjectContext";

function Task({ name, description, done, timestamp }) {
  const { state, udpateTaskStatus } = useContext(ProjectContext);

  const setDone = (isDone) => {
    udpateTaskStatus(state.currentProject, {
      name,
      description,
      done: !isDone,
      timestamp,
    });
  };

  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <Switch
          value={done}
          color={theme.colors.primary}
          onValueChange={() => setDone(done)}
        />
        <View>
          <Subheading style={styles.name}>{name}</Subheading>
          <Text>{description}</Text>
        </View>
      </Card.Content>
      <Caption style={styles.timestamp}>
        {format(timestamp, "eee H:mm")}
      </Caption>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 10,
  },
  timestamp: {
    alignSelf: "flex-end",
    marginRight: 15,
  },
  name: {
    fontWeight: "bold",
  },
  content: {
    flexDirection: "row",
  },
});

export default Task;
