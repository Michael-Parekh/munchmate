import React from "react";
import { StyleSheet, Text, View } from "react-native";

const PostScreen: React.FC = () => {
  return (
    <View style={styles.view}>
      <Text>Post Screen</Text>
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

export default PostScreen;
