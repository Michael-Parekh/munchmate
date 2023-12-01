import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text, TouchableOpacity, Modal } from "react-native";
import DatePickerModal from "./Modals/DatePickerModal";
import TimePickerModal from "./Modals/TimePickerModal";
import OrganizerPickerModal from "./Modals/OrganizerPickerModal";
import DistanceModal from "./Modals/DistanceModal";

const FilterButton = ({buttonTitle, setFilterEnd, setFilterStart, setOrganizer} : {buttonTitle : string, setFilterEnd: any, setFilterStart : any, setOrganizer : any}) => {
  const [selectedButton, setSelectedButton] = useState("");
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const closeDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleButtonPress = (buttonText: any) => {
    setSelectedButton(buttonText);
    setDatePickerVisible(true);
  };

  return (
    <TouchableOpacity style={styles.button} onPress={() => handleButtonPress("Button 1")}>
        <Text style={styles.buttonText}>{ buttonTitle } </Text>
        { buttonTitle === 'Date' ? <DatePickerModal setFilterStart={setFilterStart} setFilterEnd={setFilterEnd} isModalVisible={isDatePickerVisible} onClose={() => closeDatePicker()} /> : null }
        { buttonTitle === 'Time' ? <TimePickerModal setFilterStart={setFilterStart} setFilterEnd={setFilterEnd} isModalVisible={isDatePickerVisible} onClose={() => closeDatePicker()} /> : null }
        { buttonTitle === 'Organizer' ? <OrganizerPickerModal isModalVisible={isDatePickerVisible} onClose={() => closeDatePicker()} setOrganizer={setOrganizer} /> : null }

    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20, // Adjust as needed
      },
      button: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 8,
        flex: 1,
        marginHorizontal: 5,
      },
      buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 11
      },
});

export default FilterButton;