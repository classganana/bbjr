import React, { useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { Sprit, Star } from '../../components/common/SvgComponent/SvgComponent'
import { PrimaryDefaultButton, PrimaryDefaultCircleButton, PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation } from '@react-navigation/native'
import { Constants } from '../../constants/constants'
import { Colors } from '../../styles/colors'
import { ExamPrepQuizCard, ExamPrepQuizCardData } from '../../components/quiz/ExamPrepQuizCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const Dashboard = () => {
    const navigator = useNavigation();


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
        const localQuiz = await AsyncStorage.getItem('localQuizzes');
        if(localQuiz) return JSON.parse(localQuiz);
    }   

    useEffect(() => {
        getPendingQuiz().then((list) => {
            console.log(list);
            list = list.map((item: any) => {
                item.title = (item.screenPage == "examPreparation") ? item.chapterName: item.name;
                return item;
            })
            setData(list)
        })
    }, [])

    const [data, setData] = useState<ExamPrepQuizCardData[]>([]);


    return (
        <View style={DashboardStyle.container}>
            <View style={DashboardStyle.header}>
                <Image style={{ height: 50, width: 50 }} source={require("../../../assets/gifs/bot.gif")}></Image>
                <Text style={DashboardStyle.brand}>{Constants.BrandName}</Text>
            </View>
            <ScrollView style={DashboardStyle.body}>
                <View style={DashboardStyle.leaderboardHeader}>
                    <Text style={DashboardStyle.leaderboardHeaderText}>
                        Leaderboard
                    </Text>
                    <View>
                        <Button label={"View"} className={PrimarySmallButton} disabled={false} onPress={function (): void {
                            throw new Error('Function not implemented.')
                        }}></Button>
                    </View>
                </View>
                {/* <View style={DashboardStyle.leaderBoardBody}>
                    <Star height={'60'} width={'60'} fill={'green'} ></Star>
                    <View style={DashboardStyle.leaderBoardBodyDetails}>
                        <Text style={DashboardStyle.leaderBoardBodyDetailsLevel}>Level 1</Text>
                        <Text style={DashboardStyle.leaderBoardBodyPoints}>500 Points to next level</Text>
                        <View style={{ paddingTop: 8 }}>
                            <ProgressBar perc={140} label={`140 point earned`} />
                        </View>
                    </View>
                </View> */}
                <View style={DashboardStyle.options}>
                    <View style={DashboardStyle.optionTitle}>
                        <Text>Boost Your Knowledge</Text>
                        <TouchableOpacity style={DashboardStyle.viewAllBlock}>
                            <Text style={DashboardStyle.viewAllText}>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={DashboardStyle.optionsCard}>
                        <View style={DashboardStyle.optionCard}>
                            <Text style={DashboardStyle.optionCardHeading}>Quiz</Text>
                            <View style={DashboardStyle.option}>
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
                        </View>
                        <View style={DashboardStyle.optionCard}>
                            <Text style={DashboardStyle.optionCardHeading}>Exam Prep</Text>
                            <View style={DashboardStyle.option}>
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
                                <Button label={"Explore"} className={PrimaryDefaultButton} disabled={false} onPress={() => moveToExploreExamPrepPage()}></Button>
                            </View>
                        </View>
                    </View>
                </View>


                <View style={DashboardStyle.botBlock}>
                    <Text style={DashboardStyle.botHeading}>Start Learning with AI Chat 🚀</Text>
                    <Text>Your Personal Study Assistant</Text>
                    <View style={DashboardStyle.botBlockDesc}>
                        <View>
                            <Button label={"Lets go"} className={PrimaryDefaultCircleButton} disabled={false} onPress={() => moveToExploreBotPage()}></Button>
                        </View>
                        <Image style={DashboardStyle.botGif} source={require("../../../assets/gifs/bot.gif")}></Image>
                    </View>
                </View>
                <Text style={{ color: Colors.primary, width: "80%" }}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text>
                <View style={DashboardStyle.leaderBoardSection}>
                    <Text>#1</Text>
                    <Image style={{ height: 40, width: 40 }} source={{ uri: "https://d1n3r5qejwo9yi.cloudfront.net/assets/female.png" }} />
                    <View style={{ flex: 1 }}>
                        <Text>Name: Ayush</Text>
                        <Text>College Name/School</Text>
                    </View>
                    <Text>
                        1526
                    </Text>
                </View>
                <View>
                    <View style={DashboardStyle.continuePractice}>
                        <Text>Continue practice </Text>
                        <TouchableOpacity>
                            <Text style={DashboardStyle.explore}>
                                Explore
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                    <View>
                    {data && data.map((item, index) => (
                        <ExamPrepQuizCard key={index} {...item} onCardClick={(i) => { console.log(i) }} />
                    ))}
                    </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}