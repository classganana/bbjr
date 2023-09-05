import React from 'react'
import { Image, Text, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { Sprit, Star } from '../../components/common/SvgComponent/SvgComponent'
import { LoginButton, PrimaryDefaultButton, PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { ProgressBar } from '../../components/home/components/ProgressBar'
import { useNavigation } from '@react-navigation/native'

export const Dashboard = () => {
    const navigator = useNavigation();

    const moveToExploreQuizPage = () => {
        navigator.navigate('Quiz' as never);
    }


    return (
        <View style={DashboardStyle.container}>
            <View style={DashboardStyle.header}>
                <View >
                    <Text style={DashboardStyle.hello}>
                        Hello,
                    </Text>
                    <View style={DashboardStyle.profilePhoto}>
                        <Image style={{ height: 50, width: 50 }} source={{ uri: "https://d1n3r5qejwo9yi.cloudfront.net/assets/female.png" }} />

                    </View>
                </View>
                <View style={DashboardStyle.userDetails}>
                    <Text style={DashboardStyle.userName}>
                        Nilay Dixit
                    </Text>
                    <Text style={DashboardStyle.userOtherDetails}>
                        Class VII, University of ...view more
                    </Text>
                </View>
            </View>
            <View style={DashboardStyle.body}>
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
                <View style={DashboardStyle.leaderBoardBody}>
                    <Star height={'60'} width={'60'} fill={'green'} ></Star>
                    <View style={DashboardStyle.leaderBoardBodyDetails}>
                        <Text style={DashboardStyle.leaderBoardBodyDetailsLevel}>Level 1</Text>
                        <Text style={DashboardStyle.leaderBoardBodyPoints}>500 Points to next level</Text>
                        <View style={{ paddingTop: 8 }}>
                            <ProgressBar perc={140} />
                        </View>
                    </View>

                </View>
                <View style={DashboardStyle.options}>
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
                            <Button label={"Explore"} className={PrimaryDefaultButton} disabled={false} onPress={function (): void {
                                throw new Error('Function not implemented.')
                            }}></Button>
                        </View>
                    </View>
                </View>
                <View>
                    <Text style={DashboardStyle.botHeading}>Start Learning with AI Chat</Text>
                    <View style={DashboardStyle.botBlock}>
                        <View>
                            <Text>Your Assistant is here</Text>
                            <Text>Ask anything 🚀</Text>
                            <Button label={"Lets go"} className={defaultButton} disabled={false} onPress={function (): void {
                                throw new Error('Function not implemented.')
                            }}></Button>
                        </View>
                        <Image style={DashboardStyle.botGif} source={require("../../../assets/gifs/bot.gif")}></Image>
                    </View>
                </View>
            </View>
        </View>
    )
}