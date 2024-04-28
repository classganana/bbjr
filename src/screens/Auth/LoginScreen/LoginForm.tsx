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
import { dummyCredentials, dummyUser } from "../../../constants/constants";


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
      console.log(phoneNumber);
      if(phoneNumber == dummyCredentials.phoneNumber) {
        console.log(dummyUser)
        await AsyncStorage.setItem('user',JSON.stringify(dummyUser));
        setUser(dummyUser);
        navigation.reset({
          index: 0,
          routes: [{ name: 'DashboardNavigator' } as never] // Replace 'Home' with the actual name of your main screen
        });
        ToastService('Logged in successfully.');
      } else {
        await AsyncStorage.setItem('phone', phoneNumber);
        sendVerification();
      }
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
      <FirebaseRecaptchaVerifierModal
                  style={{flex: 1, alignSelf: 'center', 
                  justifyContent: 'center', 
                  alignItems: 'center', height: 100, width: 100, borderRadius: 10, borderWidth: 1, borderColor: 'gray', backgroundColor: 'white' }}
                  title="Phone Verification"
                  cancelLabel="Close"
                  ref={recaptchaVerifier}
                  firebaseConfig={firebaseConfig}
                />
        {otpScreen &&     
        <TouchableOpacity style={LoginScreenStyle.backButton} onPress={() => setOtpScreen(false)}>
          <NewBackButton height={20} width={20} fill={"black"} />
          {/* <Text style={LoginScreenStyle.loginHeading}>Log in</Text> */}
        </TouchableOpacity>
        }
        {/* <ScrollView contentContainerStyle={{ flex: 1 }}> */}
        <View style={{flex: 1}}>
          {!otpScreen && <View style={[LoginScreenStyle.imageBlock]}>
            <Text style={LoginScreenStyle.loginHeading}>Eduzy</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1, marginTop: "10%" }}>
              <Image style={{ height: "70%", width: "50%", resizeMode: 'contain'}} source={require('../../../../assets/png/loginbot.png')} />
            </View>
          </View> }
          {otpScreen &&  <View style={{ marginTop: "30%", height: 600 }}>
              <OtpVerification phoneNumber={""} otpGiven={(otp: string) => otpGiven(otp)}
                sendOtp={() => moveToOtpScreen()} />
            </View>}
          {!otpScreen && (
            <View style={styles.loginFormContainer}>
              <View style={styles.loginForm}>
                <View style={styles.loginTitleContainer}>
                  <Text style={styles.loginTitle}>Login</Text>
                  <Text style={styles.loginSubTitle}>Please enter your phone number</Text>
                </View>
                <View style={styles.phoneInputField}>
                  <Text style={styles.inputLabel}>Phone Number</Text>
                  <View style={styles.phoneContainer}>
                    <View style={styles.phoneCode}>
                      <Text style={{fontSize: 16}}>
                        +91
                      </Text>
                    </View>
                    <TextInput
                      style={styles.input}
                      placeholderTextColor="#999"
                      placeholder="Phone number"
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
                  <Text style={{ fontSize: 12, paddingHorizontal: 5 }}>
                    By Continuing you agree to the Terms of services and Privacy policy
                  </Text>
                </View>
              </View>
              <View style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <Button
                  className={PrimaryDefaultButton}
                  label={"Get OTP"}
                  disabled={phoneNumberError !== ""}
                  onPress={moveToOtpScreen}
                />
              </View>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginTitleContainer:{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 10,
  },
  loginForm: {
    paddingVertical: 20,
    gap: 30
  },
  loginFormContainer: {
    flex: 1.1,
    paddingHorizontal: 5,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  loginTitle: {
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 29.65,
    color: '#212121'
  },
  loginSubTitle: {
    fontWeight: '600',
    color: '#7A7A7A',
    lineHeight: 19.76,
    fontSize: 16,
  },
  phoneInputField: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    paddingHorizontal: 10,
  },
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
    alignItems: 'center',
    gap: 10,
    borderColor: '#B3B3B3',
    borderWidth: 0.5,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
    minHeight: 50,
  },
  input: {
    flex: 7,
    fontSize: 16,
    height: 48, // Increase the height to meet touch target guidelines
    paddingHorizontal: 10, // Add padding for better visual appearance
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#333', // Adjust text color for better contrast
  },
  phoneCode: {
    flex: 1,
    borderRightColor: '#8B8B8B',
    borderRightWidth: 0.5,
    paddingRight: 3,
    marginRight: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  errorText: {
    color: "#FF0000",
    paddingHorizontal: 5,
  },
});