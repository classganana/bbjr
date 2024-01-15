import React, { useEffect, useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, TouchableOpacity, Modal } from 'react-native' // Import KeyboardAvoidingView
import { ArrowLeft, BotIcon, Pen, ThreeDots } from '../../components/common/SvgComponent/SvgComponent'
import { BotStyle } from './BotScreenStyle'
import { BotIntroduction } from '../../components/bot/BotIntroduction'
import { Aiinput } from '../../components/StudentAiAssistant/aiinput/AiInputComponent'
import { BotMessage, MessageContainer } from '../studentaiAssistant/MessageContainerScreen'
import { httpClient } from '../../services/HttpServices'
import { useNavigation } from '@react-navigation/native'
import { Chats } from '../studentaiAssistant/Chats.interface'
import { useUser } from '../../context/UserContext'
import ReportComponent from '../../components/quiz/ReportComponent'
import { ToastService } from '../../services/ToastService'
import { Colors } from '../../styles/colors'

interface BotMessageFeedback {
  BotAnswer: string;
  feedback: string
}

export const BotScreen = () => {
  const [subject, setSubject] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation();
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const { user } = useUser();
  const [userFeedback, setUserFeedback] = useState('');
  const [botMessage, setBotMessage] = useState<BotMessageFeedback>();
  const [subjectModal, setSubjectModal] = useState(false);

  useEffect(() => {
    console.log(user)
    const req = {
      service: "ml_service",
      endpoint: `/conversations?student_id=${user?.userId}&subject=${subject}&school_id=default`,
      requestMethod: "GET",
      requestBody: {

      }
    };

    if (user?.board && user?.class && user?.name, user?.userId && subject) {
      httpClient.post('auth/c-auth', req)
        .then((res) => {
          setMessages(() => res.data.data)
        })
        .catch((e) => {
          console.log("Error => ", e);
        })
    }
  }, [subject])

  const pushMessageIntoQueue = (text: string) => {
    // Create a new message object for the user
    const userMessage = {
      source: "user",
      text: text,
      timestamp: Date.now(),
    };

    // Create a 'typing' message for the bot
    const botTypingMessage = {
      source: "bot",
      text: 'typing',
      timestamp: Date.now(),
    };

    // Add the user message and the 'typing' message
    setMessages((prev: any) => [...prev, userMessage, botTypingMessage]);

    // Prepare the chat history data
    const chat_history = () => {
      const lastFourMessages = messages.slice(
        Math.max(messages.length - 4, 0), // Ensure it starts at 0 or higher
        messages.length
      );

      // Initialize history objects
      const historyObjects = [];
      // Generate history objects for the available messages
      for (let i = 0; i < lastFourMessages.length - 1; i += 2) {
        historyObjects.push({
          userText: lastFourMessages[i].text,
          botText: lastFourMessages[i + 1].text,
        });
      }
      return historyObjects;
    };

    const req = {
      service: "ml_service",
      endpoint: "/generate/answer",
      requestMethod: "POST",
      requestBody: {
        schoolId: 'default',
        subject: subject,
        boardId: user?.board,
        className: user?.class,
        studentName: user?.name,
        studentId: user?.userId,
        userMessage: text,
        chatHistory: chat_history(),
      }
    };

    if (user?.board && user?.class && user?.name, user?.userId && subject) {
      httpClient.post('auth/c-auth', req).then((res) => {
        const data = res.data.data;
        const botmsg: Chats = {
          source: data.source,
          text: data.text,
          timestamp: Date.now(),
          stream: true
        };

        // Replace the 'typing' message with the actual bot response
        setMessages((prev: any) => {
          const updatedMessages = [...prev];
          const index = updatedMessages.findIndex((message) => message.source === 'bot' && message.text === 'typing');
          if (index !== -1) {
            updatedMessages[index] = botmsg;
          }
          return updatedMessages;
        });
      });
    }
  };

  const onBackClick = () => {
    navigation.navigate('DashboardNavigator' as never);
  }

  const submitFeedback = async (botFeedback: BotMessageFeedback | undefined) => {
    const history = getChatHistoryForFeedback(botFeedback?.BotAnswer)
    const localMessages = [...history];
    console.log(localMessages);
    const lastUserMessage = localMessages.reverse().find((message: any) => message.source === 'user');
    const req = {
      "schoolId": "default",
      "boardId": user?.board,
      "subject": subject,
      "className": user?.class,
      "studentId": user?.userId,
      "feedbackOn": "chat",
      "msg": {
        "feedbackMessage": botFeedback?.feedback == 'negative' && userFeedback ? userFeedback : "liked",
        "UserQuestion": lastUserMessage.text,
        ...botFeedback
      },
      "chatHistory": history
    }

    const reqObj = {
      "service": "ml_service",
      "endpoint": `/feedback`,
      "requestMethod": "POST",
      "requestBody": req
    }

    console.log(req);
    const res = await httpClient.post(`auth/c-auth`, reqObj);
    if (res.data.statusCode == 200) {
      setBottomSheetVisible(false);
      ToastService('Thanks alot for the feedback');
      console.log("Saved Successfully");
    }
  }

  const getChatHistoryForFeedback = (botMsg: string | undefined) => {
    const index = messages.findIndex((message: any) => message.source === 'bot' && message.text === botMsg);
    if (index < 4) {
      return messages;
    } else {
      const chatHistory = messages.slice(index - 4, index);
      return chatHistory;
    }
  }

  function reportQuestion(item: React.SetStateAction<string>) {
    setUserFeedback(item);
    submitFeedback(botMessage);
    // submitFeedback(botMessage)
  }

  const startReportFlow = (message: BotMessageFeedback) => {
    console.log(message);
    if (message?.feedback == 'negative') {
      setBottomSheetVisible(true);
    } else {
      submitFeedback(botMessage);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior on iOS
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}>
      <View style={BotStyle.container}>
        <View style={BotStyle.header}>
          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity style={BotStyle.headerIcon} onPress={onBackClick}>
              <ArrowLeft height={24} width={24} fill={'red'} />
              <BotIcon height={32} width={32} fill={Colors.primary} />
            </TouchableOpacity>
            <View>
              <Text style={BotStyle.headerTitle}>Zeal</Text>
              <Text style={BotStyle.headerTitleInfo}>• online</Text>
            </View>
          </View>

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

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={BotStyle.selectedSubject}>
                <TouchableOpacity style={BotStyle.selectSubjectContainer} onPress={() => {
                  setSubjectModal(true)
                }}>
                  {!subject ? <Text>
                    Select Subject
                  </Text >: <Text numberOfLines={1} ellipsizeMode="tail" 
                  style={BotStyle.selectedSubjectText}>{subject}</Text>  }
                  <Pen height={"18"} width={"18"} fill={Colors.primary} />
                </TouchableOpacity>
            </View>
            <View style={BotStyle.menu}>
              <ThreeDots height={16} width={4} fill={'#454545'} />
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {messages && messages.length == 0 || (subject == "")
            ? <BotIntroduction />
            : <MessageContainer messages={messages} feedback={
              function (message: BotMessageFeedback): void {
                setBotMessage(message);
                startReportFlow(message);

              }} />
          }
        </View>
        <View style={{ justifyContent: 'flex-end', width: "100%" }}>
          <Aiinput
            onSubjectChange={(item: any) => {setSubject(item.subjectName); setSubjectModal(false) }} onSendClick={(text: any) => pushMessageIntoQueue(text)}
            openPopUp={subjectModal} />
          {/* <Aiinput onsendclick={(text) => onMessageSent(text)} onSubjectChange={(sub: any) => { console.log(sub) }} /> */}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={bottomSheetVisible}
        // onRequestClose={() => setBottomSheetVisible(false)}
        >
          <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
            <View style={BotStyle.bottomSheetContainer}>
              <ReportComponent
                report={(item) => { reportQuestion(item); }}
                closeModal={(item) => setBottomSheetVisible(item)} />
            </View>
          </View>
        </Modal>
      </View>
    </KeyboardAvoidingView>
  )
}
