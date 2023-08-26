import React, { useState } from "react";
import { View, Alert } from "react-native";
import { ScrollView, StyleSheet, Text } from "react-native";
import { InputComponent } from "../../components/common/InputComponent/InputComponent";
import { Button } from "../../components/common/ButttonComponent/Button";
import { LoginButton } from "../../components/common/ButttonComponent/ButtonStyles";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../styles/colors";

export const ResetPassword = () => {
  const [userDetails, setUserDetails] = useState({
    password: "",
    confirmPassword: "", // Add confirmPassword to the state
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const handlePasswordChange = (data: any) => {
    console.log(data?.target);
    setUserDetails({
      ...userDetails,
      password: data || userDetails.password,
    });
  };

  const handleConfirmPasswordChange = (data: any) => {
    setUserDetails({
      ...userDetails,
      confirmPassword: data || userDetails.confirmPassword,
    });
  };

  const moveToPasswordChangedScreen = () => {
    console.log(userDetails.password, userDetails.confirmPassword);
    if (!userDetails.password || !userDetails.confirmPassword) {
      // Display a warning message if any input field is empty
      Alert.alert("Warning", "Please fill in all fields!");
    } else if (userDetails.password !== userDetails.confirmPassword) {
      // Display a warning message if passwords do not match
      Alert.alert("Warning", "Passwords do not match! Please try again.", [
        {
          text: "OK",
          onPress: () => {
            // Clear the password fields
            setUserDetails({
              ...userDetails,
              password: "",
              confirmPassword: "",
            });
          },
        },
      ]);
    } else {
      navigation.navigate(
        "PasswordChangedScreen" as never,
        {
          password: userDetails.password,
        } as never
      );
    }
  };

  return (
    <ScrollView>
      <View style={styles.loginContainer}>
        <Text style={styles.loginHeader}>Create new password</Text>

        <Text style={styles.successText}>
          Your new password must be unique from those previously used.
        </Text>

        <View style={styles.loginForm}>
          <InputComponent
            name="password"
            placeholder="New password"
            className={{
              label: undefined,
              inputBox: undefined,
            }}
            secureTextEntry={!passwordVisible}
            onChange={handlePasswordChange}
          />

          <InputComponent
            name="confirmPassword"
            className={{
              label: undefined,
              inputBox: undefined,
            }}
            secureTextEntry={!passwordVisible}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
          />

          {userDetails.password !== "" &&
            userDetails.confirmPassword !== "" &&
            userDetails.password !== userDetails.confirmPassword && (
              <Text style={styles.errorText}>Passwords do not match!</Text>
            )}
          <Button
            onPress={moveToPasswordChangedScreen}
            label="Reset Password"
            className={LoginButton}
            disabled={
              userDetails.password == userDetails.confirmPassword ? false : true
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    marginTop: 100,
    display: "flex",
    flex: 1,
    gap: 30,
    height: 500,
    alignItems: "center",
  },
  loginHeader: {
    width: "90%",
    fontSize: 25,
    fontFamily: "Inter-ExtraBold",
  },
  loginForm: {
    display: "flex",
    flex: 1,
    gap: 15,
    width: "90%",
  },
  successText: {
    color: Colors.gray_02,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "500",
    width: "90%",
  },
  errorText: {
    color: Colors.red,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "500",
  },
});
