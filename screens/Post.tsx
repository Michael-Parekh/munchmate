import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Post: React.FC = () => {
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

export default Post;
