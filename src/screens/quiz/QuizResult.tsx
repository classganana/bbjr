import React, { useEffect, useState } from 'react'
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ArrowLeft, ShareIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, OutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Answers } from './QuizQuestionsPage';
import { useNavigation } from '@react-navigation/native';

type Props = {
    noOfQuestions: number,
    noOfCorrectAnswers: number
}

export const QuizResult = (props: Props) => {
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
            label: "Wrong Questions",
            value: `${props.noOfCorrectAnswers}`
        },
        {
            label: "Right Questions",
            value: `${props.noOfQuestions - props.noOfCorrectAnswers}`
        },
        {
            label: "Unanswered Questions",
            value: `${props.noOfQuestions - props.noOfCorrectAnswers}`
        }
    ]);

    const navigator = useNavigation();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        try {
            const data = JSON.parse((await AsyncStorage.getItem('questions')) as string); 
            const UserAnswerList = data.quizQuestionList
            const score = calculateScore(UserAnswerList);
            const totalMarks = UserAnswerList.length * 10;
            const updatedResult = [...result];
            console.log(UserAnswerList);
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

    const calculateUnanswered = (answerList: Answers) => {
        let unanswered = 0;
        answerList.forEach((answer) => {
            if (!answer.selectedAnswer) unanswered += 1;
        })
        return unanswered;        
    }

    const calculateScore = (answerList: Answers) => {
        let score = 0;
        answerList.forEach((answer) => {
            if (answer.answer == answer.selectedAnswer)
                score += 10;
        })
        return score;
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <ArrowLeft height={'30'} width={'30'} fill={'white'}></ArrowLeft>
                    </View>
                    <View style={[styles.shareButton, { position: "absolute", right: 10 }]}>
                        <ShareIcon height={'20'} width={'20'} fill={Colors.primary} />
                    </View>
                </View>
            </View>
            <ImageBackground source={require('../../../assets/gifs/celebrate.gif')} style={styles.imageSection}>
                <Image style={styles.image} source={require('../../../assets/png/trophy.png')}></Image>
            </ImageBackground>
            <View style={styles.cardsContainer}>
                {result.slice(0,2).map((item, index) => (
                    <View style={styles.marksCards} key={index}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={[
                            styles.values,
                            item.label === 'Wrong Questions' && styles.redText,
                            item.label === 'Right Questions' && styles.greenText
                        ]}>{item.value}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.cardsContainerBottom}>
            {result.slice(2,5).map((item, index) => (
                    <View style={styles.marksCards} key={index}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={[
                            styles.values,
                            item.label === 'Wrong Questions' && styles.redText,
                            item.label === 'Right Questions' && styles.greenText
                        ]}>{item.value}</Text>
                    </View>
                ))}                        
            </View>
            <View style={styles.buttonSection}>
                <Button label={"Show Answers"} className={OutlineButton} disabled={false} onPress={showAnswersScreen} />
                <Button label={"Play Again"} className={LoginButton} disabled={false} onPress={function (): void {}} />
            </View>

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
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: Colors.primary,
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
    imageSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
        // width: "100%"
    },
    image: {
        height: 200,
        width: 200
    },
    cardsContainer: {
        gap: 10,
        paddingHorizontal: 20,
        flexDirection: 'row'
    },
    cardsContainerBottom: {
        gap: 10,
        paddingHorizontal: 20,
    },    
    marksCards: {
        display: 'flex',
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: '#F2F7F8',
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
        color: "#757575",
        fontSize: 16,
        fontWeight: '500'
    },
    values: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.black_01
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
