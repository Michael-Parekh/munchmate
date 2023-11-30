import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';
import * as Location from 'expo-location';
import { getData } from '../firebaseConfig.js';
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from "../constants";

const MapScreen = () => {
  type FilterKeys = 'glutenFree' | 'vegetarian' | 'requiredAttendance' | 'dairyFree' | 'nutFree';
  type Filters = Record<FilterKeys, boolean>;

  const [filters, setFilters] = useState<Filters>({
    glutenFree: false,
    vegetarian: true,
    requiredAttendance: true,
    dairyFree: false,
    nutFree: false,
  });

  const [homeCoordinates, setHomeCoordinates] = useState({ latitude: 0, longitude: 0 });
  const [locationPermission, setLocationPermission] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [eventCoordinates, setEventCoordinates] = useState<any[]>([]);
  const navigation = useNavigation<StackNavigationProp<StackParamList, 'Map'>>();

  // get the event locations 
  useFocusEffect(() => {
    const getEvents = async () => {
      const data = await getData();

      const filteredData = data.filter(
        item => (item.latitude !== 0 && item.longitude !== 0) && (item.latitude !== undefined && item.longitude !== undefined)
      );
      const eventCoordsWithIds = filteredData.map(item => ({
        id: item.id,
        latitude: item.latitude,
        longitude: item.longitude
      }));

      setEventCoordinates(eventCoordsWithIds);
    };

    getEvents();
  });

  // get the user's current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setHomeCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setIsLoading(false);
    })();
  }, []);

  // redirect to the event details page when event icon is clicked 
  const handleMarkerClick = (eventId: string) => {
    // Navigate to the event detail screen with the event ID
    navigation.navigate('EventDetail', { eventId });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Events Near Me</Text>
      </View>

      {/* Map Container */}
      {!isLoading && locationPermission ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              ...homeCoordinates,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            {/* Home Marker */}
            <Marker coordinate={homeCoordinates}>
              <MaterialIcons name="home" size={30} color="#000" />
            </Marker>

            {/* Event Markers */}
            {eventCoordinates.map((coordinate, index) => (
              <Marker
                key={index}
                coordinate={coordinate}
                onPress={() => handleMarkerClick(coordinate.id)}
              >
                <MaterialIcons name="event" size={30} color="#000" />
              </Marker>
            ))}
          </MapView>
        </View>
      ) : (
        <Text style={styles.loadingText}>
          {isLoading ? 'Loading...' : 'Location permission denied'}
        </Text>
      )}

      {/* Event Filters Container */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Filter By</Text>

        {Object.keys(filters).map((key) => (
          <View key={key} style={styles.checkboxContainer}>
            <Checkbox
              status={filters[key as FilterKeys] ? 'checked' : 'unchecked'}
              disabled={true}
              uncheckedColor="grey"
              color={filters[key as FilterKeys] ? 'blue' : 'grey'}
            />
            <Text style={styles.checkboxLabel}>
              {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  mapContainer: {
    height: 320,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 15,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  filtersContainer: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 20,
  },
  filterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  checkboxLabel: {
    fontSize: 18,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 40,
    width: '100%',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
