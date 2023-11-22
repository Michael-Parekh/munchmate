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
        return <Pill icon="bakery-dining" text="Breakfast" color="#f5bf42" />;
      case 'Lunch':
        return <Pill icon="lunch-dining" text="Lunch" color="#f5aa42" />;
      case 'Dinner':
        return <Pill icon="dinner-dining" text="Dinner" color="#f59942" />;
      case 'Desert':
        return <Pill icon="cake" text="Desert" color="#f58442" />;
      case 'Snack':
        return <Pill icon="local-cafe" text="Snack" color="#f5da42" />;
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
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 3 }}>
              <MaterialIcons name="event" size={20} style={{ color: '#555555' }} />
              <Text style={styles.details}>{event.date}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 3 }}>
              <MaterialIcons name="schedule" size={20} style={{ color: '#555555' }} />
              <Text style={styles.details}>{event.start_time} - {event.end_time}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 3 }}>
              <MaterialIcons name="location-on" size={20}  style={{ color: '#555555' }} />
              <Text style={styles.details}>{event.location}</Text>
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
    fontSize: 14,
    color: '#555555',
    marginLeft: 5
  },
  detailsContainer: {
    marginVertical: 13,
    color: '#333'
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
