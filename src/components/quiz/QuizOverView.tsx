import React, { useState } from 'react'
import { ScrollView, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Tabs from '../common/Tabs/Tabs'
import { QuizOverviewQuestions } from './QuizOverviewQuestions'
import { QuizIntoduction } from './QuizIntoduction'
import { QuizInformation } from './QuizInformation'
import { Answers } from '../../screens/quiz/QuizQuestionsPage'
import { StyleSheet } from 'react-native'
import { Colors } from '../../styles/colors'
import { CrossIcon } from '../common/SvgComponent/SvgComponent'

type Props = {
    time: string,
    questions: Answers,
    onCloseSheet: () => void
}

export const QuizOverView = ({onCloseSheet, time, questions}: Props) => {
  const tabs: string[]= ['Overview', 'Instructions']  
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <ScrollView style={style.container}>
        <View style={style.header}>
            <Text>Practice : English Vocabulary Quiz </Text>
            <Text>Time Left: {time}</Text>
            <TouchableOpacity style={style.closeIcon} onPress={() => { onCloseSheet() }}>
                <CrossIcon height={18} width={18} fill={Colors.black_01} />
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}>
            <Tabs activeTab={activeTab} tabs={tabs} 
            onChangeTab={function (tab: string): void { setActiveTab(tab) } } />
            { activeTab == 'Overview' && 
            <View style={{paddingHorizontal: 24, paddingVertical: 20, flex: 1}}> 
            <QuizOverviewQuestions questionList={questions}  
            closeSheet={() => { onCloseSheet() }}/> 
            </View> }
            { activeTab == 'Instructions' && 
                    <View style={{paddingHorizontal: 24, paddingVertical: 20}}>
                        <QuizInformation />
                        <QuizIntoduction mcqs={questions.length}  time={questions.length * 15} />
                    </View>
            }
        </View>
    </ScrollView>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: 30, 
        paddingLeft: 20, 
        paddingBottom: 20,
        position: 'relative',
    },
    closeIcon: {
        position: 'absolute',
        top: "70%",
        right: "10%"
    }


})