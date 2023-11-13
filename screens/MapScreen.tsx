import React from "react";
import { StyleSheet, Text, View } from "react-native";

const MapScreen: React.FC = () => {
  return (
    <View style={styles.view}>
      <Text>Map Screen</Text>
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

export default MapScreen;
