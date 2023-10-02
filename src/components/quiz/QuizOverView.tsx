import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Tabs from '../common/Tabs/Tabs'
import { QuizOverviewQuestions } from './QuizOverviewQuestions'
import { QuizIntoduction } from './QuizIntoduction'
import { QuizInformation } from './QuizInformation'

type Props = {
    timeLeft: string,
    questions: any
}

export const QuizOverView = ({onCloseSheet, time}: any) => {

  const tabs: string[]= ['Overview', 'Instructions']  

  const [activeTab, setActiveTab] = useState(tabs[0]);

  return (
    <View style={{flex: 1}}>
        <View>
            <Text>Practice : English Vocabulary Quiz </Text>
            <Text>{time}</Text>
        </View>
        <View style={{flex: 1}}>
            <Tabs activeTab={activeTab} tabs={tabs} 
            onChangeTab={function (tab: string): void { setActiveTab(tab) } } />
            { activeTab == 'Overview' &&  
            <QuizOverviewQuestions  closeSheet={() => { onCloseSheet() }}/> }
            { activeTab == 'Instructions' && 
                    <View style={{paddingHorizontal: 24, paddingVertical: 20}}>
                        <QuizInformation />
                        <QuizIntoduction />
                    </View>
            }
        </View>
    </View>
  )
}