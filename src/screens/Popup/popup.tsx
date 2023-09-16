import React, { useState } from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import {LoginButton, OutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';


function Popup() {
  const buttons = ['Questions are easy', 'Questions are tough', 'I want to attempt later', 'I am not prepared for the test']

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>Name, you’re leaving too soon ?</Text>
        <Text>Can you tell us the reason</Text>
        {buttons.map((buttonLabel, index) => (
          <View style={styles.OptButton}>
            <Text>{buttonLabel}</Text>
          </View>
        ))}
        <View style={{display:'flex',flexDirection:'row', justifyContent:'space-between', width:'100%',flex:1}}>
          
        <Button label={'Cancel'} disabled={false} className={OutlineButton} onPress={function (): void {
          throw new Error('Function not implemented.');
        } } ></Button>
        <Button label={'Exit'} disabled={false} className={LoginButton} onPress={function (): void {
          throw new Error('Function not implemented.');
        } } ></Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    flex: 1,
    // display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    // width:'100%',
    gap: 10,
    backgroundColor: Colors.white,
    borderRadius: 20,
    padding: 20,
    // alignItems: 'center',

  },
  headerText: {
    color: Colors.black_03,
    fontFamily: 'Inter',
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '300',
  },
  OptButton: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: Colors.gray_17,
    borderRadius: 25,
  },
});

export default Popup;
