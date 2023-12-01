import React, { useState, useEffect, useContext} from "react";
import { View, Modal, TextInput, Button, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const DatePicker = ({ isModalVisible, onClose, setFilterStart, setFilterEnd} : { isModalVisible : boolean, onClose : any, setFilterStart : any, setFilterEnd : any}) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const val = 5;

  const handleStartDateChange = (event : any, selectedDate : any) => {
    setShowStartDatePicker(Platform.OS === "ios");
    setStartDate(selectedDate);
    setFilterStart(selectedDate);
  };

  const handleEndDateChange = (event : any, selectedDate : any) => {
    setShowEndDatePicker(Platform.OS === "ios");
    setEndDate(selectedDate);
    setFilterEnd(selectedDate);
  };

  const showStartDatePickerModal = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatePickerModal = () => {
    setShowEndDatePicker(true);
  };

  const hideStartDatePickerModal = () => {
    setShowStartDatePicker(false);
  };

  const hideEndDatePickerModal = () => {
    setShowEndDatePicker(false);
  };

  const onPressOk = () => {
    console.log("Selected Start Time:", startDate.toDateString());
    console.log("Selected End Time:", endDate.toDateString());
    setFilterStart(startDate);
    setFilterEnd(endDate);
    onClose(startDate, endDate);
  };

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={isModalVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TextInput
            style={styles.input}
            placeholder="Start Date"
            value={startDate.toDateString()} // Display the selected start date
            onFocus={showStartDatePickerModal}
          />
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="default"
              onChange={handleStartDateChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="End Date"
            value={endDate.toDateString()} // Display the selected end date
            onFocus={showEndDatePickerModal}
          />
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="default"
              onChange={handleEndDateChange}
            />
          )}

          <Button title="OK" onPress={onPressOk} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: 200,
  },
});

export default DatePicker;
