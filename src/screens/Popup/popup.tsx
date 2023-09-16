import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import {CancelButton, ExitButton} from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';


function Popup() {
  const buttons = ['Questions are easy', 'Questions are tough', 'I want to attempt later', 'I am not prepared for the test','Other']

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>Name, you’re leaving too soon ?</Text>
        <Text style={styles.text}>Can you tell us the reason</Text>
        {buttons.map((buttonLabel, index) => (
          <View style={styles.OptButton}>
            <Text style={styles.text}>{buttonLabel}</Text>
          </View>
        ))}
        <View style={styles.popupbtn}>
        <Button label={'Cancel'} disabled={false} className={CancelButton} onPress={function (): void {} } ></Button>
        <Button label={'Exit'} disabled={false} className={ExitButton} onPress={function (): void {} } ></Button>
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
    marginTop:'10%',
    alignItems: 'center',
  },
  modalView: {
    gap: 8,
    backgroundColor: Colors.white,
    borderRadius: 20,
    width:'80%',
    
  },
  headerText: {
    color: Colors.black_03,
    fontFamily: 'Inter-Regular',
    fontSize:18,
    fontStyle: 'normal',
    fontWeight: '500',
  },
  OptButton: {
    
    alignSelf:'flex-start',
    borderWidth: 1,
    padding: 15,
    borderColor: Colors.gray_17,
    borderRadius: 25,
  },
  text: {
      color: Colors.black_03,
      fontFamily: 'Inter-Regular',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: '600',
    },
  popupbtn:{
    display:'flex',
    flexDirection:'row',
    justifyContent:'space-between',
    width:'100%',
    flex:1,
  }
});

export default Popup;
