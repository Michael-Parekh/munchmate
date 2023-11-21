import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Button, TextInput, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Pill from './Pill';

const EventCard = ({ event, onPress }: { event: any, onPress: () => void }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const getPillByMeal = (event: any) => {
    switch (event.meal) {
      case 'Breakfast':
        return <Pill icon="bakery-dining" text="Breakfast" color="#0d8eff" />;
      case 'Lunch':
        return <Pill icon="lunch-dining" text="Lunch" color="#fcba03" />;
      case 'Dinner':
        return <Pill icon="dinner-dining" text="Dinner" color="#9e0dff" />;
      case 'Desert':
        return <Pill icon="cake" text="Desert" color="#ff0d8e" />;
      case 'Snack':
        return <Pill icon="local-cafe" text="Snack" color="#fc6b03" />;
      default:
        return null;
    }
  };

  const getPillByAttendance = (event: any) => {
    switch (event.req_attendance) {
      case true:
        return <Pill icon="check-circle" text="Attendance Required" color="#00cf45" />;
      case false:
        return <Pill icon="cancel" text="No Attendance Required" color="#fc3503" />;
      default:
        return <Text>{"HEY"}</Text>;
    }
  };

  return (
    <>
      <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
          <Text style={styles.title}>{event.title}</Text>
          <View style={styles.detailsContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="event" size={20} />
              <Text>{event.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="schedule" size={20} />
              <Text>{event.start_time} - {event.end_time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <MaterialIcons name="location-on" size={20} />
              <Text>{event.location}</Text>
            </View>
          </View>

          <View style={styles.pills}>
            {getPillByMeal(event)}
            {getPillByAttendance(event)}
          </View>

        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderWidth: 2,
    borderColor: '#ccc',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Android shadow
    margin: 10,
    width: '95%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#666',
  },
  detailsContainer: {
    marginVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 20,
  },
  pills: {
    flexDirection: 'row', // Display pills in a row
    
  }
});

export default EventCard;
