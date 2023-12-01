import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  HomeScreen,
  MapScreen,
  PostScreen,
  EventDetailsScreen,
  PostConfirmationScreen
} from "../screens";
import { ScreenNames } from "../constants";
import { createStackNavigator } from '@react-navigation/stack';

// Stack navigator from the Home tab
const HomeStack = createStackNavigator();

const HomeStackScreen = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name='EventDetail'
        component={EventDetailsScreen}
        options={{ title: "" }}
      />
    </HomeStack.Navigator>
  )
}

// Stack navigator from the Map tab
const MapStack = createStackNavigator();

const MapStackScreen = () => {
  return (
    <MapStack.Navigator>
      <MapStack.Screen
        name='Map'
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <MapStack.Screen
        name='EventDetail'
        component={EventDetailsScreen}
        options={{ title: "" }}
      />
    </MapStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

const Navigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={ScreenNames.HOME}
        component={HomeStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.MAP}
        component={MapStackScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Map',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.POST}
        component={PostScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Post',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={ScreenNames.POST_CONFIRMATION}
        component={PostConfirmationScreen}
        options={{
          tabBarButton: () => null,
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;
