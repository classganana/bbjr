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
  ScrollView,
  TouchableOpacity,
  // ToastAndroid,
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
import { useUser } from "../../../context/UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastService } from "../../../services/ToastService";
import { NewBackButton } from "../../../components/common/SvgComponent/SvgComponent";


export const LoginForm = () => {
  const navigation = useNavigation();
  const [otpScreen, setOtpScreen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [verificationId, setVerificationId] = React.useState("");
  const [otp, setOtp] = useState("");
  const recaptchaVerifier = useRef(null);
  const { setUser } = useUser();

  const phoneRegex = /^\d{10}$/;

  useEffect(() => {
    // checkIfUserHasCompletedRegistraction("YQQiwfq2RdWqvJf6TxwwBXvl7VL2");
    // checkIfUserHasCompletedRegistraction("johndoe123")
  },[])

  const sendVerification = () => {
    const phoneProvider = new firebase.auth.PhoneAuthProvider();
    phoneProvider.verifyPhoneNumber(`+91${phoneNumber}`, recaptchaVerifier.current).then((item) => {
      // if (Platform.OS === "android") ToastAndroid.showWithGravity('Sending OTP', 3000, ToastAndroid.BOTTOM);
      ToastService('Sending OTP');
      console.log("Sending OTP");
      setOtpScreen(true)
      setVerificationId(item)
    }
    )
      .catch((e) => {
        console.log(e);
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

  async function moveToOtpScreen() {
    await AsyncStorage.setItem('phone', phoneNumber);
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
        if(res.additionalUserInfo.isNewUser) {
          const obj = {
            uid: res.user.uid,
            phone: phoneNumber
          }
          navigation.navigate('SignUp' as never, obj as never);
        } else {
          checkIfUserHasCompletedRegistraction(res.user.uid)
        }
      })
      .catch(() => {
        console.log("failed from firebase")
      })
  }

  const checkIfUserHasCompletedRegistraction = (id: string) => {
    httpClient.get(`users/${id}`).then((res) => {
      console.log(res.data);
      setUser(res.data);
      AsyncStorage.setItem('user',JSON.stringify(res.data));
      // navigation.navigate('DashboardNavigator' as never);
      navigation.reset({
        index: 0,
        routes: [{ name: 'DashboardNavigator' } as never] // Replace 'Home' with the actual name of your main screen
      });
      ToastService('Logged in successfully.');
    
    }).catch(() => {
        const obj = {
          uid: id,
          phone: phoneNumber
        }
        navigation.navigate('SignUp' as never, obj as never );
    });
  }

  return (
      <KeyboardAvoidingView
        style={{ flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
      <View style={{flex: 1}}>
      {otpScreen &&     
      <TouchableOpacity style={LoginScreenStyle.backButton} onPress={() => setOtpScreen(false)}>
        <NewBackButton height={20} width={20} fill={"black"} />
        {/* <Text style={LoginScreenStyle.loginHeading}>Log in</Text> */}
      </TouchableOpacity>
      }
      {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
      <View style={{flex: 1}}>
      {!otpScreen && <View style={[LoginScreenStyle.imageBlock]}>
        {/* <View> */}
          <Text style={LoginScreenStyle.loginHeading}>Eduzy</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: "10%" }}>
            <Image style={{ height: "70%", width: "50%", resizeMode: 'contain'}} source={require('../../../../assets/png/loginbot.png')} />
          {/* </View> */}
        </View>
      </View> }
      {otpScreen &&  <View style={{ marginTop: "30%", height: 600 }}>
          <OtpVerification phoneNumber={""} otpGiven={(otp: string) => otpGiven(otp)}
            sendOtp={() => sendVerification()} />
        </View>}
      {!otpScreen && (
        <View style={{ padding: 20 }}>
          <FirebaseRecaptchaVerifierModal
            style={{flex: 1, alignSelf: 'center', 
            justifyContent: 'center', 
            alignItems: 'center', height: 100, width: 100, borderRadius: 10, borderWidth: 1, borderColor: 'gray', backgroundColor: 'white' }}
            title="Phone Verification"
            cancelLabel="Close"
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Text style={styles.inputLabel}>Phone Number:</Text>
          <Text style={styles.inputDescription}>
            Please confirm your country code and enter your mobile number.
          </Text>
          <View style={styles.phoneContainer}>
            <View>
              <Text>
                +91
              </Text>
            </View>
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
      </View>
      </View>
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
    alignItems: 'center',
    gap: 10
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