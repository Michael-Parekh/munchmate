import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { StackParamList } from "../constants";

const EventDetailsScreen: React.FC = () => {
  const route = useRoute<RouteProp<StackParamList, 'EventDetail'>>();
  const { eventTitle, eventDate } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.view}>
        <Text style={styles.title}>{eventTitle}</Text>
        <Text style={styles.date}>{eventDate}</Text>
        {/* Display more details passed as parameters */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  view: {

  },
  title: {

  },
  date: {

  },
});

export default EventDetailsScreen;
