import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Button } from "../../common/ButttonComponent/Button";
import { StartButton } from "../../common/ButttonComponent/ButtonStyles";
import { Colors, SubjectColors } from "../../../styles/colors";

interface ButtonData {
  text: string;
  color: string;
}

interface Subject {
  subjectName: string;
}

interface SubjectWithColor {
  subjectName: string;
  color: string;
}

interface ButtonProps {
  buttonData: ButtonData;
  onPress: (item: any) => void;
  isPressed: boolean;
}

const ChipComponent: React.FC<ButtonProps> = ({
  buttonData,
  onPress,
  isPressed,
}) => {
  const buttonStyle = [
    styles.child,
    { backgroundColor: buttonData.color || Colors.Snow_Flurry },
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
      <Text style={styles.buttonText}>{buttonData.text}</Text>
    </TouchableOpacity>
  );
};

export interface Props {
  selectedSubject: (item: any) => void;
}

// change component name from student to subject
export const Student = ({ selectedSubject }: Props) => {
  const [listOfSubjects, setListOfSubjects] = useState<Subject[]>([]);
  const [colorsMappedSubjectList, setColorsMappedSubjectList] = useState<
    SubjectWithColor[]
  >([]);
  const [pressedSubject, setPressedSubject] = useState<number>(-1);

  const getSubjects = () => {
    // some API call or data fetching
    const result = [
      { subjectName: "kkk" },
      { subjectName: "Maths" },
      { subjectName: "Geography" },
      { subjectName: "History" },
      { subjectName: "English" },
      { subjectName: "Geometry" },
      { subjectName: "Hindi" },
      { subjectName: "Marathi" },
      { subjectName: "Biology" },
      { subjectName: "Chemistry" },
      { subjectName: "Sanskrit" },
      // ... (add more subjects)
    ];

    setListOfSubjects(result);
  };

  const mapSubjectWithColors = (listOfSubject?: Subject[]) => {
    const mappedSubjectWithColor = listOfSubject?.map(
      (subject: Subject, index) => {
        const colorIndex = index % SubjectColors.length;
        return {
          subjectName: subject.subjectName,
          color: SubjectColors[colorIndex],
        };
      }
    );
    return mappedSubjectWithColor || [];
  };

  useEffect(() => {
    getSubjects();
  }, []);

  useEffect(() => {
    const list = mapSubjectWithColors(listOfSubjects);
    setColorsMappedSubjectList(list);
  }, [listOfSubjects]);

  const handlePressSubject = (index: number) => {
    setPressedSubject(index);
    selectedSubject(listOfSubjects[index]);
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.subjectcontainer}>
          {colorsMappedSubjectList.map((subjectWithColor, index) => (
            <ChipComponent
              key={index}
              buttonData={{
                text: subjectWithColor.subjectName,
                color: subjectWithColor.color,
              }}
              isPressed={index === pressedSubject}
              onPress={() => handlePressSubject(index)}
            />
          ))}
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // flex: 1,
    height: 300,
    width: "100%",
    backgroundColor: Colors.white,
    // position: "relative",
  },
  subjectcontainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    gap: 23,
    padding: 20,
    // height: 200,
    paddingHorizontal: 30,
    top: 36,
    backgroundColor: Colors.white,
  },
  child: {
    display: "flex",
    alignItems: "center",
    textAlign: "center",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  buttonText: {
    color: Colors.black_01,
    fontFamily: "Inter-Regular",
    fontSize: 16,
    fontWeight: "500",
    lineHeight: 20,
  },
});

export default Student;
