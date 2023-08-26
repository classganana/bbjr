import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

export const Bot = ({ text }: any) => {
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
    justifyContent: "flex-start",
  },
  msg: {
    padding: 16,
    maxWidth: "80%",
    minWidth: "20%",
    backgroundColor: Colors.light_gray_01,
    //   borderWidth: 1,
    //   borderColor: Colors.blue_01,
    borderBottomLeftRadius: 0,
    borderRadius: 19,
    // justifyContent:"center",
  },
  text: {
    color: Colors.black_05,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "400",
  },
});
