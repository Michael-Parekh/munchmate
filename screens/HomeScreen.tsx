import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Button } from "react-native";
import EventCard from "../components/EventCard";
import FilterButton from "../components/ButtonTextWithModal";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContent}>
        <View style={styles.buttonContainer}>
          <FilterButton buttonTitle="Date" />
          <FilterButton buttonTitle="Time" />
          <FilterButton buttonTitle="Organizer" />
          <FilterButton buttonTitle="Location" />
        </View>
      

      <EventCard eventTitle="Hack4Impact" eventDate="January 14th, 2023"/>
      <EventCard eventTitle="TechFusion Expo" eventDate="March 8th, 2023"/>
      <EventCard eventTitle="CodeCrafters Summit" eventDate="August 5th, 2023"/>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 16,
    alignContent: 'flex-start',
    padding: 0,
    margin: 0
  },
  filterContent: {
    alignContent: 'flex-start',

  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20, // Adjust as needed
  },
  button: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 11
  },
  card: {
    width: '100%',
    marginTop: 20, // Adjust as needed
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },

});

export default HomeScreen;
