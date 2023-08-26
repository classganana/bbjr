import React, { useEffect, useState } from 'react'
import { Colors } from '../../styles/colors'
import { Button, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent'
import quizQuestions from '../../utils/responses/quizquestions';
import QuestionComponent from '../../components/quiz/QuestionComponent';

export const QuizQuestionsPage = () => {
    const [timer, setTimer] = useState(1800); // Initial timer value in seconds (30 minutes)

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                // Handle timer completion, e.g., show a message or trigger an action
            }
        }, 1000); // Update the timer every second

        return () => {
            clearInterval(interval); // Clear the interval on component unmount
        };
    }, [timer]);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };


    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleSelectOption = (selectedOption: string) => {
        // Handle the selected option if needed
        console.log('Selected:', selectedOption);
    };

    const navigateToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                    </View>
                    <View>
                        <Text style={styles.headingTitle}>Quiz Details</Text>
                        <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
                    </View>
                    <View style={{ position: "absolute", right: 10 }}>
                        <Text style={styles.timer}>{formatTime(timer)}</Text>
                        <Text style={styles.timerText}>mins left</Text>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.container}>
                <ScrollView horizontal style={styles.questionNumbersScroll}>
                    <View style={styles.questionNumbers}>
                        {quizQuestions.map((_, index) => (
                            <TouchableOpacity
                                key={index}
                                style={[
                                    styles.questionNumber,
                                    currentQuestionIndex === index && styles.activeQuestion,
                                ]}
                                onPress={() => navigateToQuestion(index)}
                            >
                                <Text style={styles.questionNumberText}>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <QuestionComponent
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    onSelectOption={handleSelectOption}
                />
                <Button
                    title={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next Question'}
                    onPress={navigateToNextQuestion}
                />
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        margin: 0,
        backgroundColor: Colors.white
    },
    questionNumbersScroll: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'row',
        marginHorizontal: 1
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        flexShrink: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F0F0F0',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
        // justifyContent: 'space-between'
    },
    headingTitle: {
        color: "#7A7A7A",
        fontWeight: "500",
        fontSize: 14
    },
    headingInfo: {
        fontWeight: '500'
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#D9D9D9",
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    timer: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 2,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden'
    },
    timerText: {
        marginTop: 4,
        textAlign: 'center',
        color: "#525252",
        fontSize: 12
    },
    navigationButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 16,
    },
    questionNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 16,
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
        fontWeight: '700'
    },
    activeQuestion: {
        backgroundColor: Colors.primary, // Change to your active question color
        color: Colors.white,
    }
})