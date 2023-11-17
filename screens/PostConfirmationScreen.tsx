import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ScreenNames } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type RootBottomTabsParamList = {
  POST: undefined
}

const PostConfirmationScreen: React.FC = () => {

  const navigation = useNavigation<BottomTabNavigationProp<RootBottomTabsParamList>>();;

  const handlePressSubmit = () => {
    // Handle form submission logic here
    navigation.navigate(ScreenNames.POST);
  };

  return (
    <View style={styles.view}>
      <MaterialCommunityIcons name="check" size={250} color={"#43a82a"} />
      <Text style={styles.header}>Submitted</Text>
      <Text style={styles.paragraph}>Your event has been submitted to MunchMate for review. If approved, it will be successfully posted to users.</Text>
      <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
        <Text style={styles.submitButtonText}>Create another event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    padding: 10,
    color: "#43a82a"
  },
  paragraph: {
    fontSize: 15,
    marginBottom: 16,
    marginLeft: 25,
    marginRight: 25,
    textAlign: 'center',
    padding: 20
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostConfirmationScreen;

