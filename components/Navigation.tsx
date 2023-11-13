import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  Home,
  Map,
  Post,
  EventDetails
} from "../screens";
import { ScreenNames } from "../constants";

const Navigation: React.FC = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name={ScreenNames.HOME} 
        component={Home} 
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="home" size={30} />
          ),
        }}
      />
      <Tab.Screen 
        name={ScreenNames.MAP} 
        component={Map} 
        options={{
          tabBarLabel: 'Map',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="map" size={30} />
          ),
        }}
      />
      <Tab.Screen 
        name={ScreenNames.POST} 
        component={Post} 
        options={{
          tabBarLabel: 'Post',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="plus" size={30} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
