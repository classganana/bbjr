import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { CancelButton, ExitButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { useUser } from '../../context/UserContext';

interface PopupProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  exit: React.Dispatch<React.SetStateAction<string>>;
}

function Popup(props: PopupProps) {
  const buttons = ['Questions are easy', 'Questions are tough', 'I want to attempt later', 'I am not prepared for the test', 'Other'];
  const [review, setReview] = useState('');
  const { user } = useUser();

  const setOption = (text: string) => {
    console.log(text);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>
          <Text style={styles.userName}>{user?.name}</Text>
          🧐, you’re leaving too soon?</Text>
        <Text style={styles.text}>Can you tell us the reason</Text>
        <View style={styles.buttonContainer}>
          {buttons.map((buttonLabel, index) => (
            <Pressable
              key={index}
              onPress={() => setReview(buttonLabel)}
              style={[styles.optButton, buttonLabel === review && styles.selected]}
            >
              <Text style={[styles.buttonLabel, buttonLabel === review && styles.selected]}>{buttonLabel}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.popupBtn}>
          <Button label={'Cancel'} disabled={false} className={CancelButton} onPress={() => props.setModalVisible(false)} />
          <Button label={'Exit'} disabled={false} className={ExitButton} onPress={() => props.exit(review)} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: Colors.gray_01,
    borderRadius: 20,
    padding: 20,
    width: "90%",
    height: "60%",
  },
  headerText: {
    color: Colors.black_03,
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    marginBottom: 10,
  },
  userName: {
    fontFamily: "Inter-Bold",
  },
  text: {
    color: Colors.black_03,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optButton: {
    marginHorizontal: 5,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: Colors.gray_17,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLabel: {
    fontFamily: 'Inter-Regular',
  },
  popupBtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    color: Colors.white,
  },
});

export default Popup;
