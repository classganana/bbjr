import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import Tabs from '../common/Tabs/Tabs'
import { QuizOverviewQuestions } from './QuizOverviewQuestions'
import { QuizIntoduction } from './QuizIntoduction'
import { QuizInformation } from './QuizInformation'
import { Answers } from '../../screens/quiz/QuizQuestionsPage'

type Props = {
    time: string,
    questions: Answers,
    onCloseSheet: () => void
}

export const QuizOverView = ({onCloseSheet, time, questions}: Props) => {
  const tabs: string[]= ['Overview', 'Instructions']  
  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View style={{flex: 1}}>
        <View style={{paddingTop: 36, paddingLeft: 20, paddingBottom: 20}}>
            <Text>Practice : English Vocabulary Quiz </Text>
            <Text>Time Left: {time}</Text>
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
    </View>
  )
}
