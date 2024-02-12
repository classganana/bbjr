import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Subject } from '../../screens/Profile/QuizHistory';
import { HistoryExamPrepQuizCard } from '../quiz/HistoryExamPrepQuizCard';
import { DownArrow } from '../common/SvgComponent';
import { Colors } from '../../styles/colors';

type Props = {
  subject: Subject | undefined;
};

export const QuizDropDown = (props: Props) => {
  const [toggleMenu, setToggleMenu] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setToggleMenu(!toggleMenu)}
        style={styles.dropdownTitle}
      >
        <Text style={styles.title}>{props.subject?.subject}</Text>
        <DownArrow height={'20'} width={'20'} fill={'black'} />
      </TouchableOpacity>
      {toggleMenu && (
        <View style={styles.list}>
          {props.subject?.chapters.map((item) => (
            <HistoryExamPrepQuizCard
              key={item.quizzId}
              id={0}
              title={item.name}
              infoText={''}
              imageUrl={''}
              noOfQuestions={0}
              done={false}
              score={item.score}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    backgroundColor: Colors.secondary,
  },
  dropdownTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
  list: {
    backgroundColor: 'white', // Changed this to white for visibility
    position: 'relative', // Changed from absolute to relative
  },
});

