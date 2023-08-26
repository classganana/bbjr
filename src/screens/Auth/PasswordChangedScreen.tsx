import React from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
// import { Check } from "../../components/common/SvgComponent/SvgComponent";
import { useNavigation } from "@react-navigation/native";
import { Button } from "../../components/common/ButttonComponent/Button";
import { LoginButton } from "../../components/common/ButttonComponent/ButtonStyles";
import { Image } from "react-native";
import { Colors } from "../../styles/colors";


export const PasswordChangedScreen = () => {
  const navigation = useNavigation();

  const moveToLogin = () => {
    navigation.navigate("Login" as never); // Specify type as 'never'
    console.log('Back to login');
  };

  return (
    <View style={styles.loginContainer}>
      <Image
        source={require("../../../assets/Kirat.gif")}
        style={styles.image}
      />
      {/* <Check height={100} width={500} fill="green" /> */}
      <Text style={styles.text}>Password Changed!</Text>
      <Text style={styles.successText}>
        Your password has been changed successfully.
      </Text>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button
            onPress={moveToLogin}
            label={"Back To Login"}
            className={LoginButton} disabled={false} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    display: "flex",
    flex: 1,
    gap: 30,
    height: 500,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: Colors.black_01,
    textAlign: "center",
    fontFamily: "Inter-ExtraBold",
    fontSize: 25,
    fontStyle: "normal",
    fontWeight: "700",
    lineHeight: 30,
    marginTop: 10,
  },
  successText: {
    color: Colors.gray_02,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 15,
    fontStyle: "normal",
    fontWeight: "500",
    display: "flex",
    width: 226,
    flexDirection: "column",
    flexShrink: 0,
  },
  button: {
    width: "90%",
  },
  image: {
    height: 117,
    width: 117,
    borderRadius: 80,
  },
});

