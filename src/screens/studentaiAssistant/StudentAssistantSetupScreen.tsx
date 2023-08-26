import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "../../components/common/ButttonComponent/Button";
import { StartButton } from "../../components/common/ButttonComponent/ButtonStyles";
import { Colors, SubjectColors } from "../../styles/colors";
import Student from "../../components/StudentAiAssistant/subjectbuttons/Subject";

export const StudentAssistantSetupScreen = () => {
  const [selectedSubject, setSelectedSubject] = useState({});
  const navigation = useNavigation();
  const moveToBottomSheetScreen = () => {
    navigation.navigate(
      "BottomSheetScreen" as never,
      { selectedSubject } as never
    );
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../../../assets/png/blueai.png")}
            style={{
              width: 28,
              height: 28,
            }}
          />
          <Text>Student Assistant</Text>
        </View>
        <Image
          source={require("../../../assets/png/blueai.png")}
          resizeMode="contain"
          style={{
            width: 70,
            height: 50,
            alignSelf: "center",
          }}
        />

        <Text style={styles.label}>Welcome to</Text>
        <View style={{ gap: 30 }}>
          <Text style={styles.student}>
            Student Assistant
            <Image
              source={require("../../../assets/png/Wave.png")}
              resizeMode="contain"
              style={{
                width: 40,
                height: 30,
                alignSelf: "center",
              }}
            />
          </Text>
          <View style={styles.textcontainer}>
            <Text style={styles.text}>
              Start Chatting with student assistant now.{"\n "}
              You can ask me anything.
            </Text>
          </View>
          <Text style={styles.text1}>Select Subject to start conversation</Text>
        </View>

        <Student
          selectedSubject={(data: any) => {
            setSelectedSubject(data);
          }}
        />
      </View>
      <View style={styles.button}>
        {/* <Text>{selectedSubject?.subjectName}</Text> */}
        <Button
          onPress={() => moveToBottomSheetScreen()}
          label={"Start Chat"}
          className={StartButton}
          disabled={selectedSubject?.subjectName ? false : true}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    gap: 8,
    // top: 20,
    width: "100%",
    backgroundColor: Colors.white,
    position: "relative",
  },
  button: {
    // marginTop: 90,
    width: "100%",
    position: "absolute",
    bottom: 40,
    paddingHorizontal: 14,
  },
  label: {
    color: Colors.black_01,
    textAlign: "center",
    fontFamily: "Inter-Regular",
    fontSize: 20,
    fontWeight: "400",
    paddingTop: 20,
  },
  student: {
    color: Colors.Blue,
    fontFamily: "Inter-Regular",
    fontSize: 20,
    fontWeight: "400",
    fontStyle: "normal",
    textAlign: "center",
    paddingLeft: 50,
  },
  text1: {
    color: Colors.Vampire_Grey,
    fontFamily: "Inter-Regular",
    fontWeight: "600",
    fontSize: 14,
    fontStyle: "normal",
    textAlign: "center",
  },
  textcontainer: {
    gap: 40,
  },
  text: {
    color: Colors.Vampire_Grey,
    textAlign: "center",
  },

  header: {
    flexDirection: "row",
    gap: 50,
    justifyContent: "center",
    paddingTop: 20,
    // backgroundColor:Colors.white,
  },
  textcontainer1: {
    gap: 20,
  },
  headercontainer: {
    display: "flex",
    flexDirection: "column",
    top: 20,
  },
});

export default StudentAssistantSetupScreen;
