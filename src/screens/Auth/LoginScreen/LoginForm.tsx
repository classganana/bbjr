import { Text, TextInput, View } from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle"
import { Button } from "../../../components/common/ButttonComponent/Button"
import { LoginButton } from "../../../components/common/ButttonComponent/ButtonStyles"
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
    const navigation = useNavigation();

    function moveToOtpScreen() {
        navigation.navigate('Otp' as never);
        
    }

    return (
        <View style={LoginScreenStyle.formContainer}>
            <Text style={LoginScreenStyle.formContainerTitle}>Create Account</Text>
            <View style={LoginScreenStyle.inputSection}>
                <View style={LoginScreenStyle.inputFieldContainer}>
                    <Text style={LoginScreenStyle.inputFieldLabel}>Name</Text>
                    <TextInput style={LoginScreenStyle.inputField}></TextInput>
                </View>
                <View style={LoginScreenStyle.inputFieldContainer}>
                    <Text style={LoginScreenStyle.inputFieldLabel}>Mobile Number</Text>
                    <View style={LoginScreenStyle.inputPhoneField}>
                        <Text>+91</Text>
                        <View style={LoginScreenStyle.verticalLine}></View>
                        <TextInput></TextInput>
                    </View>
                    <Text style={LoginScreenStyle.errorMsg}>
                        The phone number is already in use by another account, try again
                    </Text>
                </View>
                <Text style={LoginScreenStyle.termsAndPolicy}>
                    By signing in, you agree to our Terms & Conditions and Privacy Policy
                </Text>
            </View>
            <View style={LoginScreenStyle.actionButtons} >
                <Button label={"Sign In"} className={LoginButton} disabled={false}
                    onPress={moveToOtpScreen}></Button>
            </View>
        </View>
    )
}
