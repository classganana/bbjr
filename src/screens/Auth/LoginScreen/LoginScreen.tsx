import { BackHandler, Image, Text, TextInput, Touchable, TouchableNativeFeedback, View } from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle"
import { useEffect, useState } from "react";
import OtpVerification from "../OtpVerificationScreen";
import { LoginForm } from "./LoginForm";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { Constants } from "../../../constants/constants";

export const LoginScreen = () => {
  const [otpScreen, setOtpScreen] = useState(true);
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  function moveToOtpScreen() {
    setOtpScreen(true);
  }


  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        console.log("back button");
        return true; // Returning true prevents the default back action
      }
      return false; // Allow the default back action on other screens
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Remove the event listener when the component unmounts
  }, [navigator]);

  return (
      <View style={LoginScreenStyle.container}>
            <View style={LoginScreenStyle.header}>
              <Image style={LoginScreenStyle.botIcon} source={require("../../../../assets/gifs/bot.gif")}></Image>
              <Text style={LoginScreenStyle.headerText}>{Constants.BrandName}</Text>
            </View>
              <View style={LoginScreenStyle.body}>
                  <LoginForm />
              </View>            
      </View>
  )
}