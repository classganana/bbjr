import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Colors } from "../../../../styles/colors";

interface StudentData {
  title: string;
  numInputBoxes: number;
  refs: React.RefObject<TextInput>[];
  rollNumber?: string | number | undefined;
}

interface StudentInputProps {
  studentData: StudentData;
  handleTextChange: (
    text: string,
    inputRef: React.RefObject<TextInput>,
    prevInputRef?: React.RefObject<TextInput>,
    prevStudentRef?: StudentData
  ) => void;
  handleTextSubmit: (
    currentInputRef: React.RefObject<TextInput>,
    currentInputIndex: number
  ) => void;
}

const StudentInput: React.FC<StudentInputProps> = ({
  studentData,
  handleTextChange,
  handleTextSubmit,
}) => {
  return (
    <View style={styles.rectangle}>
      <View style={styles.inputContainer}>
        <View style={{ display: "flex", justifyContent: "center" }}>
          <Text style={{ textAlign: "center" }}>{studentData.rollNumber}</Text>
          <Text numberOfLines={2} style={styles.student}>
            {studentData.title}
          </Text>
        </View>
        {studentData.refs.map((ref, inputIndex) => (
          <TextInput
            key={inputIndex}
            style={styles.inputView}
            maxLength={2}
            onChangeText={(text) =>
              handleTextChange(
                text,
                ref,
                inputIndex > 0 ? studentData.refs[inputIndex - 1] : undefined,
                studentData
              )
            }
            ref={ref}
            keyboardType="numeric"
            returnKeyType={
              inputIndex < studentData.numInputBoxes - 1 ? "next" : "done"
            }
            onSubmitEditing={() => handleTextSubmit(ref, inputIndex)}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: Colors.white_01,
    padding: 16,
    borderRadius: 8,
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.blue_01,
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  inputView: {
    height: 60,
    width: 60,
    borderWidth: 0.5,
    borderRadius: 5,
    marginHorizontal: 5,
    borderColor: Colors.blue_01,
    textAlign: "center",
    fontFamily: "Inter-Bold",
    fontSize: 20,
    backgroundColor: Colors.white,
  },
  student: {
    width: 50,
    display: "flex",
    flexDirection: "row",
    textAlign: "center",
  },
});

export default StudentInput;
