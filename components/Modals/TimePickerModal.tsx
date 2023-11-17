import React, { useState } from "react";
import { View, Modal, TextInput, Button, StyleSheet, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const TimePickerModal = ({ isModalVisible, onClose } : { isModalVisible : any, onClose : any }) => {
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const handleStartTimeChange = (event : any, selectedTime : any) => {
    setShowStartTimePicker(Platform.OS === "ios");
    setStartTime(selectedTime || startTime);
  };

  const handleEndTimeChange = (event : any, selectedTime : any) => {
    setShowEndTimePicker(Platform.OS === "ios");
    setEndTime(selectedTime || endTime);
  };

  const showStartTimePickerModal = () => {
    setShowStartTimePicker(true);
  };

  const showEndTimePickerModal = () => {
    setShowEndTimePicker(true);
  };

  const hideStartTimePickerModal = () => {
    setShowStartTimePicker(false);
  };

  const hideEndTimePickerModal = () => {
    setShowEndTimePicker(false);
  };

  const onPressOk = () => {
    console.log("Selected Start Time:", startTime.toLocaleTimeString());
    console.log("Selected End Time:", endTime.toLocaleTimeString());
    onClose();
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
            placeholder="Start Time"
            value={startTime.toLocaleTimeString()} // Display the selected start time
            onFocus={showStartTimePickerModal}
          />
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}

          <TextInput
            style={styles.input}
            placeholder="End Time"
            value={endTime.toLocaleTimeString()} // Display the selected end time
            onFocus={showEndTimePickerModal}
          />
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingLeft: 10,
    width: 200,
  },
});

export default TimePickerModal;
