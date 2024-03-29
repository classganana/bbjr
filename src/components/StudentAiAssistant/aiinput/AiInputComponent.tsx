import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Colors } from "../../../styles/colors";
import Student from "../subjectbuttons/Subject";
import {
  Pen,
  Send,
} from "../../common/SvgComponent/SvgComponent";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  onSendClick: (selectedOption: string) => void;
  onSubjectChange: (selectedOption: any) => void;
  openPopUp: boolean
}


export const Aiinput = ({ onSendClick, onSubjectChange, openPopUp }: Props ) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<{
    subjectName: string;
  }>();
  const [text, setText] = useState("");
  const [placeholder, setPlaceholder] = useState("Ask Anything...")
  const [lastQuestion, setLastQuestion] = useState('');

  const setSubjectAndCloseModal = (item: any) => {
    setSelectedSubject(item);
    setPlaceholder("Ask me anything related to " + item.subjectName)
    onSubjectChange(item);
  };

  const Continue = () => {
    setBottomSheetVisible(false);
    onSubjectChange(selectedSubject);
  }

  const navigation = useNavigation();

  useEffect(() => {
    const routes = navigation.getState().routes;
    const currentRouteObject = routes.find(
      (element: any) => element.name == "BottomSheetScreen"
    ) as any;
    setSelectedSubject(currentRouteObject?.params?.selectedSubject);
    // setBottomSheetVisible(true)
  }, []);

  useEffect(() => {
    setBottomSheetVisible(openPopUp)
  },[openPopUp])

  const onChange = (text: string) => {
    setText(text);
  };

  const onSend = async () => {
    if (text) {
      onSendClick(text);
      setLastQuestion(text)
      AsyncStorage.setItem('lastChatQuestion', text)
    }
    setText("");
  };

  function handleOnSubmitEditing(): void {
    if (text) {
      onSendClick(text);
      setLastQuestion(text)
      AsyncStorage.setItem('lastChatQuestion', text)
    }
    setText("");
  }

  return (
    <View style={styles.Container}>
      <View style={styles.rectangle}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 12,
            paddingVertical: 8,
            paddingHorizontal: 16,
            justifyContent: 'flex-end',
            backgroundColor: 'transparent'
          }}
        >
          {/* <View style={styles.selectSubjectContainer}>
            <Text style={styles.selectedSubject}> 
              {selectedSubject?.subjectName}
            </Text>
            {!selectedSubject?.subjectName && <Text style={styles.selectedSubject}>
              Select Subject
            </Text>}
            <TouchableOpacity
              style={styles.edit}
              onPress={() => setBottomSheetVisible(true)}
            >
              <Pen height={"18"} width={"18"} fill={"white"} />
            </TouchableOpacity>
          </View> */}
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              placeholder={placeholder.length > 40 ? placeholder.substring(0, 37) + '...' : placeholder}
              onChangeText={(text) => onChange(text)}
              onSubmitEditing={handleOnSubmitEditing}
            />
          <TouchableOpacity onPress={onSend} style={styles.send}>
            <Send height={"27"} width={"27"} fill={Colors.primary} />
          </TouchableOpacity>
          </View>
        </View>
      </View>

      <Modal
        style={{borderRadius: 300}}
        animationType="fade"
        transparent={true}
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        {/* <View style={{backgroundColor: 'rgba(0, 0, 0,0.4)', flex: 1,}}></View> */}
        <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
            <View style={styles.bottomSheetContainer}>
              <Student
              themeColor={true}
              selectedSubject={(item: any) => setSubjectAndCloseModal(item)} subject={selectedSubject?.subjectName}              />
              <View
                style={{
                  height: 60 
                }}
              >
                <View style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>Continue</Text>
                </View>
              </View>
            </View>
          </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  Container: {
    display: "flex",
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  selectSubjectContainer: {
      borderRadius: 25,
      backgroundColor: "#006B7F14",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      paddingLeft: 10
  },
  selectedSubject: {
    // backgroundColor: Colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 20,
  },
  inputContainer: {
    flex: 1,
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1 / 2,
    borderColor: Colors.light_gray_02,
    // backgroundColor: Colors.light_gray_01,
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#FFF",
    borderRadius: 10,
    border: "0.5px solid #D7D7D7",
    boxShadow: "0px 0px 6px 0px rgba(0, 0, 0, 0.10)",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.dark_gray_03,
    fontSize: 16,
    fontWeight: "400",
    backgroundColor: "#FFF",
  },
  rectangle: {
    // backgroundColor: Colors.white_01,
    // padding: 16,
    flexDirection: "column",
    // gap: 15,
    width: "100%",
  },
  send: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    // backgroundColor: Colors.skyblue,
    borderRadius: 90,
  },
  svg: {
    borderLeftWidth: 0.5,
    borderColor: Colors.light_gray_03,
  },
  edit: {
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderColor: Colors.skyblue,
    borderWidth: 0.5,
    borderRadius: 90,
  },
  content: {
    display: "flex",
    flexDirection: "row",
    borderTopWidth: 1,
    justifyContent: "space-between",
    borderColor: Colors.light_gray_03,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 14,
  },
  bottomSheetContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "75%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'scroll',
    paddingBottom: 0
  },
  closeButton: {
    flexDirection: "row",
    bottom: 10,
    borderRadius: 8,
    backgroundColor: Colors.primary,
    position: "absolute",
    gap: 10,
    alignItems: "center",
    justifyContent: 'center',
    paddingLeft: 10,
    zIndex: 1,
    width: "95%",
    height: 40,
    textAlign: 'center',
    alignSelf: 'center'
  },
  closeButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center'
  },
  text: {
    position: "absolute",
    fontSize: 400,
  },
});
