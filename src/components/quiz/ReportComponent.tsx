import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../styles/colors';
import { Button } from '../common/ButttonComponent/Button';
import { LoginButton, OutlineButton } from '../common/ButttonComponent/ButtonStyles';
import { Description } from '../feedback/Description/Description';

interface ReportProps {
  report: React.Dispatch<React.SetStateAction<string>>;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  options: string[];
}

function ReportComponent(props: ReportProps) {
  const buttons = ['Wrong Answer', 'Wrong Answer', 'Formatting issue'];
  const [selectedButton, setSelectedButton] = useState('');
  const [bottomSheetVisible, setBottomSheetVisible] = useState(true);

  return (
    <>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}> What seems to be the problem?</Text>
        <Text style={styles.text}>Your feedback will help us to improve your test-taking experience</Text>
        {props.options.map((buttonLabel: string, index: number) => (
          <TouchableOpacity key={index} onPress={() => {
            setSelectedButton(buttonLabel)
          }}>
            <View style={styles.Button}>
              <Text>{buttonLabel}</Text>
              <View style={styles.optionMarker}>
                {selectedButton === buttonLabel && (
                  <View style={styles.markesign}></View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
        <View style={{marginTop: -20}}>
          <Description placeholder={'Write your feedback'} title={''} />
        </View>
        <View
          style={{
            flexDirection: "row",
            gap: 20,
            paddingHorizontal: 10,
            paddingVertical: 20,
            justifyContent: "space-between",
            width: '100%'
            }}>
          <Button label={'Cancel'} disabled={false} className={OutlineButton} onPress={() => props.closeModal(false)}></Button>
          <Button label={'Submit'} disabled={false}
            className={LoginButton} onPress={() => {
              props.report(selectedButton);
            }}></Button>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  heading: {
    color: Colors.black_01,
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16
  },
  text: {
    color: Colors.light_gray_04,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    marginBottom: 20
  },
  Button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 8,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  optionMarker: {
    width: 14,
    height: 14,
    borderRadius: 8,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  markesign: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReportComponent;
