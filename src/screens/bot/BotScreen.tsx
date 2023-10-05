import React, { useEffect, useState } from 'react'
import { Text, View, KeyboardAvoidingView, Platform } from 'react-native' // Import KeyboardAvoidingView
import { ArrowLeft, BotIcon } from '../../components/common/SvgComponent/SvgComponent'
import { BotStyle } from './BotScreenStyle'
import { BotIntroduction } from '../../components/bot/BotIntroduction'
import { Aiinput } from '../../components/StudentAiAssistant/aiinput/AiInputComponent'
import { MessageContainer } from '../studentaiAssistant/MessageContainerScreen'
import { httpClient } from '../../services/HttpServices'

export const BotScreen = () => {
    const [subject, setSubject] = useState("");

    useEffect(() => {
        const req = {
            service: "ml_service",
            endpoint: "/conversations/101/10/Science",
            requestMethod: "GET",
            requestBody: {
                schoolId: 101,
                boardId: 101,
                subject: 'Science',
                className: 8,
                studentName: "Trin",
                studentId: 10
        }};

    },[])

    const pushMessageIntoQueue = (text: string) => {
        const msg = {
          source: "user",
          text: text,
          timestamp: 1690709815485.8948,
        };
        setMessages((prev) => [...prev, msg]);    
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
            service: "ml_service",
            endpoint: "/generate/answer",
            requestMethod: "POST",
            requestBody: {
                schoolId: 101,
                boardId: 101,
                subject: 'Science',
                className: 8,
                studentName: "Trin",
                studentId: 10,
                userMessage: text,
                chatHistory: messages.length >= 4 ? chat_history() : [],
        }};
    
        httpClient.post('auth/c-auth', req).then((res) => {
          const data = res.data.data;
          const botmsg = {
            source: data.source,
            text: data.text,
            timestamp: 1690709815485.8948,
          };
          setMessages((prev) => [...prev, botmsg]);
        });
      };

    const [messages, setMessages] = useState([
        {
            "source": "user",
            "text": "what is agriculture implements?",
            "timestamp": 1696070668
        },
        {
            "source": "bot",
            "text": "Agricultural implements are tools and machinery used in farming and crop production. They include tools like ploughs, hoes, cultivators, seed drills, and harvesters. These implements are used for various tasks such as tilling the soil, removing weeds, sowing seeds, and harvesting crops. (Chapter: CROP PRODUCTION AND MANAGEMENT)",
            "timestamp": 1696070671,
            "reference": {}
        }
    ]);

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Use 'padding' behavior on iOS
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 30}
>
            <View style={BotStyle.container}>
                <View style={BotStyle.header}>
                    <View style={BotStyle.headerIcon}>
                        <ArrowLeft height={24} width={24} fill={'red'} />
                        <BotIcon height={32} width={32} fill={'red'} />
                    </View>
                    <View>
                        <Text style={BotStyle.headerTitle}>Zeal</Text>
                        <Text style={BotStyle.headerTitleInfo}>• online</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    {messages.length == 0 || (subject == "") 
                    ? <BotIntroduction />
                    :<MessageContainer messages={messages} />
                    }
                </View>
                <View style={{ justifyContent: 'flex-end', width: "100%" }}>
                    <Aiinput onSubjectChange={(item: any) => { setSubject(item) }} onSendClick={(text: any) => pushMessageIntoQueue(text)} />
                    {/* <Aiinput onsendclick={(text) => onMessageSent(text)} onSubjectChange={(sub: any) => { console.log(sub) }} /> */}
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
