import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

export const User = ({ text }: any) => {
  return (
    <View style={styles.rectangle}>
      <View style={styles.msg}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  msg: {
    padding: 16,
    maxWidth: "80%",
    minWidth: "20%",
    backgroundColor: Colors.skyblue,
    // borderWidth: 1,
    // borderColor: Colors.blue_01,
    borderBottomRightRadius: 0,
    borderRadius: 19,
  },
  text: {
    color: Colors.white,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
});
