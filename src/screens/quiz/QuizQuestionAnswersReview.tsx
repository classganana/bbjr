import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../styles/colors';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { DownArrow } from '../../components/common/SvgComponent/SvgComponent';
import QuestionComponent from '../../components/quiz/QuestionComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';
import QuestionReviewComponent from '../../components/quiz/QuestionReviewComponent';

type Question = {
    question: string;
    options: string[];
    answer: string;
    selectedAnswer?: string;
}

export const QuizQuestionAnswerReview = () => {
    const questionScrollViewRef = useRef<ScrollView | null>(null);
    const [quizQuestionList, setQuizQuestionList] = useState<Question[]>([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const navigation = useNavigation()
    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        currentQuestion = quizQuestionList[currentQuestionIndex];
    }, [quizQuestionList, currentQuestionIndex]);

    const getData = async () => {
        try {
            const userAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) || '[]');
            setQuizQuestionList(userAnswerList.quizQuestionList);
        } catch (error) {
            console.error('Error retrieving data:', error);
        }
    };

    const handleSelectOption = (selectedOption: string) => {
        setQuizQuestionList((prevList) => {
            const updatedList = [...prevList];
            updatedList[currentQuestionIndex].selectedAnswer = selectedOption;
            return updatedList;
        });
    };

    const navigateToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestionList.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            scrollToNextQuestion();
        } else {
            navigation.navigate('QuizHomepage' as never);
        }
    };

    const scrollToNextQuestion = async () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const scrollX = nextQuestionIndex * 40; // Adjust this value based on your layout
        if (questionScrollViewRef.current) {
            questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        }
        try {
            await AsyncStorage.setItem('questions', JSON.stringify(quizQuestionList));
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    let currentQuestion = quizQuestionList[currentQuestionIndex];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View>
                        <Text style={styles.headingTitle}>Test</Text>
                        <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.questionInfo}>
                    <View style={styles.questionInfoDropDown}>
                        <Text style={styles.questionInfoText}>
                            Question {currentQuestionIndex + 1}/{quizQuestionList.length}
                        </Text>
                        <DownArrow height={'20'} width={'20'} fill={'black'} />
                    </View>
                </View>
                <ScrollView ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
                    <View style={styles.questionNumbers}>
                        {quizQuestionList.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.questionNumber,
                                    quizQuestionList[index].answer == quizQuestionList[index].selectedAnswer  && { backgroundColor: '#4BAE4F'},
                                    quizQuestionList[index].answer != quizQuestionList[index].selectedAnswer  && { backgroundColor: 'red'},
                                    currentQuestionIndex === index && styles.activeQuestion,
                                ]}
                                onPress={() => navigateToQuestion(index)}
                            >
                                <Text style={styles.questionNumberText}>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                {currentQuestion && (
                    <QuestionReviewComponent
                        isResult={true}
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        selectedAnswer={currentQuestion.selectedAnswer}
                        correctAnswer={currentQuestion.answer}
                        onSelectOption={handleSelectOption}
                    />
                )}
                </ScrollView>
                <View style={styles.nextQuizButton}>
                    <Button
                        label={
                            currentQuestionIndex === quizQuestionList.length - 1
                                ? 'Exit'
                                : 'Next Question'
                        }
                        className={LoginButton}
                        disabled={false}
                        onPress={navigateToNextQuestion}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F7F8",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    questionNumbersScroll: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 16,
        maxHeight: 50,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F2F7F8',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
    },
    headingTitle: {
        color: Colors.primary,
        fontWeight: "500",
        fontSize: 14,
    },
    headingInfo: {
        fontWeight: '500',
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    timerBlock: {
        display: 'flex',
        flexDirection: 'row',
        right: 10,
    },
    timer: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 3,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    timerText: {
        marginTop: 4,
        textAlign: 'center',
        color: "#525252",
        fontSize: 12,
    },
    questionNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 10,
        borderBottomWidth: 1 / 4,
    },
    questionNumber: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#D4D4D4',
        marginHorizontal: 5,
    },
    questionNumberText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    activeQuestion: {
        backgroundColor: Colors.primary,
        color: Colors.white,
    },
    nextQuizButton: {
        width: "90%",
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 15,
        elevation: 2,
    },
    questionInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
    },
    questionInfoDropDown: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    questionInfoText: {
        fontSize: 16,
        fontWeight: '500',
    },
});
