import React, { useEffect, useRef, useState } from 'react'
import { BackHandler, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ArrowLeft, NewBackButton, ShareIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ShowAnswer, TryAgain} from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Answers, questionWithTime } from './QuizQuestionsPage';
import { useNavigation, useRoute } from '@react-navigation/native';
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import { useUser } from '../../context/UserContext';
import { httpClient } from '../../services/HttpServices';
import { LeaderboardEntry } from '../Profile/viewLeadboard';


type Props = {
    noOfQuestions: number,
    noOfCorrectAnswers: number
}

export const QuizResult = () => {
    const { user } = useUser();
    const props: any = {};
    const imageRef = useRef();
    const [retryData, setRetryData] = useState();
    const [result, setResult] = useState([
        {
            label: "Total Score",
            value: `${props.noOfCorrectAnswers}/${props.noOfQuestions}`
        },
        {
            label: "Total Questions",
            value: `${props.noOfQuestions}`
        },
        {
            label: "Incorrect",
            value: `${props.noOfCorrectAnswers}`
        },
        {
            label: "Correct",
            value: `${props.noOfQuestions - props.noOfCorrectAnswers}`
        },
        {
            label: "Unattempted",
            value: `${props.noOfQuestions - props.noOfCorrectAnswers}`
        }
    ]);
    const route = useRoute()
    const navigator = useNavigation();
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const [userRankScore, setUserRankScore] = useState<LeaderboardEntry | undefined>();

    if (status === null) {
        requestPermission();
      }
    
    useEffect(() => {
        getData();
        getUserRank();
    }, [])

    const getUserRank = () => {
        httpClient.get(`leaderboard/${user?.userId}`)
        .then((response) => {
            console.log(response.data);
            const list: Array<LeaderboardEntry> = response.data;
            setUserRankScore(list.find((item) =>  item.studentId == user?.userId)); 
            console.log(userRankScore)
        }).catch((err) => {
            console.log("error ",err);
        })
    }

    useEffect(() => {
        const backAction = () => {
          if (navigator.isFocused()) {
            return true; // Returning true prevents the default back action
          }
          return false; // Allow the default back action on other screens
        };
    
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);
    
        return () => backHandler.remove(); // Remove the event listener when the component unmounts
      }, [navigator]);

    async function getData() {
        try {
            let r: any = route.params;
            let retry: any = {};
            if(r) retry['time'] = r.quizQuestionList.length * 15;
            
            const updatedQuestions = r.quizQuestionList.map(question => {
                // Destructure the object and exclude the 'selectedAnswer' property
                const { selectedAnswer, ...rest } = question;
                return rest; // Return the modified object without 'selectedAnswer'
            });

            retry['mcqs'] = cleanQuizContentAndRetryQuiz(updatedQuestions);

            setRetryData(retry);

            const data = JSON.parse((await AsyncStorage.getItem('questions')) as string); 
            const UserAnswerList = data && (data.quizQuestionList) ? data.quizQuestionList : []
            const score = calculateScore(UserAnswerList);
            const totalMarks = UserAnswerList.length * 10;
            const updatedResult = [...result];
            const unanswered = calculateUnanswered(UserAnswerList);

            // Update specific values in the copied array
            updatedResult[0].value = `${score}/${totalMarks}`;
            updatedResult[1].value = `${UserAnswerList.length}`;
            updatedResult[2].value = `${(UserAnswerList.length - score / 10)}`;
            updatedResult[3].value = `${score / 10}`;
            updatedResult[4].value = `${unanswered}`;
            setResult(updatedResult);
        } catch (error) {
            console.error('Error storing data:', error);
        }
    }

    function showAnswersScreen() {
        navigator.navigate('QuizQuestionAnswersReview' as never)
    }

    const cleanQuizContentAndRetryQuiz = (mcqs: any[]) => {
            return mcqs.map((mcq) => {
                delete mcq.selectedAnswer;
                return mcq;
            })
    }

    function retryQuiz() {
        console.log(retryData);
        // changing key name quizQuestionList to mcqs
        navigator.navigate('QuizQuestionPages' as never, retryData as never)
    }

    const calculateUnanswered = (answerList: Answers) => {
        let unanswered = 0;
        answerList.forEach((answer) => {
            if (!answer.selectedAnswer) unanswered += 1;
        })
        return unanswered;        
    }

    const calculateScore = (answerList: Answers) => {
        let score = 0;
        answerList && answerList.forEach((answer) => {
            if (answer.answer == answer.selectedAnswer)
                score += 10;
        })
        return score;
    }

    const onSaveImageAsync = async () => {
        try {
          const localUri = await captureRef(imageRef, {
            height: 440,
            quality: 1,
          });
    
          await MediaLibrary.saveToLibraryAsync(localUri);
          if (localUri) {
            alert("Saved!");
          }
        } catch (e) {
        }
      };

      const onBack = () => {
        navigator.reset({
            index: 0,
            routes: [{ name: 'QuizHomepage' } as never] // Replace 'Home' with the actual name of your main screen
          });
      }

    return (
        <View ref={imageRef} collapsable={false} style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={() => onBack()} style={styles.backButton}>
                        <NewBackButton height={'30'} width={'30'} fill={'white'} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Test Score</Text>
                    <TouchableOpacity onPress={onSaveImageAsync} style={[styles.shareButton, { position: "absolute", right: 10 }]}>
                        <ShareIcon height={'20'} width={'20'} fill={Colors.primary} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView style={{flex: 1, paddingVertical: 2}}>
            <View style={styles.scoreContainer}>
                <View style={styles.scoreCard}>
                    <View style={{flex: 2}}>
                        <Text style={styles.userRank}>#{userRankScore?.rank}</Text>
                    </View>
                    <View style={{flex: 8}}>
                        <Text style={styles.userName}>{user?.name}</Text>
                        <Text style={styles.userSchool}>{user?.school}</Text>
                    </View>
                    <View style={{flex: 4}}>
                        <Text style={styles.score}>{userRankScore?.score}</Text>
                        <Text style={styles.overAllScore}>Overall Score</Text>
                    </View>
                </View>
            </View>
            <View>
                <ImageBackground source={require('../../../assets/gifs/celebrate.gif')} style={styles.imageSection}>
                    <Image style={styles.image} source={require('../../../assets/png/trophy.png')}></Image>
                </ImageBackground>
            </View>
            <View style={styles.cardsContainer}>
                {result.slice(0,2).map((item, index) => (
                    <View style={styles.marksCards} key={index}>
                        <Text style={[
                            styles.values,
                            item.label === 'Wrong Questions' && styles.redText,
                            item.label === 'Right Questions' && styles.greenText
                        ]}>{item.value}</Text>
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.cardsContainerBottom1}>
            {result.slice(2,5).map((item, index) => (
                    <View style={styles.marksCards1} key={index}>
                        <Text style={[
                            styles.values,
                            item.label === 'Wrong Questions' && styles.redText,
                            item.label === 'Right Questions' && styles.greenText
                        ]}>{item.value}</Text>
                        <Text style={styles.label}>{item.label}</Text>
                    </View>
                ))}                        
            </View>
            <View style={styles.buttonSection}>
                <Button label={"View Solutions"} className={ShowAnswer} disabled={false} onPress={showAnswersScreen} />
                <Button label={"Try Again"} className={TryAgain} disabled={false} onPress={retryQuiz} />
            </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
    },
    title: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.black_01
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1/2,
        borderColor: Colors.primary
    },
    scoreContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 12,
        alignSelf: 'center',
        width: "90%",
        position: 'relative',
        backgroundColor: Colors.primary,
        transform: [{ rotate: '3deg' }],
        height: 54,
        borderRadius: 20
    },
    scoreCard: {
        flexDirection: 'row',
        backgroundColor: Colors.white,
        borderRadius: 20,
        transform: [{ rotate: '-3deg' }],
        flex: 1,
        borderColor: "#006B7F8F",
        borderWidth: 0.5,
        justifyContent: 'space-between',
        padding: 4,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    userRank: {
        fontSize: 18,
        fontWeight: `600`,
        fontStyle: 'italic'
    },
    userName: {
        fontSize: 16,
        fontWeight: `400`
    },
    userSchool: {
        fontSize: 14,
        fontWeight: '400',
        color: "#626262"
    },
    score: {
        textAlign: 'center',
        fontSize: 22,
        color: Colors.primary
    },
    overAllScore: {
        fontSize: 16,
        color: "#131313"
    },
    imageSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 250,
    },
    image: {
        height: 200,
        width: 200
    },
    cardsContainer: {
        gap: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    cardsContainerBottom: {
        gap: 10,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    cardsContainerBottom1: {
        marginTop: 18,
        gap: 0,
        paddingHorizontal: 20,
        flexDirection: 'row',
    },
    marksCards: {
        width: "50%",
        padding: 24,
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: Colors.secondary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2
    },
    marksCards1: {
        width: "33%",
        padding: 10,
        justifyContent: 'center',
        // borderRadius: 12,
        backgroundColor: Colors.secondary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2
    },
    label: {
        color: "#131313",
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center'
    },
    values: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.primary,
        textAlign: 'center'
    },
    redText: {
        color: 'red'
    },
    greenText: {
        color: 'green'
    },
    buttonSection: {
        display: 'flex',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    }
});