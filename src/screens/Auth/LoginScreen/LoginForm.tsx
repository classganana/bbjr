import React, { useEffect, useRef, useState } from "react";
import {
  ImageBackground,
  Text,
  TextInput,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle";
import { Button } from "../../../components/common/ButttonComponent/Button";
import { PrimaryDefaultButton } from "../../../components/common/ButttonComponent/ButtonStyles";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "../../../../config";
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebase from "firebase/compat/app"
import OtpVerification from "../OtpVerificationScreen";
import { httpClient } from "../../../services/HttpServices";

export const LoginForm = () => {
  const navigation = useNavigation();
  const [otpScreen, setOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [otp, setOtp] = useState("");
  const recaptchaVerifier = useRef(null);

  // Define a regular expression for a valid phone number pattern.
  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    const data = {
      "service": "ml_service",
      "endpoint": "/data/mcq",
      "requestMethod": "POST",
      "requestBody": {
        "schoolId": "101",
        "boardId": "101",
        "subject": "Science",
        "className": 10,
        "chapterName": "MATTER IN OUR SURROUNDINGS",
        "studentId": 10,
        "size": 10
        }
    }
    
    httpClient.post('auth/c-auth',data).then(() => {

    })
  },[])

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(`+91${phoneNumber}`, recaptchaVerifier.current).then((item) => {
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
    console.log(phoneNumber);
    setPhoneNumber((prevPhoneNumber) => "+91" + prevPhoneNumber);
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
      .then((res: any) => {
        console.log(res.additionalUserInfo.isNewUser);
        if(res.additionalUserInfo.isNewUser) {
          navigation.navigate('SignUp' as never);
        } else {
          navigation.navigate('DashboardNavigator' as never);
        }
        console.log("logged in")
      })
      .catch(() => {
        console.log("failed")
      })
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // Adjust the behavior as needed
    >
      {otpScreen &&      
      <View>
        <Text style={LoginScreenStyle.loginHeading}>Log in</Text>
      </View>
      }
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      {!otpScreen && <ImageBackground style={[LoginScreenStyle.imageBlock]} source={require("../../../../assets/png/loginbg.png")}>
        {/* <View> */}
          <Text style={LoginScreenStyle.loginHeading}>Log in</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1 }}>
            <Image style={{ height: "70%", width: "70%" }} source={require('../../../../assets/gifs/logingif.gif')} />
          {/* </View> */}
        </View>
      </ImageBackground> }
      {otpScreen &&  <View style={{ marginTop: 90, height: 600 }}>
          <OtpVerification phoneNumber={""} otpGiven={(otp: string) => otpGiven(otp)}
            sendOtp={() => sendVerification()} />
        </View>}
      {!otpScreen && (
        <View style={{ padding: 20 }}>
          <FirebaseRecaptchaVerifierModal
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Text style={styles.inputLabel}>Phone Number:</Text>
          <Text style={styles.inputDescription}>
            Please confirm your country code and enter your mobile number.
          </Text>
          <View style={styles.phoneContainer}>
            <TextInput
              style={styles.phoneCode}
              placeholder="+91"
              editable={false}
              value="+91"
              keyboardType="numeric"
              onChangeText={(text) => {
                setPhoneNumber(text);
                validatePhoneNumber(text);
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter phone number"
              keyboardType="numeric"
              onChangeText={(text) => {
                setPhoneNumber(text);
                validatePhoneNumber(text);
              }}
            />
          </View>
          {phoneNumberError !== "" && (
            <Text style={styles.errorText}>{phoneNumberError}</Text>
          )}
          <Button
            className={PrimaryDefaultButton}
            label={"Login"}
            disabled={phoneNumberError !== ""}
            onPress={moveToOtpScreen}
          />
          <View>
            <Text style={{ textAlign: 'center' }}>
              By Continuing you agree to the Terms of services and Privacy policy
            </Text>
          </View>
        </View>
      )}
      {/* </ScrollView> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 5,
  },
  inputDescription: {
    color: "#696969",
    marginBottom: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 6,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  phoneCode: {
    flex: 1,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginRight: 10,
  },
  errorText: {
    color: "red",
  },
});
