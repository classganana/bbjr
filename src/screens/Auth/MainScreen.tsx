import React, { useEffect } from "react";
import {
  Image,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Platform,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/common/ButttonComponent/Button";
import {
  LoginButton,
  RegisterButton,
} from "../../components/common/ButttonComponent/ButtonStyles";
import { Group } from "../../components/common/SvgComponent/SvgComponent";
const MainScreen = () => {
  const navigation = useNavigation();
  let screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    function handleResize() {
      console.log("resized to: ", window.innerWidth, "x", window.innerHeight);
    }
    Platform.OS == "web" ? window.addEventListener("resize", handleResize) : "";
    console.log(screenWidth);
  }, [Dimensions.get("window").width]);
  const moveToLogin = () => {
    navigation.navigate("Login" as never); // Specify type as 'never'
  };
  const moveToRegister = () => {
    navigation.navigate("Register" as never); // Specify type as 'never'
  };
  return (
    <View style={{ backgroundColor: "white", flex: 1, alignItems: "center" }}>
      <View
        style={{
          height: 500,
          width: screenWidth,
          backgroundColor: "#F9F7DD",
          position: "relative",
          top: 5,
        }}
      >
        {Platform.OS != "web" ? (
          <View
            style={{
              height: 300,
              width: screenWidth,
              backgroundColor: "white",
              position: "absolute",
              bottom: -170,
              left: "0%",
              borderRadius: 300,
            }}
          ></View>
        ) : (
          <View
            style={
              {
                height: 300,
                width: screenWidth,
                backgroundColor: "white",
                position: "absolute",
                bottom: -170,
                left: "0%",
                borderRadius: "100%",
              } as any
            }
          ></View>
        )}
        <View
          style={{
            position: "absolute",
            bottom: 30,
            left: Platform.OS == "web" ? screenWidth / 2 - 40 : "40%",
          }}
        >
          <Group height={90} width={90} fill="#EE5177" />
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 10,
            left: Platform.OS == "web" ? screenWidth / 2 - 70 : "33%",
          }}
        >
          <Text style={{ fontSize: 25 }}>Class Ganana</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          onPress={moveToLogin}
          label={"LOGIN"}
          className={LoginButton}
          disabled={false}
        />
        <Button
          onPress={moveToRegister}
          label={"Register"}
          className={RegisterButton}
          disabled={false}
        />
      </View>
    </View>
  );
};
export default MainScreen;
const styles = StyleSheet.create({
  container: {
    top: 0,
    position: "relative",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  buttonContainer: {
    top: 550,
    position: "absolute",
    width: "90%",
    alignItems: "center",
    paddingBottom: 90,
    gap: 16,
  },
});
