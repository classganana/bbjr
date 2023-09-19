import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import { LoginScreenStyle } from "./LoginScreenStyle";
import { Button } from "../../../components/common/ButttonComponent/Button";
import { PrimaryDefaultButton } from "../../../components/common/ButttonComponent/ButtonStyles";
import { useNavigation } from "@react-navigation/native";

export const LoginForm = () => {
  const navigation = useNavigation();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Define a regular expression for a valid phone number pattern.
  const phoneRegex = /^[0-9]{10}$/;

  const validatePhoneNumber = (inputPhoneNumber: string) => {
    if (!phoneRegex.test(inputPhoneNumber)) {
      setPhoneNumberError("Please enter a valid 10-digit phone number.");
    } else {
      setPhoneNumberError("");
    }
  };

  function moveToOtpScreen() {
    console.log(phoneNumber);
    // navigation.navigate("Otp" as never);
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        <Text style={LoginScreenStyle.loginHeading}>Log in</Text>
      </View>
      <View>
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
      </View>
    </View>
  );
};
