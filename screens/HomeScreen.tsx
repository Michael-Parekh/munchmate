import React, { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal, Button, ScrollView, TextInput } from "react-native";
import EventCard from "../components/EventCard";
import FilterButton from "../components/ButtonTextWithModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from "../constants";
import { getData } from "../firebaseConfig";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigation = useNavigation<StackNavigationProp<StackParamList, 'Home'>>();

  useEffect(() => {
    // write your code here, it's like componentWillMount
    const getEvents = async () => {
      const data = await getData();
      setEvents(data);
      console.log(data);
    };

    getEvents()
  }, [])


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore Events</Text>
        </View>

        <TextInput
          style={styles.search}
          placeholder="Search by title"
        />

        <View style={styles.filterContent}>
          <View style={styles.buttonContainer}>
            <FilterButton buttonTitle="Date" />
            <FilterButton buttonTitle="Time" />
            <FilterButton buttonTitle="Organizer" />
            <FilterButton buttonTitle="Location" />
          </View>

          {events.map((item, index) => (
            <EventCard
              key={index}
              event={item}
              onPress={() => navigation.navigate('EventDetail', { eventId: item.id })}
            />
          ))}
        </View>
      </ScrollView>
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
    margin: 0,
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
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 10,
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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginTop: 20, // move screen header up/down
    width: '100%',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  search: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 7,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    marginTop: 10
  }
});

export default HomeScreen;
