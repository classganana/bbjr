import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import {CancelButton, ExitButton, OutlineButton} from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';

interface PopupProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  exit: React.Dispatch<React.SetStateAction<string>>;
}
function Popup(props: PopupProps) {
  const buttons = ['Questions are easy', 'Questions are tough', 'I want to attempt later', 'I am not prepared for the test','Other']
  const [review, setReview] = useState('');

  const setOption = (text: string) => {
    console.log(text);
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>Name, you’re leaving too soon ?</Text>
        <Text style={styles.text}>Can you tell us the reason</Text>
        {buttons.map((buttonLabel, index) => (
          <View key={index} 
          style={[styles.OptButton, buttonLabel == review && styles.selected]}>
            <TouchableOpacity onPress={() => setReview(buttonLabel)}>
                <Text style={buttonLabel == review && styles.selected}>
                    {buttonLabel}
                </Text >
            </TouchableOpacity>
          </View>
        ))}
        <View style={styles.popupbtn}>
        <Button label={'Cancel'} disabled={false} className={CancelButton} onPress={() => props.setModalVisible(false)}></Button>
        <Button label={'Exit'} disabled={false} className={ExitButton} onPress={() => props.exit(review)} ></Button>
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
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20, 
  },
  headerText: {
    color: Colors.black_03,
    fontFamily: 'Inter-Regular',
    fontSize:18,
    fontStyle: 'normal',
    fontWeight: '600',
  },
  OptButton: {
    marginLeft:10,
    alignSelf:'flex-start',
    borderWidth: 1,
    padding: 8,
    borderColor: Colors.gray_17,
    borderRadius: 20,
  },
  text: {
      color: Colors.black_03,
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '500',
    },
  popupbtn:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'center',
    width:'100%',
    flex:1,
  },
  selected: {
    backgroundColor: Colors.primary,
    color: Colors.white,
  }

});

export default Popup;
