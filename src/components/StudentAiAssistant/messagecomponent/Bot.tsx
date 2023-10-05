import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../styles/colors";
import * as Speech from 'expo-speech';
import { Speaker } from "../../common/SvgComponent/SvgComponent";


export const Bot = ({ text }: any) => {

  const readTheMessage = async () => {
    const thingToSay = text;
    if(await Speech.isSpeakingAsync()) {
      await Speech.stop();
    } else {
      Speech.speak(thingToSay);
    }
  }


  return (
    <View style={styles.rectangle}>
      <View style={styles.msg}>
        <TouchableOpacity onPress={readTheMessage} style={styles.speaker}>
          <Speaker height={20} width={20} fill={Colors.black_01} />
        </TouchableOpacity>
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
    position: 'relative',
    padding: 16,
    paddingRight: 40,
    paddingTop: 20,
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
  speaker: {
    position: "absolute",
    height: 24,
    width: 24,
    top: 10,
    right: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    padding: 3,
  }
});
