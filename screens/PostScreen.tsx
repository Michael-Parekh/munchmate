import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenNames } from "../constants";

export type RootBottomTabParamList = {
  POST_CONFIRMATION: undefined;
};

const PostScreen: React.FC = () => {

  const [title, setTitle] = useState('');
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  const {navigate} = useNavigation<BottomTabNavigationProp<RootBottomTabParamList>>();

  const handlePressSubmit = () => {
    navigate(ScreenNames.POST_CONFIRMATION)
  };
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Event</Text>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Event title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Organizer name"
          keyboardType="email-address"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Date"
          secureTextEntry
          value={date}
          onChangeText={(text) => setDate(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Start time"
          secureTextEntry
          value={startTime}
          onChangeText={(text) => setStartTime(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="End time"
          secureTextEntry
          value={endTime}
          onChangeText={(text) => setEndTime(text)}
        />

        <TextInput
          style={styles.textArea}
          placeholder="Description of event"
          multiline
          numberOfLines={8}
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
  },
  formContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 150,
    width: '85%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
    textAlignVertical: 'top',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkboxText: {
    marginLeft: 8,
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

export default PostScreen;
