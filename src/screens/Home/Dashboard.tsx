import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { Send, Sprit, Star } from '../../components/common/SvgComponent/SvgComponent'
import { PrimaryDefaultButton, PrimaryIconDefaultButton, PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation } from '@react-navigation/native'
import { Constants } from '../../constants/constants'
import { Colors } from '../../styles/colors'
import { ExamPrepQuizCard, ExamPrepQuizCardData } from '../../components/quiz/ExamPrepQuizCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '../../context/UserContext'
import CircleInitials from '../../components/common/CircleInitials/CircleInitials'
import { IconButton } from '../../components/common/IconButtonComponent/IconButton'
import { ContinutPractice } from '../../components/home/components/ContinutPractice'
import { httpClient } from '../../services/HttpServices'


export const Dashboard = () => {
    const navigator = useNavigation();
    const { user } = useUser();


    const moveToExploreQuizPage = async () => {
        await AsyncStorage.setItem('quizFlow', 'Quizzes');
        navigator.navigate('Quiz' as never);
    }

    const moveToExploreExamPrepPage = async () => {
        await AsyncStorage.setItem('quizFlow', 'Exam Prep');
        navigator.navigate('Quiz' as never);
    }

    const moveToExploreBotPage = () => {
        navigator.navigate('Bot' as never);
    }

    const getPendingQuiz = async () => {
        getDashboardData()
        const localQuiz = await AsyncStorage.getItem('localQuizzes');
        if (localQuiz) return JSON.parse(localQuiz);
    }

    const getDashboardData = () => {
        const req = {
            "schoolId": "default",
            "boardId": user?.board,
            "className": user?.class,
            "studentId": user?.userId,
        }

        const reqObj = {
            "service": "ml_service",
            "endpoint": `/main/data`,
            "requestMethod": "POST",
            "requestBody": req
        }
        httpClient.post(`auth/c-auth`, reqObj)
        .then((res) => {
            if(res.data.statusCode == 200) {
                console.log(res.data.data);
            } else {
                console.log("main",res.data);
            }
        })
    }


    useEffect(() => {
        AsyncStorage.setItem('user', JSON.stringify(user));
        getPendingQuiz().then((list) => {
            if (list && list.length) {
                list = list.map((item: any) => {
                    item.title = (item.screenPage == "examPreparation") ? item.chapterName : item.name;
                    return item;
                })
                setData(list)
            }
        })
    }, [])

    const [data, setData] = useState<ExamPrepQuizCardData[]>([]);

    return (
        <View style={DashboardStyle.container}>
            {/* <View style={DashboardStyle.header}>
                <Image style={{ height: 50, width: 50 }} source={require("../../../assets/gifs/bot.gif")}></Image>
                <Text style={DashboardStyle.brand}>{Constants.BrandName}</Text>
            </View> */}
            <ScrollView style={DashboardStyle.body}>
                <View style={DashboardStyle.leaderboardHeader}>
                    <View style={DashboardStyle.leaderBoardSection}>
                        <CircleInitials name={user?.name} size={30} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 18 }}>Hello! {user?.name}</Text>
                        </View>
                    </View>
                </View>
                <View style={DashboardStyle.options}>
                    <View style={DashboardStyle.optionTitle}>
                        <Text style={DashboardStyle.boostYourKnowledge}>Boost Your Knowledge</Text>
                        <TouchableOpacity style={DashboardStyle.viewAllBlock} onPress={moveToExploreQuizPage}>
                            <Text style={DashboardStyle.viewAllText}>Explore</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={DashboardStyle.optionsCard}>
                        <View style={DashboardStyle.option}>
                            <Text style={DashboardStyle.optionCardHeading}>Quiz</Text>
                            <View style={DashboardStyle.optionHeader}>
                                <Sprit height={'36'} width={'36'} fill={'red'} />
                                <View>
                                    <Text style={DashboardStyle.optionHeaderText}>55</Text>
                                    <Text style={DashboardStyle.optionHeaderInfoText}>Quizzes</Text>
                                </View>
                            </View>
                            <Text style={DashboardStyle.optionBodyDescription}>
                                You have played total 55 quizzes last month!
                            </Text>
                            <Button label={"Take Quiz"} className={PrimaryDefaultButton} disabled={false} onPress={moveToExploreQuizPage}></Button>

                        </View>
                        <View style={DashboardStyle.option}>
                            <Text style={DashboardStyle.optionCardHeading}>Exam Prep</Text>
                            <View style={DashboardStyle.optionHeader}>
                                <View style={{ height: 34, width: 34, borderRadius: 34, padding: 5, backgroundColor: '#D6E0FC' }}>
                                    <Image style={{ height: 25, width: 25, borderRadius: 34, padding: 10 }} source={require("../../../assets/svg/books.png")}></Image>
                                </View>
                                <View>
                                    <Text style={DashboardStyle.optionHeaderText}>55</Text>
                                    <Text style={DashboardStyle.optionHeaderInfoText}>Subjects Taken</Text>
                                </View>
                            </View>
                            <Text style={DashboardStyle.optionBodyDescription}>
                                You have played total 55 quizzes last month!
                            </Text>
                            <Button label={"Exam Prep"} className={PrimaryDefaultButton} disabled={false} onPress={() => moveToExploreExamPrepPage()}></Button>
                        </View>
                    </View>
                </View>


                <View style={DashboardStyle.botBlock}>
                    <Text style={DashboardStyle.botHeading}>Start Learning with AI Chat 🚀</Text>
                    <Text>Your Personal Study Assistant</Text>
                    <View style={DashboardStyle.botBlockDesc}>
                        <View>
                            <IconButton className={PrimaryIconDefaultButton}
                                onPress={() => moveToExploreBotPage()} icon={<Send height={'20'} width={'20'} fill={'white'} />} label={'Get Started'} pos={'right'} backgroundColor={Colors.primary} />
                        </View>
                        <Image style={DashboardStyle.botGif} source={require("../../../assets/gifs/bot.gif")}></Image>
                    </View>
                </View>
                {/* <Text style={{ color: Colors.primary, width: "80%" }}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text> */}
                {data && data.length > 0 ? <View>
                    <View style={DashboardStyle.continuePractice}>
                        <Text>Continue practice </Text>
                        <TouchableOpacity>
                            <Text style={DashboardStyle.explore}>
                                Explore
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={DashboardStyle.pendingQuizzesList}>
                            {data && data.map((item, index) => (
                                <ExamPrepQuizCard key={index} {...item} onCardClick={(i) => { console.log(i) }} />
                            ))}
                    </View>
                </View>
                :
                <ContinutPractice onPress={() => {
                    moveToExploreExamPrepPage()
                }} />
                }
            </ScrollView>
        </View>
    )
}