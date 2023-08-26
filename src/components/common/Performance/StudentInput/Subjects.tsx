
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../../../styles/colors";

interface Subject {
  subjectName: string;
  color: string;
}

interface SubjectProps {
  subject: Subject;
  isPressed: boolean;
  onPress: () => void;
}

const SubjectComponent: React.FC<SubjectProps> = ({ subject, isPressed, onPress }) => {
  const buttonStyle = [
    styles.child,
    { backgroundColor: subject.color || Colors.Snow_Flurry },
    isPressed
      ? {
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }
      : null,
  ];

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <Text style={styles.buttonText}>{subject.subjectName}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  child: {
    textAlign: "center",
    borderRadius: 20,
    height: 40,
    padding: 10,
    gap: 20,
  },
  buttonText: {
    color: Colors.black_01,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default SubjectComponent;