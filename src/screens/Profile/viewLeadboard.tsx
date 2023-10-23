import React, { useEffect, useState } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ExploreButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { httpClient } from '../../services/HttpServices';
import { useUser } from '../../context/UserContext';

export interface LeaderboardEntry {
    name: string;
    rank: number;
    score: number;
    studentId: string;
  }
  

const ViewLeadboard = () => {
    const {user} = useUser()
    const HighScorelabels = Array.from({ length: 5 }, (_, index) => ({
        rollNumber: `#${index + 1}`,
        title: `Student Name`,
        score: 1523,
        school: `School/College Name`,
    }));
    const Ranklabel = Array.from({ length: 5 }, () => ({
        title: `Student Name`,
        score: 300,
        school: `School/College Name`,
    }));

    const [userRank, setUserRank] = useState<Array<LeaderboardEntry>>()
    const [leaderBoard, setLeaderBoard] = useState<Array<LeaderboardEntry>>()

    useEffect(() => {
            getUserRank();
            getLoeaderBoard();
    },[])

    const getUserRank = () => {
        httpClient.get(`leaderboard/${user?.userId}`)
        .then((response) => {
            console.log(response.data);
            setUserRank(response.data)
        }).catch((err) => {
            console.log("error while creating pending account",err);
        })
    }

    const getLoeaderBoard = () => {
        httpClient.get(`leaderboard`)
        .then((response) => {
            console.log(response.data);
            setLeaderBoard(response.data);
        }).catch((err) => {
            console.log("error while creating pending account",err);
        })
    }

    return (
        <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.heading}>
                        <View style={styles.backButton}>
                        <ArrowLeft height={25} width={25} fill={'black'} />
                        </View>
                        <Text style={styles.headingTitle}>View leaderboard</Text>
                    </View>
                </View>
                <ScrollView style={styles.Body}>
                    <View style={styles.DetailContainer}>
                        <Text style={styles.BodyTitle}>Leaderboard</Text>
                        <View style={styles.BodyContainer}>
                            <Text style={styles.BodyText}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text>
                            <Button label={'Explore'} className={ExploreButton} disabled={false} onPress={() => { }} />
                        </View>
                        <View style={styles.HighscoreCard}>
                            <View style={styles.HighScoreTitle}>
                                <Text style={styles.Titlescore}># High Scores</Text>
                                <Text style={styles.score}>Score</Text>
                            </View>
                            {leaderBoard?.map((HighestScoreLabel, index) => (
                                <View key={index} style={styles.rankProfileCard}>
                                    <View style={styles.ScoreInnerCard}>
                                        <Text style={styles.rollNumber}>{HighestScoreLabel.rank}</Text>
                                        <View style={styles.ProfileImage} />
                                        <View>
                                            <Text style={styles.StudCard}>{HighestScoreLabel.name}</Text>
                                            <Text style={styles.SchoolCard}>{HighestScoreLabel.score}</Text>
                                        </View>
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
                            {userRank?.map((RankLabel, index) => (
                                <View style={styles.rankScoreCard} key={index}>
                                    <View style={styles.ScoreInnerCard}>
                                        <View style={styles.ProfileImage} />
                                        <View>
                                            <Text style={styles.StudCard}>{RankLabel.name}</Text>
                                            <Text style={styles.SchoolCard}>{RankLabel.rank}</Text>
                                        </View>
                                    </View>
                                    <Text>{RankLabel.score}</Text>
                                </View>
                            ))}
                        </View>
                    </View >
                </ScrollView>
            </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    header: {
        height: 66,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    heading: {
        borderRadius:20,
        borderColor:Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    backButton: {
        height: 32,
        width: 32,
        borderRadius: 45,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headingTitle: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 18,
    },
    Body: {
        flex: 1,
        height: '100%',
        backgroundColor: Colors.white    
    },
    BodyTitle: {
        color: Colors.black_01,
        fontSize: 18,
        fontWeight: '500',
        paddingHorizontal: 15,
        paddingVertical: 13,
    },
    DetailContainer: {
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.white,
        paddingHorizontal: 19,
        gap: 10,
    },
    BodyContainer: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 9,
        backgroundColor: Colors.lemon_yellow,
        borderRadius: 8,
        justifyContent: 'center',
        alignSelf: 'center',
        gap: 6,
    },
    BodyText: {
        width: '75%',
        fontSize: 13,
        fontWeight: '500',
        color: Colors.primary,
    },
    HighscoreCard: {
        borderRadius: 10,
        backgroundColor: 'rgba(0, 107, 127, 0.05)',
        gap: 10,
        paddingHorizontal: 9,
        paddingBottom: 10,
    },
    rollNumber: {
        fontSize: 14,
        fontStyle: 'italic',
        fontWeight: '600',
    },
    rankProfileCard: {
        paddingHorizontal: 14,
        paddingVertical: 4,
        borderRadius: 10,
        backgroundColor: Colors.white,
        shadowColor: 'rgba(0, 0, 0, 0.1)',
        shadowOpacity: 3,
        shadowRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    HighScoreTitle: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: 'space-between',
    },
    Titlescore: {
        fontSize: 14,
        fontWeight: '600',
        paddingVertical: 10,
    },
    ScoreInnerCard: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    },
    score: {
        paddingVertical: 10,
    },
    StudCard: {
        fontSize: 12,
        fontWeight: '500',
        paddingVertical: 4,
    },
    SchoolCard: {
        fontSize: 10,
        fontWeight: '500',
    },
    ProfileImage: {
        height: 40,
        width: 40,
        borderRadius: 50,
        backgroundColor: Colors.gray_07,
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
        borderRadius: 3,
        borderWidth: 0.1,
        borderColor: Colors.primary,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 15,
        paddingHorizontal: 15,
        paddingVertical: 5,
        backgroundColor: Colors.primary,
    },
});
export default ViewLeadboard;