import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../../styles/colors";
import { Chats } from "./Chats.interface";
import React, { useRef, useState } from "react";
import { Bot } from "../../components/StudentAiAssistant/messagecomponent/Bot";
import { User } from "../../components/StudentAiAssistant/messagecomponent/user";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "../../components/common/SvgComponent/SvgComponent";


interface MessageContainerProps {
  messages: Chats[];
  feedback: (message: any) => void;
  optionClicked: (queestion: string) => void;
}

export const MessageContainer: React.FC<MessageContainerProps> = ({ messages, feedback, optionClicked }) => {

  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const moveToStudentAssistant = () => {
    navigation.navigate("StudentAssistantSetupScreen" as never);
  };

  const [showOption, setShowOption] = useState(false);

  return (
    <>
      <View style={style.container}>
        <ScrollView
          contentContainerStyle={{
            display: "flex",
            gap: 10,
            paddingHorizontal: 14,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({ animated: true })
          }
        >
          {messages && messages.length ? (
            <>
              {/* this will be rendered when there are user messages available  */}
              {messages.map((message: Chats, index: number) => {
                return (
                  <React.Fragment key={index}>
                    {message.source == "user" ? (
                      <User text={message.text}></User>
                    ) : (
                      <Bot text={message.text} stream={message.stream}
                        feedback={feedback} streamDone={function (done: boolean): void {
                          setShowOption(done);                        
                        } }></Bot>

                    )}
                    {message.suggestions && message.suggestions.map((suggestion, index) => {
                      return (<View key={index+101}>
                          {showOption && suggestion && suggestion.length && <TouchableOpacity key={index} onPress={() => {
                            optionClicked(suggestion)
                            setShowOption(false)
                            }} style={style.options}>
                            <Text style={style.optionsText} key={index}>{suggestion}</Text>
                          </TouchableOpacity>}
                      </View>
                      )
                    })}
                  </React.Fragment>
                );
              })}
            </>
          ) : (
            <>
              {/* this will be rendered when there are no user messages  */}
              <InfoSection />
            </>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export const InfoSection = () => {
  return (
    <>
      <View style={style.infoMessagesContainer}>
        <Text style={style.infoMessagesTitle}>Student Assistant</Text>
        <Text style={style.infoMessages}>
          Welcome to your AI-powered Student Q&A Assistant! Here, you can ask
          any questions related to your subjects, and I'll provide you with
          helpful answers.
        </Text>
        <Text style={style.infoMessages}>
          Just type your query in the chatbox, and I'll do my best to assist
          you.
        </Text>
        <View style={style.infoMessages}>
          <Text style={style.info}>
            Answer all your questions. {"\n"}
            (Ask me anything)
          </Text>
        </View>
      </View>
    </>
  );
};

export const UserMessage = ({ text }: any) => {
  return (
    <View style={style.usermessageContainer}>
      <Text>{text}</Text>
    </View>
  );
};

export const BotMessage = ({ text }: any) => {
  return (
    <View style={style.usermessageContainer}>
      <Text>{text}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    paddingVertical: 10,
    // paddingHorizontal: 12,
    gap: 25,
    width: "100%",
    // top:55
  },
  messageContainer: {
    flex: 1,
    flexDirection: "column",
    // top: 25,
    // position:"relative",
  },
  usermessageContainer: {
    display: "flex",
    backgroundColor: Colors.white_01,
    padding: 16,
    borderRadius: 8,
    width: "100%",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: Colors.blue_01,
  },
  infoMessagesContainer: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: 'center',
    alignItems: "center",
  },
  infoMessagesTitle: {
    color: Colors.dark_gray_01,
    fontSize: 18,
    textAlign: "center",
    marginTop: 18,
    marginBottom: 30,
  },
  infoMessages: {
    width: "100%",
    textAlign: "center",
    marginBottom: 18,
    borderRadius: 10,
    backgroundColor: Colors.light_gray_01,
    color: Colors.dark_gray_01,
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  info: {
    color: Colors.dark_gray_01,
    textAlign: "center",
  },
  header: {
    display: "flex",
    alignItems: "center",
    paddingVertical: 10,
    gap: 40,
    flexDirection: "row",
    backgroundColor: Colors.lightblue,
    justifyContent: "center",
    width: "100%",
  },
  image: {
    height: 73,
    width: 73,
  },
  headerimage: {
    height: 28,
    width: 28,
  },
  headertext: {
    color: Colors.black_01,
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 31,
    height: 31,
    backgroundColor: Colors.blue_02,
    borderColor: Colors.skyblue,
    borderWidth: 0.5,
    borderRadius: 90,
    alignSelf: "center",
  },
  options: {
    display: 'flex',
    width: 288,
    padding: 9, // Combine padding values for React Native
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    flexWrap: 'wrap',
    borderRadius: 12,
    borderWidth: 1, // Use borderWidth for border
    borderColor: Colors.primary,
    shadowColor: 'rgba(0, 0, 0, 0.10)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 1,
    shadowRadius: 8,
  },
  optionsText: {
    color: Colors.primary,
    fontWeight: "500"
  }
});
