import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Pill = ({ icon, text, color }: { icon: string, text: string, color: string }) => {
  const dynamicStyles = {
    pill: {
      backgroundColor: color
    },
  };

  return (
    <View style={[styles.pill, dynamicStyles.pill]}>
      <MaterialIcons name={icon} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    borderRadius: 15, // Border radius to create rounded corners
    paddingVertical: 7, // Vertical padding
    paddingHorizontal: 11, // Horizontal padding
    margin: 5, // Margin around the pill
    alignSelf: 'flex-start'
  },
  icon: {
    width: 15, // Width of the icon
    height: 15, // Height of the icon
    marginRight: 15, // Margin between the icon and text
  },
  text: {
    fontSize: 10, // Font size of the text
    color: '#333', // Text color
    marginLeft: 5,
    fontWeight: 'bold'
  },
});

export default Pill;
