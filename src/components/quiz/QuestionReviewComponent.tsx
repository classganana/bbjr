import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../styles/colors';

type QuestionProps = {
  question: string;
  options: string[];
  onSelectOption: (selectedOption: string) => void;
};

const QuestionReviewComponent: React.FC<QuestionProps> = ({
  question,
  options,
  onSelectOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOptionButton,
          ]}
          onPress={() => {
            onSelectOption(option);
            setSelectedOption(option);
          }}
        >
          <View style={[styles.optionMarker, selectedOption === option && styles.optionMarkerSelected]}>
            <Text style={[styles.optionMarkerText,selectedOption === option && styles.selectedOptionMarkerText]}>{String.fromCharCode(65 + index)}</Text>
          </View>
          <Text style={[styles.optionText, selectedOption === option && styles.selectedOptionText]}>
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderStartColor: Colors.white,
    padding: 16,
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginBottom: 16,
  },
  question: {
    backgroundColor: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
    ...Platform.select({
        ios: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
        android: {
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.15,
          shadowRadius: 4,
        },
      }),
  },
  selectedOptionButton: {
    borderWidth: 1/2,
    borderColor: Colors.primary, // Change to the desired border color
    borderBottomColor: Colors.primary, // Change to the desired background color
  },
  optionMarker: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  optionMarkerSelected: {
    backgroundColor: Colors.primary
  },
  optionMarkerText: {
    fontSize: 16,
  },
  selectedOptionMarkerText: {
    fontSize: 16,
    color: Colors.white
  },
  optionText: {
    fontSize: 16,
  },
  selectedOptionText: {
    color: Colors.black_01, // Change to the desired text color
  },
});

export default QuestionReviewComponent;
