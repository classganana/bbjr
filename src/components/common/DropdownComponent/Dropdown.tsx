import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Props {
  options: string[];
  onSelect: (option: string) => void;
  selectedOption?: string | null;
  disabled?: boolean;
}

const Dropdown: React.FC<Props> = ({ options, onSelect, selectedOption = null, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<View>(null);

  useEffect(() => {
    const handleOutsideClick = () => {
      setIsOpen(false);
    };

    if (isOpen) {
      // Listen for touches outside the dropdown when it's open
      const dismissListener = () => handleOutsideClick();
      const subscription = Keyboard.addListener('keyboardDidShow', dismissListener);

      // Clean up the listener when the dropdown is closed or unmounted
      return () => {
        subscription.remove();
      };
    }
  }, [isOpen]);

  const handleSelectOption = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => !disabled && setIsOpen(!isOpen)} style={[styles.dropdown, disabled && styles.disabled]}>
        <Text>{selectedOption || 'Select an option'}</Text>
      </TouchableOpacity>
      {isOpen && (
        <TouchableWithoutFeedback onPress={() => setIsOpen(false)}>
          <View style={styles.optionsContainer}>
            {options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectOption(option)}
                style={styles.option}
              >
                <Text>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableWithoutFeedback>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
  },
  disabled: {
    backgroundColor: '#f0f0f0',
  },
  optionsContainer: {
    position: 'absolute',
    top: '100%',
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'red',
    zIndex: 100,
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
});

export default Dropdown;
