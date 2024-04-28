import React, { useEffect, useRef, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ResendOtpButton, PrimaryDefaultButton, SubmitButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "firebase/compat/app"
import { firebaseConfig } from '../../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  phoneNumber: string,
  otpGiven: (otp: string) => void,
  sendOtp: () => void
}

const OtpVerification = (props: Props) => {
  const inputRefs = Array.from({ length: 6 }, () => useRef<TextInput>(null));
  const [timer, setTimer] = useState(30);
  const [isButtonDisabled, setButtonDisabled] = useState(true);
  const [isResendOTPEnabled, setIsResendOTPEnabled] = useState(true);
  const recaptchaVerifier = useRef(null);

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

  const resentOtp = async () => {
    const phoneNumber = await AsyncStorage.getItem('phone');
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(`+91${phoneNumber}`, recaptchaVerifier.current).then((item) => {
      // if (Platform.OS === "android") ToastAndroid.showWithGravity('Sending OTP', 3000, ToastAndroid.BOTTOM);
    }
    )
      .catch((e) => {
        console.log(e);
      })

  }


  return (
    <View style={styles.container}>
      <FirebaseRecaptchaVerifierModal
                  style={{flex: 1, alignSelf: 'center', 
                  justifyContent: 'center', 
                  alignItems: 'center', height: 100, width: 100, borderRadius: 10, borderWidth: 1, borderColor: 'gray', backgroundColor: 'white' }}
                  title="Phone Verification"
                  cancelLabel="Close"
                  ref={recaptchaVerifier}
                  firebaseConfig={firebaseConfig}
                />
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
        <Button
          onPress={moveToResetPassword}
          label="Verify"
          className={SubmitButton}
          disabled={isButtonDisabled}
          />

        <View style={styles.otpContainer}>
          {isResendOTPEnabled && <Text>Resend OTP in {formatTime(timer)}</Text>}
          <Button
            onPress={() => resentOtp()}
            label="Resend OTP"
            className={ResendOtpButton}
            disabled={isResendOTPEnabled}
          />
        </View>
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
    height: 56,
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#E9EDFB",
    margin: 5,
    textAlign: 'center',
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: Colors.primary,
    ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
  },
  inputViewBg: {
    backgroundColor: 'red'
  },
  button: {
    marginTop: '10%',
    width: "98%",
    gap: 10
  },
  otpContainer: {
    marginTop: '20%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
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
