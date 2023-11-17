import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../constants";

const EventDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'EventDetail'>>();
  const { eventTitle, eventDate } = route.params;

  const [isAttending, setIsAttending] = useState(false);
  const toggleAttendance = () => {

  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{eventTitle || 'Event Title'}</Text>
        <Text style={styles.organizer}>Organized by ___</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.detailText}>{eventDate || 'Starting Date & Time - Ending Date & Time'}</Text>
        <Text style={styles.detailText}>Type of Event: Job Fair</Text>
        <Text style={styles.detailText}>Potential Allergens: Lorem ipsum</Text>
        <Text style={styles.detailText}>Required Attendance: Yes</Text>
      </View>
      <View style={styles.mapContainer}>
        {/* You would include your map component here */}
        <Text>Map placeholder</Text>
      </View>
      <View style={styles.attendanceContainer}>
        <Button title="Are you at the event?" onPress={toggleAttendance} />
      </View>
      {/* Add more interactive elements as necessary */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  organizer: {
    fontSize: 18,
    marginTop: 10,
  },
  details: {
    padding: 20,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 10,
  },
  mapContainer: {
    height: 200, // Placeholder height for the map
    backgroundColor: '#e0e0e0', // Placeholder color for the map background
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
  },
  attendanceContainer: {
    padding: 20,
    alignItems: 'center',
  },
  // Add styles for other elements like buttons, etc.
});

export default EventDetailsScreen;
