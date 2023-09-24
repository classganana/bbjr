import React, { useRef, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle";
import { Button } from "../../../components/common/ButttonComponent/Button";
import { PrimaryDefaultButton } from "../../../components/common/ButttonComponent/ButtonStyles";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../../../../config";
import {FirebaseRecaptchaVerifierModal} from 'expo-firebase-recaptcha';
import firebase from "firebase/compat/app"
import OtpVerification from "../OtpVerificationScreen";

export const LoginForm = () => {
  const navigation = useNavigation();

  const [otpScreen, setOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [verificationId, setVerificationId] =React.useState("");
  const [otp, setOtp] = useState("");
  const recaptchaVerifier = useRef(null);

  // Define a regular expression for a valid phone number pattern.
  const phoneRegex = /^\+91\d{10}$/;

  const sendVerification = ()  => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(phoneNumber, recaptchaVerifier.current).then((item) => {
      setOtpScreen(true)
        setVerificationId(item)
    }
    )
    .catch(() => {
        setOtpScreen(false);
    })
  }

  const validatePhoneNumber = (inputPhoneNumber: string) => {
    if (!phoneRegex.test(inputPhoneNumber)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneNumberError("");
    }
  };

  function moveToOtpScreen() {
    sendVerification();
  }

  const otpGiven = (otp: string) => {
      setOtp(otp);
      confirmCode();
  }

  const confirmCode = () => {
    const credential = firebase.auth.PhoneAuthProvider.credential(
      verificationId,
      otp
    )
      firebase.auth().signInWithCredential(credential)
      .then(() => {
        console.log("logged in")
      })
      .catch(() => {
        console.log("failed")
      })
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={LoginScreenStyle.loginHeading}>Log in</Text>
      </View>
      <View style={{marginTop: 90}}>
          {otpScreen && <OtpVerification phoneNumber={""} otpGiven={(otp: string) => otpGiven(otp)} 
          sendOtp={() => sendVerification()} />}
      </View>
      {!otpScreen && <>
        <View>
        {!otpScreen &&  <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier}
      firebaseConfig={firebaseConfig}/>}
        <View style={LoginScreenStyle.imageBlock}></View>
        <View style={LoginScreenStyle.inputContainer}>
          <TextInput
            style={LoginScreenStyle.input}
            placeholder="Enter phone number"
            keyboardType="numeric"
            onChangeText={(text) => {
              setPhoneNumber(text);
              validatePhoneNumber(text);
            }}
          />
        </View>
          {phoneNumberError !== "" && (
            <Text style={{ color: "red" }}>{phoneNumberError}</Text>
          )}
      </View>
      <View style={{ position: "absolute", bottom: 50, width: "100%" }}>
        <Button
          className={PrimaryDefaultButton}
          label={"Login"}
          disabled={phoneNumberError !== ""}
          onPress={moveToOtpScreen}
        />
        <View>
            <Text style={{textAlign: 'center'}}>
                By Continuing you agree to the Terms of services and Privacy policy
            </Text>
        </View>
      </View>
      </>}
    </View>
  );
};
