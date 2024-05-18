import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { ArrowIcon, ArrowLeft, Send, Sprit, Star, StreakCircle } from '../../components/common/SvgComponent/SvgComponent'
import { PrimaryDefaultButton, PrimaryIconDefaultButton, PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
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
import { LinearGradient } from 'expo-linear-gradient';


interface mcqType {
    mcqId: number,
    question: string,
    options: Array<string>,
    answer: string,
    explanation: string,
    selectedAnswer?: string
}

interface quizResponse {
    quizzes: [string],
    class: string
}

export const Dashboard = () => {
    const navigator = useNavigation();
    const [data, setData] = useState<ExamPrepQuizCardData[]>([]);
    const { user } = useUser();
    const [noOfQuiz, setNoOfQuiz] = useState(0);
    const [noOfExamPrep, setNoOfExamPrep] = useState(0);
    const [promptsForRepeatUser, setPromptsForRepeatUser] = useState<any>(null)
    const [lastChatQuestion, setLastChatQuestion] = useState("");
    const images: { [key: number]: NodeRequire } = {
        1: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f1.png'},
        2: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f2.png'},
        3: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f3.png'},
        4: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f4.png'},
        5: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f5.png'},
        6: {uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f6.png'},
      };

    useFocusEffect(
        React.useCallback(() => {
        // here we call api to update the data on home page
          console.log("hii")
        }, [])
      );

    useEffect(() => {
        AsyncStorage.setItem('user', JSON.stringify(user));
        getPendingQuiz().then((list) => {
            if (list && list.length) {
                list = list.map((item: any, index: number) => {
                    item.id = index;
                    item.title = item.chapterName;
                    item.practiceProgress = getPracticePercentage(item.mcqs)
                    return item;
                })
                setData(list)
            }
        })
        botTextForRepititiveUser();
    }, [])

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
                    const response: quizResponse[] = res.data.data;
                    response.map((exam: quizResponse) => {
                        if (exam.class == 'examPreparation') {
                            setNoOfExamPrep(exam.quizzes.length);
                        } else {
                            console.log(exam.quizzes.length)
                            setNoOfQuiz(exam.quizzes.length);
                        }
                        return exam;
                    })
                } else {
                    console.log("main", res.data);
                }
            })
    }
    const streak = () => { }

    const getPracticePercentage = (mcqIds: mcqType[]) => {
        let total = 0;
        mcqIds.forEach((item) => {
            if (item.selectedAnswer) total++;
        })
        return (total / mcqIds.length) * 100;
    }

    const moveToPracticeFlow = async (i: number) => {
        await AsyncStorage.setItem('quizType', 'practice');
        const quiz = data[i];
        navigator.navigate('Quiz' as never, { screen: 'QuizQuestionPages', params: quiz } as never);
    }

    const botTextForRepititiveUser = async () => {
        const lastQuestion = await AsyncStorage.getItem('lastChatQuestion')
        const lastChatSubject = await AsyncStorage.getItem('chatSubject');
        if (lastQuestion) setLastChatQuestion(lastQuestion);

        const RenderLastQuestion = () => {
            return (<View style={{}}>
                <Text style={{ display: 'flex', fontSize: 16, fontWeight: '500' }}>Your last question to Ezy was</Text>
                <Text style={DashboardStyle.promptText}>
                    {lastQuestion}
                    </Text>
            </View>
            )
        }

        const RenderLastSubject = () => {

        }

        const arr = [
            RenderLastQuestion,
            "You talked about {chapter name} in" + lastChatSubject + " with Ezy during your last chat."
        ]
        setPromptsForRepeatUser(arr[0])
        return arr;
    }

    const navigateToProfilePage = () => {
        navigator.navigate('Profile' as never);
        navigator.navigate('Profile' as never, { screen: 'EditProfile'} as never);
    }


    return (
        <View style={DashboardStyle.container}>
            {/* <View style={DashboardStyle.header}>
                <Image style={{ height: 50, width: 50 }} source={require("../../../assets/gifs/bot.gif")}></Image>
                <Text style={DashboardStyle.brand}>{Constants.BrandName}</Text>
            </View> */}
            <ScrollView style={DashboardStyle.body}>
                <View style={DashboardStyle.leaderboardHeader}>
                    <View style={DashboardStyle.leaderBoardSection}>
                        <TouchableOpacity
                         onPress={navigateToProfilePage} accessible={true} 
                         accessibilityLabel={user?.name ? `Profile picture of ${user.name}` : "Profile picture"} >
                        {user && user?.avatarId ? <Image accessible={true} accessibilityLabel={user?.name ? `Profile picture of ${user.name}` 
                        : "Profile picture"} style={DashboardStyle.avatarImage} source={{ uri: `https://d1n3r5qejwo9yi.cloudfront.net/assets/users/f${user.avatarId}.png`}} />
                            : <CircleInitials name={user?.name} size={40} />}
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '400', fontSize: 18, color: "#4A4A4A" }}>Hello! {'\n'}
                        <Text style={{ fontWeight: '600', fontSize: 18 }}>
                                {user?.name}
                            </Text>
                        </Text>
                    </View>
                </View>
                <View style={DashboardStyle.options}>
                    <View style={DashboardStyle.optionTitle}>
                        <Text style={DashboardStyle.boostYourKnowledge}>Boost Your Knowledge</Text>
                        <TouchableOpacity style={DashboardStyle.viewAllBlock} onPress={moveToExploreQuizPage}>
                            <Text style={DashboardStyle.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={DashboardStyle.optionsCard}>
                        <TouchableWithoutFeedback onPress={function (): void {
                                    moveToExploreQuizPage()
                                }}>
                        <View style={[DashboardStyle.option]}>
                            <View style={DashboardStyle.optionHeader}>
                                <Sprit height={'30'} width={'30'} fill={'red'} />
                                <View>
                                    {noOfQuiz != 0 && <Text style={DashboardStyle.optionHeaderText}>{noOfQuiz}</Text>}
                                    {/* <Text style={DashboardStyle.optionHeaderInfoText}>Quizzes</Text> */}
                                </View>
                            </View>
                            <Text style={DashboardStyle.optionCardHeading}>Quizzes</Text>
                            <Text style={DashboardStyle.optionBodyDescription}>
                                {noOfQuiz == 0 ? "Fortify your knowledge with our quizzes!" :
                                    `You have played ${noOfQuiz == 1 ? '': 'total'} ${noOfQuiz} ${noOfQuiz == 1 ? 'quiz in the': 'quizzes'} last month!`}
                            </Text>
                            {/* {<View style={{marginLeft: 10}}> */}
                                {/* <IconButton className={OutlinePlaneButton} onPress={function (): void {
                                    moveToExploreQuizPage()
                                }} icon={<View style={{ transform: [{ rotate: '180deg' }] }}>
                                <View style={DashboardStyle.circularDiv}>
                                    <ArrowLeft height={20} width={20} fill={'black'} />
                                </View>
                                </View>} label={'Take Quiz'} pos={'right'}></IconButton>                                 */}
                            {/* </View>} */}
                        </View>
                                </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={function (): void {
                                    moveToExploreExamPrepPage()
                                }}>
                            <View style={[DashboardStyle.option]}>
                                <View style={DashboardStyle.optionHeader}>
                                    <View style={{ height: 30, width: 30, borderRadius: 34, padding: 5, backgroundColor: '#D6E0FC' }}>
                                        <Image style={{ height: 20, width: 20, borderRadius: 34 }} source={require("../../../assets/svg/books.png")}></Image>
                                    </View>
                                    <View>
                                        {noOfExamPrep != 0 && <Text style={DashboardStyle.optionHeaderText}>{noOfExamPrep}</Text>}
                                        {/* <Text style={DashboardStyle.optionHeaderInfoText}>Subjects Taken</Text> */}
                                    </View>
                                </View>
                                <Text style={DashboardStyle.optionCardHeading}>Exam Preparation</Text>
                                <Text style={DashboardStyle.optionBodyDescription}>
                                    {noOfExamPrep == 0 ? "Ace your exams with our practice tests!" :
                                        "Keep Going! You're Doing Great!"}
                                </Text>
                                {/* {<View style={{marginLeft: 10}}><IconButton className={OutlinePlaneButton} onPress={function (): void {
                                    moveToExploreExamPrepPage()
                                }} icon={<View style={{ transform: [{ rotate: '180deg' }] }}>
                                    <View style={DashboardStyle.circularDiv}>
                                        <ArrowLeft height={20} width={20} fill={'black'} />
                                    </View>
                                </View>} label={'Continue'} pos={'right'}></IconButton>
                                </View>} */}
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <Text style={[DashboardStyle.boostYourKnowledge,{marginBottom: 10, fontWeight: '500'}]}>Solve any doubt</Text>
                <LinearGradient
                    colors={['#E3E8FF', 'rgba(255, 255, 254, 0.27)', '#C8D2FF']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: Math.cos(100 * Math.PI / 180), y: Math.sin(100 * Math.PI / 180) }}
                    locations={[0.0164, 0.4937, 1]}
                    style={DashboardStyle.botBlock}>
                    <View style={{ width: "80%" }}>
                        {!lastChatQuestion.length && <Text style={DashboardStyle.botHeading}>Start Learning with AI Chat</Text>}
                        {!lastChatQuestion.length && <Text style={DashboardStyle.botheadingInfo}>
                            Introducing to you - {"\n"}
                            Ezy Your Personal Study Buddy 🚀 
                        </Text>}
                    </View>
                        {lastChatQuestion && lastChatQuestion.length && <View style={{ width: "80%" }}>
                            {promptsForRepeatUser}
                    </View>}
                    <View style={DashboardStyle.botBlockDesc}>
                         <Text style={{fontSize: 16}}>Chat with Ezy</Text>
                         {/* <Text style={{fontSize: 16}}>Chat with Ezy</Text> */}
                        {/* <View style={{ flex: 1}}> */}
                            <TouchableOpacity style={DashboardStyle.botButton} onPress={() => moveToExploreBotPage()}>
                                <Text style={DashboardStyle.botButtonText}>{lastChatQuestion.length ? "Let's Continue " : 'Get Started'}</Text>
                                <Send height={'20'} width={'20'} fill={'white'} />
                            </TouchableOpacity>
                            {/* <IconButton className={PrimaryIconDefaultButton}
                                onPress={() => moveToExploreBotPage()} icon={<Send height={'20'} width={'20'} fill={'white'} />} label={lastChatQuestion.length ? "Let's Continue " : 'Get Started'} pos={'right'} backgroundColor={Colors.primary} /> */}
                        {/* </View> */}
                    </View>
                    <Image style={DashboardStyle.botGif} 
                        source={{ uri: "https://d1n3r5qejwo9yi.cloudfront.net/assets/bot.gif" }} />
                </LinearGradient>
                {/* <Text style={{ color: Colors.primary, width: "80%" }}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text> */}
                {data && data.length > 0 ? <View style={{ marginTop: 10 }}>
                    <View style={[DashboardStyle.continuePractice]}>
                        <Text style={[DashboardStyle.boostYourKnowledge]}>Continue practice </Text>
                    </View>
                    <View style={DashboardStyle.pendingQuizzesList}>
                        {data && data.map((item, index) => (
                            <ExamPrepQuizCard key={index} {...item} onCardClick={(i) => { moveToPracticeFlow(i) }} />
                        ))}
                    </View>
                </View>
                    :
                    <>
                    <Text style={[DashboardStyle.boostYourKnowledge, { marginTop: 12 }]}>Continue Practice</Text>
                    <ContinutPractice onPress={() => {
                        moveToExploreExamPrepPage()
                    }} />
                    </>
                }
            </ScrollView>
        </View>
    )
}