import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors'
import { BotMessage } from './BotMessage'
import { Pen, QuestionMark } from '../common/SvgComponent/SvgComponent'
import { useUser } from '../../context/UserContext'

export const BotIntroduction = () => {
  const [showOptions, setShowOptions] = useState(false);
  const { user } = useUser()


  const basicInfoList: string[] = [
    "Great choice! You've selected Class" + user?.class +" 📚",
    "From now on, our answers and assistance will be tailored to Class " +user?.class +"  subjects and topics.",
    "Feel free to ask questions related to your " +user?.class +" curriculum, and we'll provide you with accurate and helpful information.",
    "We're here to support your learning journey in Class " + user?.class +" . Ask away!"
  ]  
  const [intromessages, setIntroMessages] = useState([
    { text: "Where should I begin to get started?" },
    {
      // Include the PenIcon component within the text
      text: (
        <Text>
          1) Click on the <Pen height={"14"} width={"14"} style={{position: 'relative', backgroundColor: "#006B7F", padding: 4, borderRadius: 18, top: 5}} fill={"white"} /> pencil icon to select your subject.
          {"\n\n"}
          2) After selecting your subject, type your question or topic in the chat, and I'll assist you further.
          {"\n\n"}
          Feel free to ask anything related to your selected subject! 📚
        </Text>
      ),
    },
  ]);

  

  const guideUser = () => {
    setShowOptions(true);
  }

  return (
    <>
    <View style={BotIntroStyle.container}>
        <Text style={BotIntroStyle.title}>
            Welcome to the Ezy!
        </Text>
        <Text style={BotIntroStyle.titleInfo}>
            Unlock the Power of AI to Find Solutions Tailored to Your Study Needs.
        </Text>
        {!showOptions && 
            <View style={BotIntroStyle.infoCard}>
                {
                    basicInfoList.map((item, index) => {
                        return <View key={index} style={BotIntroStyle.listItem}>
                            <View style={BotIntroStyle.bullet}></View>
                            <Text style={{color: "#6C6C6C"}}>
                                {item}
                            </Text>
                        </View>
                    })
                }
            </View>        
        }
        {!showOptions && <BotMessage text={"Hello there! How may I assist you with your studies today?"} />}
        {
            showOptions && intromessages.map((msg, index) => {
                return <BotMessage key={index} text={msg.text} />
            })
        }
        {!showOptions && <View style={BotIntroStyle.infoblock}>
            <Text>Not sure where to start? You can try:</Text>
            <View style={{flexDirection: 'row', alignItems:"center", gap:12}}>
                <QuestionMark height={'24'} width={'24'} fill={Colors.primary} />
                <TouchableOpacity style={BotIntroStyle.infoButton} onPress={guideUser}>
                    <Text style={BotIntroStyle.infoButtonText}>
                        Where should I begin to get started?
                    </Text>
                </TouchableOpacity>
            </View>
        </View>}
    </View>
    </>
  )
}

const BotIntroStyle = StyleSheet.create({
    container: {
        width: "100%",
        paddingTop: 12,
        alignItems: 'center',
        flex: 1,
        backgroundColor: Colors.white
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        textAlign: 'center'
    },
    titleInfo: {
        width: "70%",
        marginTop: 6,
        color: "#626262",
        fontSize: 14,
        textAlign: 'center'
    },
    infoCard: {
        marginHorizontal: 16,
        marginTop: 20,
        gap: 16,
        paddingVertical: 24,
        paddingHorizontal: 8,
        borderRadius: 10,
        backgroundColor: "#F4F7F8"
    },
    listItem: {
        flexDirection: 'row',
        alignItems:"flex-start",
        paddingHorizontal: 8,
        
    },
    bullet: {
        width: 4, // Adjust the size of the bullet point
        height: 4,
        borderRadius: 4, // Make it a circle
        backgroundColor: '#6C6C6C', // Adjust the bullet point color
        marginRight: 10, // Adjust the spacing between the bullet and text
        marginBottom: 2,
        marginTop: 8,
    },
    infoblock: {
        width: "100%",
        paddingHorizontal: 12,
        marginTop: 28,
        gap: 12,
    },
    infoButton: {
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.primary,
        backgroundColor: '#FFF',
        paddingVertical: 10,
        paddingHorizontal: 14
    },
    infoButtonText: {
        color: Colors.primary
    }
});
