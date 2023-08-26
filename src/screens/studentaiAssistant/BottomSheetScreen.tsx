import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MessageContainer } from "./MessageContainerScreen";
import { Aiinput } from "../../components/StudentAiAssistant/aiinput/AiInputComponent";
import { Chats } from "./Chats.interface";
import { httpClient } from "../../services/HttpServices";

export const BottomSheetScreen: React.FC = () => {
  const navigation = useNavigation();
  const apiPath = "http://65.1.73.103:8000/";
  const [messages, setMessages] = useState<Chats[]>([]);
  const [subject, setSubject] = useState("");

  useEffect(() => {
    const routes = navigation.getState().routes;
    const currentRouteObject = routes.find(
      (element: any) => element.name == "BottomSheetScreen"
    );
    setSubject(currentRouteObject?.params?.selectedSubject.subjectName);
  }, []);

  useEffect(() => {
    // /generate/conversations/{school_id}/{student_id}/{subject'}
    const customApiPath = `${apiPath}generate/conversations/101/10/${subject}`;
    httpClient.get(customApiPath).then((res) => {
      console.log(res.data);
      setMessages(res.data.data);
    });
  }, [subject]);

  const pushMessageIntoQueue = (text: string) => {
    const msg = {
      source: "user",
      text: text,
      timestamp: 1690709815485.8948,
    };
    setMessages((prev) => [...prev, msg]);

    const customApiEndpoint = `${apiPath}generate/ask-userMessage`;

    const chat_history = () => {
      if (messages.length >= 4) {
        const lastFourMessages = messages.slice(
          messages.length - 4,
          messages.length
        );
        return [
          {
            userText: lastFourMessages[0].text,
            botText: lastFourMessages[1].text,
          },
          {
            userText: lastFourMessages[2].text,
            botText: lastFourMessages[3].text,
          },
        ];
      }
    };

    const req = {
      schoolId: 101,
      boardId: 101,
      subject: subject,
      className: 10,
      studentName: "Trin",
      studentId: 10,
      userMessage: text,
      chatHistory: messages.length >= 4 ? chat_history() : [],
    };

    httpClient.post(customApiEndpoint, req).then((res) => {
      const data = res.data.data;
      const botmsg = {
        source: data.source,
        text: data.text,
        timestamp: 1690709815485.8948,
      };
      setMessages((prev) => [...prev, botmsg]);
    });
  };

  return (
    <View style={styles.container}>
      <MessageContainer messages={messages} />
      <View style={styles.inputcontainer}>
        <Aiinput
          onSubjectChange={(sub: any) => {
            setSubject(sub.subjectName);
          }}
          onsendclick={pushMessageIntoQueue}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputcontainer: {
    display: "flex",
    width: "100%",
    position: "relative",
    bottom: 0,
  },
});
