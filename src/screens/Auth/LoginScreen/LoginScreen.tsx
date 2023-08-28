import { Text, TextInput, Touchable, TouchableNativeFeedback, View } from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle"
import { useState } from "react";
import OtpVerification from "../OtpVerificationScreen";
import { LoginForm } from "./LoginForm";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

export const LoginScreen = () => {
  const [otpScreen, setOtpScreen] = useState(true);
  const Stack = createNativeStackNavigator();
  const navigation = useNavigation();

  function moveToOtpScreen() {
    setOtpScreen(true);
    if (!otpScreen) {
      navigation.navigate('LoginForm' as never);
    }
  }

  return (
    <>
      <View style={LoginScreenStyle.container}>
        <Stack.Navigator>
          <Stack.Screen name='LoginForm' component={LoginForm} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen
        name="Otp"
        component={OtpVerification}
        options={{
          headerLeft: () => null, // Hide the back button
          headerBackVisible: false,
          headerTitle: () => (
            <TouchableNativeFeedback onPress={moveToOtpScreen}>
              <View style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: Colors.white }}>
                <View style={[LoginScreenStyle.progressBar, (otpScreen) ? { alignItems: 'flex-end' } : {}]}>
                  <View style={LoginScreenStyle.progressBarItem}></View>
                </View>
              </View>
            </TouchableNativeFeedback>
          ),
        }}
      />
        </Stack.Navigator>
      </View>
    </>
  )
}