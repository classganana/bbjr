import React, { useEffect, useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native' // Import KeyboardAvoidingView
import { ArrowLeft, BotIcon } from '../../components/common/SvgComponent/SvgComponent'
import { BotStyle } from './BotScreenStyle'
import { BotIntroduction } from '../../components/bot/BotIntroduction'
import { Aiinput } from '../../components/StudentAiAssistant/aiinput/AiInputComponent'
import { MessageContainer } from '../studentaiAssistant/MessageContainerScreen'
import { httpClient } from '../../services/HttpServices'
import { useNavigation } from '@react-navigation/native'
import { Chats } from '../studentaiAssistant/Chats.interface'

export const BotScreen = () => {
  const [subject, setSubject] = useState("");
  const [messages, setMessages] = useState<any>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const req = {
      service: "ml_service",
      endpoint: `/conversations?student_id=10&subject=${subject}&school_id=default`,
      requestMethod: "GET",
      requestBody: {
        schoolId: "default",
        boardId: "CBSE",
        subject: subject,
        className: 10,
        studentName: "Trin",
        studentId: 10
      }
    };

    httpClient.post('auth/c-auth', req).then((res) => {
      setMessages(() => res.data.data)
      console.log(messages);
    })

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
        boardId: 'CBSE',
        subject: subject,
        className: 10,
        studentName: "Trin",
        studentId: 10,
        userMessage: text,
        chatHistory:  chat_history(),
      }
    };
  
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
  };
  

  const onBackClick = () => {
    navigation.navigate('DashboardNavigator' as never)
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior on iOS
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}>
      <View style={BotStyle.container}>
        <View style={BotStyle.header}>
          <TouchableOpacity style={BotStyle.headerIcon} onPress={onBackClick}>
            <ArrowLeft height={24} width={24} fill={'red'} />
            <BotIcon height={32} width={32} fill={'red'} />
          </TouchableOpacity>
          <View>
            <Text style={BotStyle.headerTitle}>Zeal</Text>
            <Text style={BotStyle.headerTitleInfo}>• online</Text>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          {messages && messages.length == 0 || (subject == "")
            ? <BotIntroduction />
            : <MessageContainer messages={messages} />
          }

        </View>
        <View style={{ justifyContent: 'flex-end', width: "100%" }}>
          <Aiinput onSubjectChange={(item: any) => { setSubject(item.subjectName) }} onSendClick={(text: any) => pushMessageIntoQueue(text)} />
          {/* <Aiinput onsendclick={(text) => onMessageSent(text)} onSubjectChange={(sub: any) => { console.log(sub) }} /> */}
        </View>
      </View>
    </KeyboardAvoidingView>
  )
}
