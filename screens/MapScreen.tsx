// import React from "react";
// import { StyleSheet, Text, View } from "react-native";

// const MapScreen: React.FC = () => {
//   return (
//     <View style={styles.view}>
//       <Text>Map Screen</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   view: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

// export default MapScreen;


// NEW CODE 

import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import MapView, { Marker }  from 'react-native-maps';
import Slider from '@react-native-community/slider';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Checkbox } from 'react-native-paper';


const App = () => {
  const [radius, setRadius] = useState(1);

  type FilterKeys = 'glutenFree' | 'vegetarian' | 'requiredAttendance' | 'dairyFree' | 'nutFree';
  type Filters = Record<FilterKeys, boolean>;

  const [filters, setFilters] = useState<Filters>({
    glutenFree: false,
    vegetarian: true,
    requiredAttendance: true,
    dairyFree: false,
    nutFree: false,
  });


  

  // Assuming you have latitude and longitude for home
  const homeCoordinates = { latitude: 37.78825, longitude: -122.4324 }; // replace with actual coordinates

  // Random free food events near the home location
  const eventCoordinates = [
    { latitude: 37.78965, longitude: -122.4342 },
    { latitude: 37.78700, longitude: -122.4326 },
    { latitude: 37.78849, longitude: -122.4308 },
    // add more later
  ];


  return (
    <View style={styles.container}>

       {/* Header */}
       <View style={styles.header}>
        <Text style={styles.headerTitle}>Map View</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <MaterialIcons name="settings" size={24} color="black" />
        </TouchableOpacity>
      </View>

    



      {/* Map Container */}
      <View style={styles.mapContainer}>
        <MapView
          style={styles.map}
          initialRegion={{
            ...homeCoordinates,
            latitudeDelta: 0.005, // Smaller delta means more zoomed in
            longitudeDelta: 0.005, // Smaller delta means more zoomed in
          }}
        >
          {/* Home Marker */}
          <Marker coordinate={homeCoordinates}>
            <MaterialIcons name="home" size={30} color="#000" />
          </Marker>

          {/* Event Markers */}
          {eventCoordinates.map((coordinate, index) => (
            <Marker key={index} coordinate={coordinate}>
              
              <MaterialIcons name="event" size={30} color="#000" />
            </Marker>
          ))}

          

          
        </MapView>
      </View>
      
      {/* Radius Slider Container */}
      <View style={styles.radiusSliderContainer}>
        <Text style={styles.radiusLabel}>Radius</Text>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={10}
          value={radius}
          onValueChange={setRadius}
          minimumTrackTintColor="#1fb28a"
          maximumTrackTintColor="#d3d3d3"
          thumbTintColor="#1a9274"
        />
        <Text style={styles.radiusValue}>{`${radius.toFixed(2)} mile${radius > 1 ? 's' : ''}`}</Text>
      </View>


      {/* Event Filters Container */}
      <View style={styles.filtersContainer}>
        <Text style={styles.filterTitle}>Event Filter</Text>

        {Object.keys(filters).map((key) => (
  <View key={key} style={styles.checkboxContainer}>
    <Checkbox
      status={filters[key as FilterKeys] ? 'checked' : 'unchecked'}
      disabled={true}
      uncheckedColor="grey"  // Set the color when the checkbox is unchecked
      color={filters[key as FilterKeys] ? 'blue' : 'grey'}  // Set the color when the checkbox is checked
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
    backgroundColor: '#fff', // colour can be changed later 
  },
  mapContainer: {
    height: 320, // to change height of the map container 
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
    marginTop: 15
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  radiusSliderContainer: {
    width: '100%',
    alignItems: 'stretch',
    marginBottom: 20,
  },
  radiusLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  slider: {
    height: 40,
  },
  radiusValue: {
    textAlign: 'center',
    fontSize: 16,
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
  filter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    marginLeft: 10,
    fontSize: 16,
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
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginTop: 20, // move screen header up/down
    width: '100%',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  }

  
});

export default App;
