import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from "react-native";
import { Button } from "../../common/ButttonComponent/Button";
import { StartButton } from "../../common/ButttonComponent/ButtonStyles";
import { Colors, SubjectColors } from "../../../styles/colors";
import { UserType, useUser } from "../../../context/UserContext";
import { httpClient } from "../../../services/HttpServices";

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
  themeColor: boolean | undefined
}

const ChipComponent: React.FC<ButtonProps> = ({
  buttonData,
  onPress,
  isPressed,
  themeColor
}) => {
  const { user } = useUser()
  const textStyle:any=[
    { color: (themeColor && isPressed) ? Colors.white: 'black' },
  ]
  const buttonStyle:any= [
    styles.child,{borderColor: themeColor && 'rgba(150, 150, 150, 0.64)',
      borderWidth: themeColor && 1},
    { backgroundColor: buttonData.color || Colors.Snow_Flurry },
    isPressed
      ? {
          shadowColor: "#000",
          backgroundColor: themeColor && Colors.primary,
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
      <Text style={[styles.buttonText,textStyle]}>{buttonData.text}</Text>
    </TouchableOpacity>
  );
};

export interface Props {
  selectedSubject: (item: any) => void;
  themeColor?: boolean,
  subject?: string
}

// change component name from student to subject
export const Student = ({ selectedSubject, themeColor, subject }: Props) => {
  const {user} = useUser();
  const [listOfSubjects, setListOfSubjects] = useState<Subject[]>([]);
  const [colorsMappedSubjectList, setColorsMappedSubjectList] = useState<
    SubjectWithColor[]
  >([]);
  const [pressedSubject, setPressedSubject] = useState<number>(-1);

  const getSubjects = () => {
    const reqObj = {
      "service": "ml_service",
      // "endpoint":  `data/quizz/${board}/${className}/${subjects}`,
      "endpoint": `/subjects?board_id=${user?.board}&class_name=${user?.class}&school_id=default`,
      "requestMethod": "GET"
  }

  httpClient.post(`auth/c-auth`, reqObj).then((res) => {
    const subjectList = res.data.data;
    const result = subjectList.map((sub: any) => {
      return {
        subjectName: sub.subject
      }
    })

    setListOfSubjects(result);
  })
  };

  const mapSubjectWithColors = (listOfSubject?: Subject[]) => {
    const mappedSubjectWithColor = listOfSubject?.map(
      (subject: Subject, index) => {
        if(!themeColor) {
          const colorIndex = index % SubjectColors.length;
          return {
            subjectName: subject.subjectName,
            color: SubjectColors[colorIndex],
          };
        } else {
          return {
            subjectName: subject.subjectName,
            color: Colors.white,
          };
        }
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
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.subjectcontainer}>
        {colorsMappedSubjectList.map((subjectWithColor, index) => (
          <ChipComponent
            themeColor={themeColor}
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
    </ScrollView>

);
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // flex: 1,
    // height: 300,
    width: "100%",
    // backgroundColor: Colors.white,
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
    // top: 36,
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