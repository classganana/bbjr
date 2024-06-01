import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Button } from "../../common/ButttonComponent/Button";
import { StartButton } from "../../common/ButttonComponent/ButtonStyles";
import { Colors, SubjectColors } from "../../../styles/colors";
import { UserType, useUser } from "../../../context/UserContext";
import { httpClient } from "../../../services/HttpServices";
import { getSubjects } from "../../../utils/services.api";

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
  themeColor: boolean | undefined;
}

export const ChipComponent: React.FC<ButtonProps> = ({
  buttonData,
  onPress,
  isPressed,
  themeColor,
}) => {
  const { user } = useUser();
  const textStyle: any = [
    {
      textAlign: "center",
      color: themeColor && isPressed ? Colors.white : "black",
    },
  ];
  const buttonStyle: any = [
    styles.child,
    {
      borderColor: themeColor && "rgba(150, 150, 150, 0.64)",
      borderWidth: themeColor && 0.5,
    },
    { backgroundColor: buttonData.color || Colors.primary },
    { paddingVertical: 6 },
    isPressed
      ? {
          shadowColor: "#000",
          backgroundColor: Colors.primary,
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
    <TouchableOpacity
      style={[buttonStyle, styles.buttonText, textStyle]}
      onPress={onPress}
      accessible={true}
      accessibilityLabel={buttonData.text}
      accessibilityRole="button"
    >
      <Text
        style={[styles.buttonText, textStyle]}
        accessible={true}
        accessibilityRole="text"
      >
        {buttonData.text}
      </Text>
    </TouchableOpacity>
  );
};

export interface Props {
  selectedSubject: (item: any) => void;
  themeColor?: boolean;
  subject?: string;
  scrollable?: boolean;
}

// change component name from student to subject
export const Student = ({
  selectedSubject,
  themeColor,
  subject,
  scrollable,
}: Props) => {
  const { user } = useUser();
  const [listOfSubjects, setListOfSubjects] = useState<Subject[]>([]);
  const [colorsMappedSubjectList, setColorsMappedSubjectList] = useState<
    SubjectWithColor[]
  >([]);
  const [pressedSubject, setPressedSubject] = useState<number>(-1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSubjects(user)
      .then((res) => {
        setListOfSubjects(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const mapSubjectWithColors = (listOfSubject?: Subject[]) => {
    const mappedSubjectWithColor = listOfSubject?.map(
      (subject: Subject, index) => {
        if (!themeColor) {
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
    const list = mapSubjectWithColors(listOfSubjects);
    setColorsMappedSubjectList(list);
  }, [listOfSubjects]);

  const handlePressSubject = (index: number) => {
    setPressedSubject(index);
    selectedSubject(listOfSubjects[index]);
  };

  if (loading) {
    // Render loading indicator while loading
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const subjectContainer = (
    <View style={styles.subjectcontainer}>
      {colorsMappedSubjectList.map((subjectWithColor, index) => {
        return (
          <View key={subjectWithColor.subjectName + index}>
            {subject !== listOfSubjects[index].subjectName ? (
              <ChipComponent
                themeColor={themeColor}
                buttonData={{
                  text: subjectWithColor.subjectName,
                  color: subjectWithColor.color,
                }}
                isPressed={index === pressedSubject}
                onPress={() => handlePressSubject(index)}
              />
            ) : (
              <></>
            )}
          </View>
        );
      })}
    </View>
  );

  return (
    <>
      {scrollable ? (
        <ScrollView contentContainerStyle={styles.container}>
          {subjectContainer}
        </ScrollView>
      ) : (
        <>{subjectContainer}</>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // flex: 1,
    // height: 300,
    // width: "100%",
    // backgroundColor: Colors.white,
    // position: "relative",
  },
  subjectcontainer: {
    display: "flex",
    // justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    // width: "100%",
    gap: 12,
    // // height: 200,
    paddingHorizontal: 5,
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
