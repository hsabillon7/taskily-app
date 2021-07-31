import React from "react";
import { StyleSheet, View } from "react-native";
import { Card, Caption, Text, Title } from "react-native-paper";
import { format } from "date-fns";
import ProgressCircle from "react-native-progress-circle";
import { getProjectTotalPercent } from "../../utils";
import theme from "../../theme";

function Project({ id, title, description, tasks, timestamp }) {
  return (
    <Card style={styles.container}>
      <Card.Content style={styles.content}>
        <View style={{ flex: 2 }}>
          <Title>{title}</Title>
          <Text>{description}</Text>
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <ProgressCircle
            percent={getProjectTotalPercent(tasks)}
            radius={30}
            borderWidth={8}
            color={theme.colors.primary}
            bgColor={theme.colors.backgroundWhite}
            shadowColor="#CCC"
          >
            <Text>{getProjectTotalPercent(tasks)}%</Text>
          </ProgressCircle>
        </View>
      </Card.Content>
      <Card.Actions style={styles.actions}>
        <Caption style={styles.timestamp}>
          {format(timestamp, "eee H:mm")}
        </Caption>
        <Caption>{tasks ? tasks.length : 0} tasks</Caption>
      </Card.Actions>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
  },
  timestamp: {
    alignSelf: "flex-end",
    marginRight: 15,
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
});

export default Project;
