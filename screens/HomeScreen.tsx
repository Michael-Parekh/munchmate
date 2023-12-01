import React, { useEffect, useState, createContext, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  Button,
  ScrollView,
  TextInput,
} from "react-native";
import EventCard from "../components/EventCard";
import FilterButton from "../components/ButtonTextWithModal";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { StackParamList } from "../constants";
import { getData } from "../firebaseConfig";
import {
  FilterContext,
  FilterContextProvider,
} from "../contexts/FilterContext";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const [events, setEvents] = useState<any[]>([]);

  const incrementStartTime = (startTime: Date) => {
    let endDate = new Date(startTime);
    endDate.setHours(startTime.getHours() + 4);
    return endDate;
  };

  const [filterStart, setFilterStart] = useState(new Date());
  const [filterEnd, setFilterEnd] = useState(new Date());
  const [organizerFilter, setOrganizerFilter] = useState('');

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigation =
    useNavigation<StackNavigationProp<StackParamList, "Home">>();

  useEffect(() => {
    // write your code here, it's like componentWillMount
    const getEvents = async () => {
      const data = await getData();
      setEvents(data);
      console.log(data);
    };

    getEvents();
  }, []);

  const validateDate = (str: string) => {
    const timeRegex: RegExp = /^([1-9]|1[0-2]):[0-5][0-9]([APMapm]{2})$/;

    return timeRegex.test(str);
  };

  const formateAndCreateDate = (date: string) => {
    if (!date) {
      return new Date();
    }
    const matched = date.match(/^(\d{1,2}):(\d{2})([APMapm]{2})$/);

    if (matched == undefined) {
      return new Date(); // Invalid format
    }

    let [, hoursStr, minutesStr, period] = matched;
    let hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);

    if (period.toLowerCase() === "pm" && hours < 12) {
      hours += 12;
    } else if (period.toLowerCase() === "am" && hours === 12) {
      hours = 0;
    }

    const dateObject = new Date();
    dateObject.setHours(hours, minutes, 0, 0);

    return dateObject;
  };

  const checkStartAndEndTime = (start : any, end : any) => {
    const time1 = start.getHours() * 60 + start.getMinutes();
    const time2 = end.getHours() * 60 + end.getMinutes();
    const filter_start = filterStart.getHours() * 60 + filterStart.getMinutes();
    const filter_end = filterEnd.getHours() * 60 + filterEnd.getMinutes();
    
    console.log(filterStart.toLocaleTimeString() + ' ' + start.toLocaleTimeString());
    return time1 >= filter_start && time1 <= filter_end && time2 >= filter_start && time2 <= filter_end;
  }

  const filterEvents = () => {
    const newEvents = events.filter((event) => {
      if (!event.title.includes(searchInput)) {
        return false;
      }

      let include = true;

      if (!event.organizer.includes(organizerFilter)) {
        return false;
      }

      const start = formateAndCreateDate(event.start_time);
      const end = formateAndCreateDate(event.end_time);
      
      if (!
        checkStartAndEndTime(start, end)) {
        return false;
      }
      
      console.log(filterStart <= start)

      if (!(filterStart <= start)) {
        return false;
      }

      return include;
    });

    return newEvents;
  };

  const handleSearchChange = (text : string) => {
    // Save the value whenever someone types
    setSearchInput(text);
  };

  useEffect(() => {
    console.log(filterEnd);
  }, [filterEnd])

  return (
    <FilterContextProvider>
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Explore Events</Text>
          </View>

          <TextInput style={styles.search} placeholder="Search by title" onChangeText={handleSearchChange} value={searchInput}/>

          <View style={styles.filterContent}>
            <View style={styles.buttonContainer}>
              <FilterButton buttonTitle="Date" setFilterEnd={setFilterEnd} setFilterStart={setFilterStart} setOrganizer={setOrganizerFilter}/>
              <FilterButton buttonTitle="Time" setFilterEnd={setFilterEnd} setFilterStart={setFilterStart} setOrganizer={setOrganizerFilter} />
              <FilterButton buttonTitle="Organizer" setFilterEnd={setFilterEnd} setFilterStart={setFilterStart} setOrganizer={setOrganizerFilter} />
            </View>

            {filterEvents().map((item, index) => (
              <EventCard
                key={index}
                event={item}
                onPress={() =>
                  navigation.navigate("EventDetail", { eventId: item.id })
                }
              />
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </FilterContextProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    marginHorizontal: 16,
    alignContent: "flex-start",
    padding: 0,
    margin: 0,
  },
  filterContent: {
    alignContent: "flex-start",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20, // Adjust as needed
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 11,
  },
  card: {
    width: "100%",
    marginTop: 20, // Adjust as needed
    padding: 20,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2, // Android shadow
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  details: {
    fontSize: 16,
    color: "#666",
    marginTop: 8,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    marginTop: 20, // move screen header up/down
    width: "100%",
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: "bold",
  },
  search: {
    height: 40,
    borderColor: "#3498db",
    borderWidth: 2,
    borderRadius: 7,
    marginHorizontal: 6,
    paddingHorizontal: 10,
    marginTop: 10,
  },
});

export default HomeScreen;
