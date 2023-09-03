import React from 'react'
import { Image, Text, View } from 'react-native'
import { DashboardStyle } from './DashboardStyle'
import { Button } from '../../components/common/ButttonComponent/Button'
import { Sprit, Star } from '../../components/common/SvgComponent/SvgComponent'
import { PrimarySmallButton, defaultButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { ProgressBar } from '../../components/home/components/ProgressBar'

export const Dashboard = () => {
  return (
    <View style={DashboardStyle.container}>
        <View style={DashboardStyle.header}>
            <View >
                <Text style={DashboardStyle.hello}>
                    Hello,
                </Text>
                <View style={DashboardStyle.profilePhoto}>

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
                    <Button label={"View"} className={PrimarySmallButton}  disabled={false} onPress={function (): void {
                        throw new Error('Function not implemented.')
                    } }></Button>
                </View>
            </View>
            <View style={DashboardStyle.leaderBoardBody}>
                  <Star height={'60'} width={'60'} fill={'green'} ></Star>
                  <View style={DashboardStyle.leaderBoardBodyDetails}>
                        <Text style={DashboardStyle.leaderBoardBodyDetailsLevel}>Level 1</Text>
                        <Text style={DashboardStyle.leaderBoardBodyPoints}>500 Points to next level</Text>
                        <ProgressBar perc={10} />
                  </View>

            </View>
            <View style={DashboardStyle.options}>
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
                    <Button label={"Take Quiz"} className={defaultButton} disabled={false} onPress={function (): void {
                          throw new Error('Function not implemented.')
                      } }></Button>
                </View>
                <View style={DashboardStyle.option}>
                    <View style={DashboardStyle.optionHeader}>
                        <Image source={require("../../../assets/svg/books.png")}></Image>
                        <Text style={DashboardStyle.optionHeaderText}>55</Text>
                    </View>
                    <Text style={DashboardStyle.optionBodyDescription}>
                        You have played total 55 quizzes last month!
                    </Text>
                    <Button label={"Take Quiz"} className={defaultButton} disabled={false} onPress={function (): void {
                          throw new Error('Function not implemented.')
                      } }></Button>
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
                          } }></Button>
                    </View>
                    <Image style={DashboardStyle.botGif} source={require("../../../assets/gifs/bot.gif")}></Image>
                </View>
            </View>
        </View>
    </View>
  )
}