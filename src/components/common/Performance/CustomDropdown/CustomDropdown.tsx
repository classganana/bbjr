import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';
import { Colors } from '../../../../styles/colors';

interface DropdownProps {
  options: string[];
  onSelect: (option: string) => void;
  label: string | number;
  disabled: boolean,
  dropdownTitle: string
}

const Dropdown: React.FC<DropdownProps> = ({ options, onSelect, label, disabled, dropdownTitle = 'Select from given option' }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => disabled && setIsVisible(true)} style={styles.dropdownButton}>
        <Text style={styles.selectedOption}>{label}</Text>
      </TouchableOpacity>
      {disabled && <Modal
        animationType="fade"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}>
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.dropdownTitle}>{dropdownTitle}</Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleSelectOption(item)}>
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdownButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    color: 'black',
    borderRadius: 8
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  dropdownTitle : {
    padding: 16
  },
  selectedOption: {
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    maxHeight: 200,
    width: '100%',
  },
  optionText: {
    padding: 10,
    fontSize: 16,
  },
});

export default Dropdown;
