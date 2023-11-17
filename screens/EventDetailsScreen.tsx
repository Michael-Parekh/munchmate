import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../constants";
import { AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

const EventDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'EventDetail'>>();
  const { eventTitle, eventDate } = route.params;

  const [upvotes, setUpvotes] = useState(30);
  const [downvotes, setDownvotes] = useState(3);
  const [vote, setVote] = useState<'upvote' | 'downvote' | null>(null);

  const handleVote = (type: 'upvote' | 'downvote') => {
    if (type === 'upvote' && vote !== 'upvote') {
      setUpvotes(upvotes + 1);
      if (vote === 'downvote') {
        setDownvotes(downvotes - 1);
      }
      setVote('upvote');
    } else if (type === 'downvote' && vote !== 'downvote') {
      setDownvotes(downvotes + 1);
      if (vote === 'upvote') {
        setUpvotes(upvotes - 1);
      }
      setVote('downvote');
    }
  };

  const [isAttending, setIsAttending] = useState(false);
  const toggleAttendance = () => {
    setIsAttending(!isAttending);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{eventTitle || 'Event Title'}</Text>
        <Text style={styles.organizer}>Organized by UIUC</Text>
      </View>
      <View style={styles.votingContainer}>
        <AntDesign
          name="upcircleo"
          size={24}
          color={vote === 'upvote' ? 'blue' : 'black'}
          onPress={() => handleVote('upvote')}
        />
        <Text style={styles.voteCount}>{upvotes}</Text>
        <AntDesign
          name="downcircleo"
          size={24}
          color={vote === 'downvote' ? 'red' : 'black'}
          onPress={() => handleVote('downvote')}
        />
        <Text style={styles.voteCount}>{downvotes}</Text>
      </View>
      <View style={styles.details}>
        <View style={styles.detailContainer}>
          <AntDesign name="calendar" size={20} style={styles.icon} />
          <Text style={styles.detailText}>{eventDate || 'Starting Date & Time - Ending Date & Time'}</Text>
        </View>
        <View style={styles.detailContainer}>
          <AntDesign name="profile" size={20} style={styles.icon} />
          <Text style={styles.detailText}>Type of Event: Job Fair</Text>
        </View>
        <View style={styles.detailContainer}>
          <MaterialIcons name="all-inclusive" size={20} style={styles.icon} />
          <Text style={styles.detailText}>Potential Allergens: Shell</Text>
        </View>
        <View style={styles.detailContainer}>
          <FontAwesome name="users" size={20} style={styles.icon} />
          <Text style={styles.detailText}>Required Attendance: Yes</Text>
        </View>
      </View>
      <View style={styles.mapContainer}>
        {/* You would include your map component here */}
        <Text>Map placeholder</Text>
      </View>
      <View style={styles.attendanceContainer}>
        {/* <Button title="Are you at the event?" onPress={toggleAttendance} /> */}
        <Button
          title={isAttending ? "Yes, I'm attending" : "Are you at the event?"}
          onPress={toggleAttendance}
          color={isAttending ? "green" : "blue"} // Optional: change button color to indicate status
        />
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
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  voteCount: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default EventDetailsScreen;
