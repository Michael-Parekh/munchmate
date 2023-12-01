import React, { useState } from "react";
import { View, Modal, TextInput, Button, StyleSheet } from "react-native";

const OrganizerNameModal = ({ isModalVisible, onClose, setOrganizer } : { isModalVisible : any, onClose : any, setOrganizer : any }) => {
  const [organizerName, setOrganizerName] = useState("");

  const handleOrganizerNameChange = (text : string) => {
    setOrganizerName(text);
    setOrganizer(text);
  };

  const onPressOk = () => {
    console.log("Selected Organizer Name:", organizerName);
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
            placeholder="Organizer Name"
            placeholderTextColor="#2196F3" 
            value={organizerName}
            onChangeText={handleOrganizerNameChange}
          />

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
    textDecorationColor: 'blue'
  },
});

export default OrganizerNameModal;
