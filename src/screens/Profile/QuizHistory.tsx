import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { StrongBackButton } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { useNavigation } from '@react-navigation/native';
import { httpClient } from '../../services/HttpServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { styles } from '../quiz/QuizHomePageStyle';
import { QuizDropDown } from '../../components/profile/QuizDropDown';

export interface Chapter {
    name: string[];
    quizzId: string;
    score: number;
  }
  
export  interface Subject {
    subject: string;
    chapters: Chapter[];
  }

export const QuizHistory = () => {
    const [tab, setTab] = useState('Quizzes');
    const [data, setData] = useState<Subject[]>();
    const {user} = useUser();

    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.removeItem('quizType');
        fetchData();
    }, [tab])
     

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        // setData([]);
        const req = {
            "schoolId": "default",
            "boardId": user?.board,
            "className": user?.class,
            "studentId": user?.userId,
            "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
        }

        const reqObj = {
            "service": "ml_service",
            "endpoint": `/results/quizzes`,
            "requestMethod": "POST",
            "requestBody": req
        }

        httpClient.post(`auth/c-auth`, reqObj)
            .then((res) => {
                console.log(res.data.data.quizzes);
                const list = res.data.data.quizzes;
                const result: Subject[] = list.reduce((acc: Subject[], item: any) => {
                    const { subject, name, quizzId, score } = item;
                    const existingSubject = acc.find((s) => s.subject === subject);
                  
                    if (existingSubject) {
                      existingSubject.chapters.push({ name, quizzId, score });
                    } else {
                      acc.push({
                        subject,
                        chapters: [{ name, quizzId, score }],
                      });
                    }
                  
                    return acc;
                  }, []);
                  
                  setData(result);
                  console.log(JSON.stringify(data));
            })
    };

    useEffect(() => {
        fetchData()
    }, [tab])

    const onBack = () => {
        navigation.navigate('Setting' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <StrongBackButton height={'25'} width={'25'} fill={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>Previous Test Scores</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.tabs}>
                    <Tabs activeTab={tab} tabs={['Quizzes', 'Exam Prep']} onChangeTab={(i) => setTab(i)} ></Tabs>
                </View>
                <ScrollView style={styles.tabs}>
                    {tab == "Quizzes" && <>
                    <Text style={styles.selectedOption}>{tab}</Text>
                        <>
                            {data && data.length == 0 && <>
                                <Text style={{fontSize: 100}}>Loading</Text>
                            </>}
                        </>
                    </>}
                    {tab == 'Exam Prep' && <>
                        <View>
                            <TouchableOpacity >
                                <Text style={styles.examPreparation}>Exam Prep History</Text>
                            </TouchableOpacity>
                        </View>
                        {data?.map((item, index) => (
                             <QuizDropDown key={index} subject={item} />
                        ))}
                    </>
                    }
                </ScrollView>
            </View>
        </View>
    )
}