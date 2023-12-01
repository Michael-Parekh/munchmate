import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../constants";
import { AntDesign, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';
import { getEventData } from "../firebaseConfig";
import { blue100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";

const EventDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'EventDetail'>>();
  const { eventId } = route.params;

  const [eventDetails, setEventDetails] = useState<any>(null);
  const [upvotes, setUpvotes] = useState(30);
  const [downvotes, setDownvotes] = useState(3);
  const [vote, setVote] = useState<'upvote' | 'downvote' | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventData = await getEventData(eventId);
      if (eventData) {
        setEventDetails(eventData);
        // setUpvotes(eventData.upvotes);
        // setDownvotes(eventData.downvotes);
      }
    };

    fetchEvent();
  }, [eventId]);

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

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{eventDetails?.title}</Text>
        <Text style={styles.organizer}>Organized by {eventDetails?.organizer}</Text>
      </View>

      <View style={styles.dateTimeSection}>
        <Text style={styles.dateSubtitle}>{`Event Date: ${eventDetails?.date}`}</Text>

        <View style={styles.timeContainer}>
          <View style={styles.timeSubContainer}>
            <AntDesign name="clockcircleo" size={20} style={styles.icon} />
            <View>
              <Text style={styles.timeTitle}>Start Time</Text>
              <Text style={styles.time}>{eventDetails?.start_time}</Text>
            </View>
          </View>

          <View style={styles.timeSubContainer}>
            <AntDesign name="clockcircleo" size={20} style={styles.icon} />
            <View>
              <Text style={styles.timeTitle}>End Time</Text>
              <Text style={styles.time}>{eventDetails?.end_time}</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.voteContainer}>
        <Text style={styles.voteTitle}>Do you like this event?</Text>

        <View style={styles.votingSubContainer}>
          <AntDesign
            name="upcircleo"
            size={40}
            color={vote === 'upvote' ? 'blue' : 'black'}
            onPress={() => handleVote('upvote')}
          />
          <Text style={styles.voteCount}>{upvotes}</Text>
          <AntDesign
            name="downcircleo"
            size={40}
            color={vote === 'downvote' ? 'red' : 'black'}
            onPress={() => handleVote('downvote')}
          />
          <Text style={styles.voteCount}>{downvotes}</Text>
        </View>
      </View>

      <View style={styles.locationSection}>
        <View>
          {/* <FontAwesome5 name="map-marker-alt" size={20} style={styles.icon} /> */}
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.location}>{eventDetails?.location}</Text>
        </View>
      </View>

      <View style={styles.attendanceNote}>
        <Text>{eventDetails?.req_attendance ? "Attendance is required" : "Attendance is not required"}</Text>
      </View>

      <View style={styles.mealAllergensSection}>
        <View style={styles.timeSubContainer}>
          <MaterialIcons name="restaurant-menu" size={20} style={styles.icon} />
          <View>
            <Text style={styles.timeTitle}>Meal</Text>
            <Text style={styles.time}>{eventDetails?.meal}</Text>
          </View>
        </View>

        <View style={styles.timeSubContainer}>
          <MaterialIcons name="warning" size={20} style={styles.icon} />
          <View>
            <Text style={styles.timeTitle}>Allergens</Text>
            <Text style={styles.time}>{eventDetails?.allergens}</Text>
          </View>
        </View>
      </View>

      <View style={styles.descriptionSection}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>{eventDetails?.description}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  organizer: {
    fontSize: 24,
    marginTop: 10,
  },
  voteContainer: {
    marginTop: 10,
    marginHorizontal: 16,
    backgroundColor: '#F8DFD4',
    padding: 20,
    // borderWidth: 1,
  },
  voteTitle: {
    textAlign: 'center',
    fontSize: 20,

  },
  votingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  voteCount: {
    fontSize: 20,
    marginHorizontal: 15,
  },
  dateTimeSection: {
    padding: 20,
    marginHorizontal: 16,
    borderRadius: 15,
    backgroundColor: '#fff', // Recommended for shadow effect
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // For Android
  },
  dateSubtitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeContainer: {
    flexDirection: 'row',
  },
  timeSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#5FBDFF',
    width: 150,
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 15,
    // backgroundColor: '#fff', // Recommended for shadow effect
    // shadowColor: '#000', // Shadow color
    // shadowOffset: { width: 0, height: 2 }, // Shadow offset
    // shadowOpacity: 0.25, // Shadow opacity
    // shadowRadius: 3.84, // Shadow radius
    // elevation: 5, // For Android
  },
  timeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  time: {
    fontSize: 16,
    marginLeft: 10,
  },
  locationSection: {
    padding: 20,
    // borderWidth: 1,
  },
  location: {
    fontSize: 18,
  },
  mealAllergensSection: {
    padding: 20,
    flexDirection: 'row',
  },
  attendanceNote: {
    marginHorizontal: 16,
    padding: 20,
    backgroundColor: '#ffcccc', // Example color for highlighting
    fontSize: 16,
  },
  descriptionSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 20,
  },
  icon: {
    marginRight: 10,
    color: '#3498db',
  },

  meal: {
    fontSize: 16,
  },
  allergens: {
    fontSize: 16,
  },
});

export default EventDetailsScreen;
