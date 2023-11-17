import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Button, Alert, SafeAreaView, Pressable } from 'react-native';

const EventDetailsButtons = () => {

  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.fixToText}>
        <Pressable style={styles.button}>
            <Text style={styles.text}>Date</Text>
        </Pressable>
        <Pressable style={styles.button}>
            <Text style={styles.text}>Organizer</Text>
        </Pressable>
        <Pressable style={styles.button}>
            <Text style={styles.text}>Time</Text>
        </Pressable>
        <Pressable style={styles.button}>
            <Text style={styles.text}>Location</Text>
        </Pressable>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 16,
        margin: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#2196F3',
      },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
      },
  });


export default EventDetailsButtons;
