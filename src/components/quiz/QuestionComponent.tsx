import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../styles/colors';
import { BasicCheck, Cross } from '../common/SvgComponent/SvgComponent';

type QuestionProps = {
  question: string;
  options: string[];
  correctAnswer?: string;
  selectedAnswer?: string | undefined;
  isResult: boolean,
  onSelectOption: (selectedOption: string) => void;
};

const QuestionComponent: React.FC<QuestionProps> = ({
  question,
  options,
  selectedAnswer,
  correctAnswer,
  isResult,
  onSelectOption,
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  useEffect(() => {
    console.log(correctAnswer, selectedAnswer)
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{question}</Text>
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            selectedOption === option && styles.selectedOptionButton,
            correctAnswer === option && styles.correct,
            (selectedAnswer === option && selectedAnswer !== correctAnswer) && styles.wrong,
          ]}
          onPress={() => {
            if (!isResult) {
              onSelectOption(option);
              setSelectedOption(option);
            }
          }}
        >
          <View style={styles.optionButtonContainer}>
            <View style={[styles.optionMarker, selectedOption === option && styles.optionMarkerSelected,
            correctAnswer === option && styles.correctCircle, (selectedAnswer === option && selectedAnswer !== correctAnswer) && styles.wrongCircle]}>
              <Text style={[styles.optionMarkerText, selectedOption === option && styles.selectedOptionMarkerText,
              correctAnswer === option && { color: Colors.white }, (selectedAnswer === option && selectedAnswer !== correctAnswer) && { color: Colors.white }]}>
                {String.fromCharCode(65 + index)}
              </Text>
            </View>
            <Text style={[styles.optionText, selectedOption === option && styles.selectedOptionText]}>
              {option}
            </Text>
          </View>

          <View>
            {
              (correctAnswer === option) ?
                <View style={[styles.correctCircle, { borderRadius: 32, padding: 2 }]}>
                  <BasicCheck height={'18'} width={'18'} fill={'white'} />
                </View>
                : (selectedAnswer === option && selectedAnswer !== correctAnswer) ?
                  <View style={[styles.wrongCircle, { borderRadius: 32, padding: 0 }]}>
                    <Cross height={'22'} width={'22'} fill={'white'} />
                  </View> : <></>

            }
          </View>
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
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(0, 107, 127, 0.35)',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.10,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  optionButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  selectedOptionButton: {
    borderWidth: 1 / 2,
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
  correctCircle: {
    backgroundColor: "#4BAE4F",
    color: Colors.white
  },
  wrongCircle: {
    color: Colors.white,
    backgroundColor: "#EE0000"
  },
  correct: {
    borderColor: "#29CB00",
    borderWidth: 1,
    backgroundColor: "#E7FFE1"
  },
  wrong: {
    borderColor: "#EE0000",
    borderWidth: 1,
    backgroundColor: "#FFEEEE"
  }
});

export default QuestionComponent;
