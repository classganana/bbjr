import React, { useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { Aiinput } from '../../components/StudentAiAssistant/aiinput/AiInputComponent';

const OtpVerification = () => {
  const input1Ref = useRef<TextInput>(null);
  const input2Ref = useRef<TextInput>(null);
  const input3Ref = useRef<TextInput>(null);
  const input4Ref = useRef<TextInput>(null);

  const handleTextChange = (text: string, inputRef: React.RefObject<TextInput>) => {
    const numericText = text.replace(/[^0-9]/g, ''); // Filter out non-numeric characters

    // Update the value of the input using state
    if (inputRef.current) {
      const currentInputRef = inputRef.current;
      currentInputRef.value = numericText; // Set the value using the 'value' prop

      if (numericText.length === 0) {
        focusPreviousInput(inputRef);
      } else if (numericText.length >= 1) {
        currentInputRef.blur();
        focusNextInput(inputRef);
      }
    }
  };
  
  const focusNextInput = (currentInputRef: React.RefObject<TextInput>) => {
    if (currentInputRef.current === input1Ref.current) {
      input2Ref.current?.focus();
    } else if (currentInputRef.current === input2Ref.current) {
      input3Ref.current?.focus();
    } else if (currentInputRef.current === input3Ref.current) {
      input4Ref.current?.focus();
    }
  };

  const focusPreviousInput = (currentInputRef: React.RefObject<TextInput>) => {
    if (currentInputRef.current === input2Ref.current) {
      input1Ref.current?.focus();
    } else if (currentInputRef.current === input3Ref.current) {
      input2Ref.current?.focus();
    } else if (currentInputRef.current === input4Ref.current) {
      input3Ref.current?.focus();
    }
  };

  const navigation = useNavigation();

  const moveToResetPassword = () => {
    navigation.navigate("DashboardNavigator" as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>OTP Verification</Text>
      <Text style={styles.title}>Enter the verification code we just sent to your email address.</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.inputView]}
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, input1Ref)}
          ref={input1Ref}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputView}
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, input2Ref)}
          ref={input2Ref}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputView}
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, input3Ref)}
          ref={input3Ref}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.inputView}
          maxLength={1}
          onChangeText={(text) => handleTextChange(text, input4Ref)}
          ref={input4Ref}
          keyboardType="numeric"
        />
      </View>
        </KeyboardAvoidingView>
        
      <TouchableOpacity style={styles.button}>
        <Button
                  onPress={moveToResetPassword}
                  label="Submit"
                  className={LoginButton} disabled={false} />
      </TouchableOpacity>
      <Aiinput/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    display: "flex",
    flex: 1,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    width: "90%"
  },
  inputView: {
    width: 70,
    height: 60,
    borderWidth: 0.5,
    borderRadius: 10,
    margin: 5,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 20
  },
  inputViewBg: {
    backgroundColor: 'red'
  },
  button: {
    marginTop: 20,
    width: "90%"
  },
  text: {
    width: "90%",
    fontSize: 25,
    fontFamily: "Inter-ExtraBold",
    marginBottom: 20
  },
  title: {
    color: Colors.gray_02,
    display: "flex",
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 32,
    width: "90%",
    flexDirection: "column",
    flexShrink: 0,
  }
});

export default OtpVerification;