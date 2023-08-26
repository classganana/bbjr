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
  CrossIcon,
  MicroPhone,
  Pen,
  Send,
} from "../../common/SvgComponent/SvgComponent";
import { useNavigation } from "@react-navigation/native";

export const Aiinput: React.FC = ({ onsendclick, onSubjectChange }: any) => {
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState<{
    subjectName: string;
  }>();
  const [text, setText] = useState("");

  const setSubjectAndCloseModal = (item: any) => {
    setBottomSheetVisible(false);
    setSelectedSubject(item);
    onSubjectChange(item);
  };

  const navigation = useNavigation();

  useEffect(() => {
    const routes = navigation.getState().routes;
    const currentRouteObject = routes.find(
      (element: any) => element.name == "BottomSheetScreen"
    ) as any;
    setSelectedSubject(currentRouteObject?.params?.selectedSubject);
  }, []);

  const onChange = (text: string) => {
    setText(text);
  };

  const onSend = () => {
    if (text) onsendclick(text);
    console.log(text);
    setText("");
    console.log(text);
  };

  function handleOnSubmitEditing(): void {
    if (text) onsendclick(text);
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
          }}
        >
          <TouchableOpacity
            style={styles.edit}
            onPress={() => setBottomSheetVisible(true)}
          >
            <Pen height={"18"} width={"18"} fill={"black"} />
          </TouchableOpacity>
          <Text style={styles.selectedSubject}>
            {selectedSubject?.subjectName}
          </Text>
        </View>
        <View style={styles.content}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={text}
              placeholder="Ask me anything..."
              onChangeText={(text) => onChange(text)}
              onSubmitEditing={handleOnSubmitEditing}
            />
            {/* <View style={styles.svg}>
              <MicroPhone height={28} width={28} fill="#AEAEAE" />
            </View> */}
          </View>
          <TouchableOpacity onPress={onSend} style={styles.send}>
            <Send height={"27"} width={"27"} fill={"green"} />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={bottomSheetVisible}
        onRequestClose={() => setBottomSheetVisible(false)}
      >
        <View style={styles.bottomSheetContainer}>
          <Student
            selectedSubject={(item: any) => setSubjectAndCloseModal(item)}
          />
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              position: "absolute",
              bottom: 0,
            }}
          >
            <View style={styles.closeButton}>
              <TouchableOpacity
                style={styles.edit}
                onPress={() => setBottomSheetVisible(false)}
              >
                <CrossIcon height={20} width={32} fill={"red"} />
              </TouchableOpacity>
              <Text>Select Subject</Text>
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
  selectedSubject: {
    backgroundColor: Colors.Hawkes_Blue,
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
    borderRadius: 5,
    borderWidth: 1 / 2,
    borderColor: Colors.light_gray_02,
    backgroundColor: Colors.light_gray_01,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: Colors.dark_gray_03,
    fontSize: 16,
    fontWeight: "400",
  },
  rectangle: {
    backgroundColor: Colors.white_01,
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
    backgroundColor: Colors.skyblue,
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
    backgroundColor: Colors.Hawkes_Blue,
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
    height: "50%",
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // padding: 20,
  },
  closeButton: {
    // alignSelf: "center",
    // marginTop: 10,
    // padding: 10,
    flexDirection: "row",
    bottom: 10,
    position: "absolute",
    gap: 10,
    alignItems: "center",
    // backgroundColor: Colors.light_gray_01,
    // borderRadius: 5,
  },
  text: {
    position: "absolute",
    fontSize: 400,
  },
});
