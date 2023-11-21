import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { ScreenNames } from "../constants";
import { collection, addDoc } from "firebase/firestore"; 
import { sendData } from "../firebaseConfig";

export type RootBottomTabParamList = {
  POST_CONFIRMATION: undefined;
};

const PostScreen: React.FC = () => {

  const [title, setTitle] = useState('');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [meal, setMeal] = useState('');
  const [allergens, setAllergens] = useState('');
  const [reqAttendance, setReqAttendance] = useState(false);
  const [description, setDescription] = useState('');

  const {navigate} = useNavigation<BottomTabNavigationProp<RootBottomTabParamList>>();

  const [showErrors, setShowErrors] = useState(false);

  const handlePressSubmit = () => {
    setShowErrors(true);

    if (!title || !organizer || !date || !startTime || !endTime || !location || !meal || !allergens || !description) {
      Alert.alert('Try Again', 'Please fill out all required fields');
    } else {
      setShowErrors(false);

      setTitle('');
      setOrganizer('');
      setDate('');
      setStartTime('');
      setEndTime('');
      setLocation('');
      setMeal('');
      setAllergens('');
      setReqAttendance(false);
      setDescription('');
  
      sendData(title, organizer, date, startTime, endTime, location, meal, allergens, reqAttendance, description);
  
      navigate(ScreenNames.POST_CONFIRMATION);
    }
  };

  const isFieldEmpty = (value: string) => value.trim() === '';
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Create Event</Text>

      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Event title"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(title) && showErrors && styles.inputError]}
            placeholder="Event title"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Organizer name"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(organizer) && showErrors && styles.inputError]}
            placeholder="Organizer name" 
            value={organizer}
            onChangeText={(text) => setOrganizer(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Date"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(date) && showErrors && styles.inputError]}
            placeholder="Date"
            value={date}
            onChangeText={(text) => setDate(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Start time"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(startTime) && showErrors && styles.inputError]}
            placeholder="Start time"
            value={startTime}
            onChangeText={(text) => setStartTime(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"End time"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(endTime) && showErrors && styles.inputError]}
            placeholder="End time"
            value={endTime}
            onChangeText={(text) => setEndTime(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Location"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(location) && showErrors && styles.inputError]}
            placeholder="Location"
            value={location}
            onChangeText={(text) => setLocation(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Meal type"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(meal) && showErrors && styles.inputError]}
            placeholder="Meal type"
            value={meal}
            onChangeText={(text) => setMeal(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Allergens"}</Text>
          <TextInput
            style={[styles.input, isFieldEmpty(allergens) && showErrors && styles.inputError]}
            placeholder="Allergens"
            value={allergens}
            onChangeText={(text) => setAllergens(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>{"Description of event"}</Text>
          <TextInput
            style={[styles.textArea, isFieldEmpty(description) && showErrors && styles.inputError]}
            placeholder="Description of event"
            multiline
            numberOfLines={8}
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton} onPress={handlePressSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 16,
    marginTop: 50,
  },
  header: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'left',
  },
  formContainer: {
    alignItems: 'center',
    height: 1000
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  textArea: {
    height: 150,
    width: '100%',
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
  inputContainer: {
    textAlign: 'left',
    width: '85%'
  },
  label: {
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 2,
    color: '#888',
    textAlign: 'left'
  },
  inputError: {
    borderColor: 'red',
  },
});

export default PostScreen;
