import React from "react";
import { StyleSheet, Text, View } from "react-native";

const EventDetails: React.FC = () => {
  return (
    <View style={styles.view}>
      <Text>EventDetails Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default EventDetails;
