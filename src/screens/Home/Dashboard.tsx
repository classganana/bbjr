import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { ArrowIcon, ArrowLeft, Send, Sprit, Star, StreakCircle } from '../../components/common/SvgComponent/SvgComponent'
import { PrimaryDefaultButton, PrimaryIconDefaultButton, PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation } from '@react-navigation/native';
import { Constants } from '../../constants/constants'
import { Colors } from '../../styles/colors'
import { ExamPrepQuizCard, ExamPrepQuizCardData } from '../../components/quiz/ExamPrepQuizCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from '../../context/UserContext'
import CircleInitials from '../../components/common/CircleInitials/CircleInitials'
import { IconButton } from '../../components/common/IconButtonComponent/IconButton'
import { ContinutPractice } from '../../components/home/components/ContinutPractice'
import { httpClient } from '../../services/HttpServices'
import { OutlinePlaneButton } from '../../components/common/IconButtonComponent/iconButtonStyle'


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
                if (res.data.statusCode == 200) {
                    console.log(res.data.data);
                } else {
                    console.log("main", res.data);
                }
            })
    }

    const streak = () => {

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
                        <CircleInitials name={user?.name} size={32} />
                        <View style={{ flex: 1 }}>
                            <Text style={{ fontWeight: '600', fontSize: 18 }}>Hello! {user?.name}</Text>
                            {/* <View style={{ flexDirection: 'row', gap: 8 }}>
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                                <StreakCircle height={15} width={15} fill={'green'} />
                            </View> */}
                        </View>
                    </View>
                </View>
                <View>
                    <View style={DashboardStyle.view1}>
                        <View style={DashboardStyle.view2}>
                            <Text>Bravo! Continue learning for 1 week!</Text>
                        </View>
                        <Image
                            // resizeMode="contain"
                            source={{
                                uri: "https://cdn.builder.io/api/v1/image/assets/TEMP/3f720f1b38ac36a936d549549b2ba726d1dbd9f00bf763f288cf2c8133b1ac44?",
                            }}
                            style={DashboardStyle.image1}
                        />
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
                            <View style={DashboardStyle.optionHeader}>
                                <Sprit height={'36'} width={'36'} fill={'red'} />
                                <View>
                                    <Text style={DashboardStyle.optionHeaderText}>55</Text>
                                    {/* <Text style={DashboardStyle.optionHeaderInfoText}>Quizzes</Text> */}
                                </View>
                            </View>
                            <Text style={DashboardStyle.optionCardHeading}>Quiz</Text>
                            <Text style={DashboardStyle.optionBodyDescription}>
                                You have played total 55 quizzes last month!
                            </Text>
                            <IconButton className={OutlinePlaneButton} onPress={function (): void {
                                throw new Error('Function not implemented.')
                            }} icon={<View style={{ transform: [{ rotate: '180deg' }] }}>
                            <ArrowLeft height={20} width={20} fill={'black'} />
                          </View>} label={'Take Quiz'} pos={'right'}></IconButton>
                        </View>
                        <View style={DashboardStyle.option}>
                            <View style={DashboardStyle.optionHeader}>
                                <View style={{ height: 34, width: 34, borderRadius: 34, padding: 5, backgroundColor: '#D6E0FC' }}>
                                    <Image style={{ height: 25, width: 25, borderRadius: 34, padding: 10 }} source={require("../../../assets/svg/books.png")}></Image>
                                </View>
                                <View>
                                    <Text style={DashboardStyle.optionHeaderText}>18</Text>
                                    {/* <Text style={DashboardStyle.optionHeaderInfoText}>Subjects Taken</Text> */}
                                </View>
                            </View>
                            <Text style={DashboardStyle.optionCardHeading}>Exam Prep</Text>
                            <Text style={DashboardStyle.optionBodyDescription}>
                                You have played total 55 quizzes last month!
                            </Text>
                            <IconButton className={OutlinePlaneButton} onPress={function (): void {
                                moveToExploreExamPrepPage()
                            }} icon={<View style={{ transform: [{ rotate: '180deg' }] }}>
                            <ArrowLeft height={20} width={20} fill={'black'} />
                          </View>} label={'Exam Prep'} pos={'right'}></IconButton>
                        </View>
                    </View>
                </View>
                <View style={DashboardStyle.botBlock}>
                    <Text style={DashboardStyle.botHeading}>Start Learning with AI Chat</Text>
                    <Text style={DashboardStyle.botheadingInfo}>Your Personal Study Assistant 🚀</Text>
                    <View style={DashboardStyle.botBlockDesc}>
                        <Text>Chat With Ezy...</Text>
                        <View style={{flex: 1}}>
                            <IconButton className={PrimaryIconDefaultButton}
                                onPress={() => moveToExploreBotPage()} icon={<Send height={'20'} width={'20'} fill={'white'} />} label={'Get Started'} pos={'right'} backgroundColor={Colors.primary} />
                        </View>
                    </View>
                        <Image style={DashboardStyle.botGif} source={require("../../../assets/gifs/bot.gif")}></Image>
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