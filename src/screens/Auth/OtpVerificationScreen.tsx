import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ResendOtpButton, PrimaryDefaultButton, SubmitButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';

type Props = {
  phoneNumber: string,
  otpGiven: (otp: string) => void,
  sendOtp: () => void
}

const OtpVerification = (props: Props) => {
  const inputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
  const [timer, setTimer] = useState(10);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isResendOTPEnabled, setIsResendOTPEnabled] = useState(true);

  const [otp, setOtp] = useState<string>();

  const handleTextChange = useCallback((text: string, index: number) => {
    const numericText = text.replace(/[^0-9]/g, '');

    if (inputRefs[index].current) {
      inputRefs[index].current.value = numericText;

      if (numericText && numericText.length === 0) {
        focusPreviousInput(index);
      } else if (numericText && numericText.length >= 1) {
        focusNextInput(index);
      }
    }
  }, [inputRefs]);

  useEffect(() => {
    const isFilled = inputRefs.every((ref) => ref.current?.value && ref.current?.value?.length === 1);

    if (isFilled) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [inputRefs]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000); // Update the timer every second

    if (timer == 0) {
      timerEnds()
    };
    return () => {
      clearInterval(interval); // Clear the interval on component unmount
    };
  }, [timer])

  const focusNextInput = (currentIndex: number) => {
    if (inputRefs && currentIndex < inputRefs.length - 1) {
      inputRefs[currentIndex + 1].current?.focus();
    }
    moveToResetPassword();
  };


  const focusPreviousInput = (currentIndex: number) => {
    if (currentIndex > 0) {
      inputRefs[currentIndex - 1].current?.focus();
    }
    moveToResetPassword();
  };

  const moveToResetPassword = () => {
    const otp = inputRefs.map((ref) => ref.current?.value || '').join('');
    setOtp(otp);
    if (otp && otp.length === 6) {
      props.otpGiven(otp);
    }
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  const timerEnds = () => {
    setIsResendOTPEnabled(false)
  }


  return (
    <View style={styles.container}>
      <Text style={styles.text}>OTP Verification</Text>
      <Text style={styles.title}>Enter the verification code we just sent to your phone number.</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={styles.inputContainer}>
          {inputRefs.map((ref, index) => (
            <TextInput
              key={index}
              style={styles.inputView}
              maxLength={1}
              onChangeText={(text) => handleTextChange(text, index)}
              ref={ref}
              keyboardType="numeric"
            />
          ))}
        </View>
      </KeyboardAvoidingView>
      <TouchableOpacity style={styles.button}>
        {isResendOTPEnabled && <Text>Resend otp in {formatTime(timer)}</Text>}
        {!isResendOTPEnabled && <Button
          onPress={() => props.sendOtp()}
          label="Resend OTP"
          className={ResendOtpButton}
          disabled={isResendOTPEnabled}
        />}
        <Button
          onPress={moveToResetPassword}
          label="Verify"
          className={SubmitButton}
          disabled={isButtonDisabled}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    display: "flex",
    flex: 1,
    alignItems: 'center',
    width: "100%",
    height: 600
  },
  inputContainer: {
    flexDirection: 'row',
    width: "90%"
  },
  inputView: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "rgba(0, 107, 127, 0.10)",
    margin: 5,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  inputViewBg: {
    backgroundColor: 'red'
  },
  button: {
    marginTop: 10,
    width: "90%",
    gap: 10
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
