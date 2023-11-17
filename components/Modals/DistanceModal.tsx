import React, { useState } from "react";
import { View, Modal, Text, Button, StyleSheet } from "react-native";
import Slider from "react-native-a11y-slider";

const DistanceModal = ({ isModalVisible, onClose } : { isModalVisible : any, onClose : any }) => {
  const [distance, setDistance] = useState(5); // Initial distance value (in miles)

  const handleDistanceChange = (values : number[]) => {
    const selectedDistance = values[0];
    setDistance(selectedDistance);
    console.log(values[0]);
  };

  const onPressOk = () => {
    console.log("Selected Distance:", distance, "miles");
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
          <Text style={styles.label}>Select Distance: {distance} miles</Text>
          <Slider 
            min={0.1} 
            max={10} 
            values={[distance]} 
            onSlidingComplete={() => handleDistanceChange([distance])}
            style={ styles.slider} 
            increment={0.2}
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
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  slider: {
    width: 150,
    marginBottom: 20,
  },
});

export default DistanceModal;
