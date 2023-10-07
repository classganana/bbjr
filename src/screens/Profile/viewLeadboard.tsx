import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ExitButton } from '../../components/common/ButttonComponent/ButtonStyles';


const viewLeadboard = () => {
    const HighScorelabels = Array.from({ length: 4 }, (_, index) => ({
        rollNumber: index + 1,
        title: `Student Name`,
        score: 5234,
        school: `School/College Name`,
    }));
    const Ranklabel = Array.from({ length: 5 }, () => ({
        title: `Student Name`,
        score: 521,
        school: `School/College Name`,
    }));

    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.heading}>
                        <View style={styles.backButton}>
                            <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                        </View>
                        <Text style={styles.headingTitle}>view leadboard</Text>
                    </View>
                </View>
                <View style={styles.DetailContainer}>
                    <Text style={styles.BodyTitle}>Leadboard</Text>
                    <View style={styles.BodyContainer}>
                        <Text style={styles.BodyText}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text>
                        <Button label={'Explore'} className={ExitButton} disabled={false} onPress={function (): void { }} />
                    </View>
                    <View style={styles.HighscoreCard} >
                        <View style={styles.HighScoreTitle}>
                            <Text style={styles.Titlescore}># High Scores</Text>
                            <Text style={styles.score}>Score</Text>
                        </View>
                        {HighScorelabels.map((HighestScoreLabel, index) => (
                            <View style={styles.rankProfileCard}>
                                <Text>{HighestScoreLabel.rollNumber}</Text>
                                <View style={styles.ProfileImage} />
                                <View>
                                    <Text>{HighestScoreLabel.title}</Text>
                                    <Text>{HighestScoreLabel.school}</Text>
                                </View>
                                <Text>{HighestScoreLabel.score}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={styles.RankCard}>
                        <View style={styles.HighScoreTitle}>
                            <Text style={styles.Titlescore}>Rank</Text>
                            <Text style={styles.score}>Score</Text>
                        </View>
                        {Ranklabel.map((RankLabel, index) => (
                            <View style={styles.rankScoreCard}>
                                <View style={styles.ProfileImage} />
                                <View>
                                    <Text>{RankLabel.title}</Text>
                                    <Text>{RankLabel.school}</Text>
                                </View>
                                <Text>{RankLabel.score}</Text>

                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexShrink: 0,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    headingTitle: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 18,
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    BodyTitle: {
        color: Colors.black_01,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.3,
        paddingHorizontal: 15,
        paddingVertical: 13,
    },
    DetailContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.white,
        paddingHorizontal: 19,
        gap: 6
    },
    BodyContainer: {
        display: 'flex',
        backgroundColor: Colors.lemon_yellow,
        borderRadius: 8,
        flexDirection: 'row',
        paddingHorizontal:13,
        paddingVertical:9,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    BodyText: {
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 15,
        color: Colors.primary,
    },
    HighscoreCard: {
        borderRadius: 10,
        backgroundColor: 'rgba(0, 107, 127, 0.05)',
        gap: 6,
        paddingHorizontal: 10,
    },
    rankProfileCard: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        shadowRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HighScoreTitle: {
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        display: 'flex',
        flexDirection: 'row'
    },
    Titlescore: {
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 18,
        paddingVertical: 10,
    },
    score: {
        paddingVertical: 10,
        // top: 15,
        // paddingHorizontal: 15,
    },
    ProfileImage: {
        height: 50,
        width: 50,
        borderRadius: 50,
        backgroundColor: Colors.gray_07
    },
    RankCard: {
        borderRadius: 10,
        gap: 6,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    rankScoreCard: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10,
        backgroundColor: Colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 1,
        shadowRadius: 4,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
export default viewLeadboard;