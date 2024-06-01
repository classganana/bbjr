import React, { useEffect, useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { NewBackIcon, StrongBackButton } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { useNavigation } from '@react-navigation/native';
import { httpClient } from '../../services/HttpServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useUser } from '../../context/UserContext';
import { styles } from '../quiz/QuizHomePageStyle';
import { QuizDropDown } from '../../components/profile/QuizDropDown';
import { Button } from '../../components/common/ButttonComponent/Button';
import { Examprep, LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';

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
    const [isLoading, setIsLoading] = useState(true);
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
        setIsLoading(true);
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
                  
                //   setData(result);
                  setData([]);
                  setIsLoading(false)
                  console.log(JSON.stringify(data));
            })
    };

    useEffect(() => {
        fetchData()
    }, [tab])

    const onBack = () => {
        navigation.navigate('Setting' as never)
    }

    const moveToExploreQuizPage = async () => {
        await AsyncStorage.setItem('quizFlow', 'Quizzes');
        navigation.navigate('Quiz' as never);
    }

    const moveToExploreExamPrepPage = async () => {
        await AsyncStorage.setItem('quizFlow', 'Exam Prep');
        navigation.navigate('Quiz' as never);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading} >
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <NewBackIcon accessible={true} accessibilityLabel={'Back Button'} height={14} width={14} fill={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>Previous Test Scores</Text>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.tabs}>
                    <Tabs activeTab={tab} tabs={['Quizzes', 'Exam Prep']} onChangeTab={(i) => setTab(i)} ></Tabs>
                </View>
                <ScrollView style={styles.tabs}>
                    {tab == "Quizzes" && <View style={{flex: 1}}>
                    <Text style={styles.selectedOption}>{tab}</Text>
                        {
                            isLoading ? 
                            <Image  style={{ height: 200, width: "50%", alignSelf: 'center' }}  source={{ uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/loading.gif' }} /> :
                        <View style={styles.noQuizFound}>
                            {data && data.length == 0 && <View>
                                <Image style={{ height: 200, width: 250, alignSelf: 'center' }} source={require('../../../assets/png/test.png')} />
                                <Text style={{fontSize: 20, marginTop: 30}}>Get started with Quizzes now!</Text>
                            </View>}
                            <View style={{height: 60, width: "80%"}}>
                                <Button label={"Quizzes"}
                                        disabled={false} onPress={moveToExploreQuizPage} 
                                        className={Examprep}
                                        accessibilityLabel={"Quizzes"}
                                />
                            </View>
                        </View>

                        }
                        
                    </View>}
                    {tab == 'Exam Prep' && <>
                        <View>
                            <TouchableOpacity >
                                <Text style={styles.examPreparation}>Exam Prep History</Text>
                            </TouchableOpacity>
                        </View>
                        {
                            isLoading ?
                            <Image  style={{ height: 200, width: "50%", alignSelf: 'center' }}  source={{ uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/loading.gif' }} /> :
                        <View>
                        <View style={styles.noQuizFound}>
                            {data && data.length == 0 && <View>
                                <Image style={{ height: 200, width: 250, alignSelf: 'center' }} source={require('../../../assets/png/test.png')} />
                                <Text style={{fontSize: 20, marginTop: 30}}>Get started with Quizzes now!</Text>
                            </View>}
                            <View style={{height: 60, width: "80%"}}>
                                <Button label={"Exam Preparation"} 
                                        disabled={false} onPress={moveToExploreExamPrepPage} 
                                        className={Examprep}
                                        accessibilityLabel={"Exam Preparation"}
                                        />
                            </View>
                        </View>
                            {data?.map((item, index) => (
                                <QuizDropDown key={index} subject={item} />
                            ))}

                        </View>}
                    </>
                    }
                </ScrollView>
            </View>
        </View>
    )
}