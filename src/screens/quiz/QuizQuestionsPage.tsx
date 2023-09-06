import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../styles/colors';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CrossIcon, DownArrow, ReportIcon } from '../../components/common/SvgComponent/SvgComponent';
import quizQuestions from '../../utils/responses/quizquestions';
import QuestionComponent from '../../components/quiz/QuestionComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, OutlineButton, SmallOutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from '@react-navigation/native';

export type Answers = Array<{
    question: string;
    options: string[];
    correctAnswer: string;
    selectedAnswer?: string
  }>

export const QuizQuestionsPage = () => {
    const [timer, setTimer] = useState(100); // Initial timer value in seconds
    const questionScrollViewRef = useRef<ScrollView | null>(null);;
    const [quizQuestionList, setQuizQuestionList] = useState(quizQuestions);
    const navigation = useNavigation();

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                // Handle timer completion, e.g., show a message or trigger an action
            }
        }, 1000); // Update the timer every second

        if (timer == 0) console.log("Ended");
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
        setQuizQuestionList((quizQuestionList) => {
            const updatedList = [...quizQuestionList];
            updatedList[currentQuestionIndex].selectedAnswer = selectedOption;
            return updatedList;
        });
    };

    const navigateToQuestion = (index: number) => {
        setCurrentQuestionIndex(index);
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
        scrollToNextQuestion();
    };

    const navigateToPrevQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        scrollToPrevQuestion();
    };

    const calculateScore = (answerList: Answers) => {
        let score = 0;
        answerList.forEach((answer) => {
            if(answer.correctAnswer == answer.selectedAnswer)
                score+=10;
        })
        return score;
    }

    const scrollToPrevQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const scrollX = nextQuestionIndex * (-40); 
        if (questionScrollViewRef.current) {
            questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        }
    }

    const scrollToNextQuestion = async () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const scrollX = nextQuestionIndex * 40; 
        if (questionScrollViewRef.current) {
            questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        }
        try {
            const list = JSON.stringify(quizQuestionList)
            await AsyncStorage.setItem('questions', list);
            const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
            console.log(calculateScore(UserAnswerList));
            if (currentQuestionIndex == quizQuestions.length - 1) {
                console.log(calculateScore(UserAnswerList));
                navigation.navigate('QuizResultPage' as never);
            }
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View>
                        <Text style={styles.headingTitle}>Test</Text>
                        <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
                    </View>
                    <View style={{ display: 'flex', gap: 10 }}>
                        <View style={styles.timerBlock}>
                            <Text style={styles.timerText}>Time Left:</Text>
                            <Text style={styles.timer}>{formatTime(timer)}</Text>
                        </View>
                        <Button className={SmallOutlineButton} label={'Finish Test'} disabled={false} onPress={() => { }} />
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.questionInfo}>
                    <View style={styles.questionInfoDropDown}>
                        <Text style={styles.questionInfoText}>Question {currentQuestionIndex + 1}/{quizQuestions.length}</Text>
                        <DownArrow height={'20'} width={'20'} fill={'black'} />
                    </View>
                    <TouchableOpacity
                        onPress={() => setBottomSheetVisible(true)}
                    >
                        <ReportIcon height={'18'} width={'18'} fill={'white'} />
                    </TouchableOpacity>
                </View>
                <ScrollView ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
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
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    <QuestionComponent
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        onSelectOption={handleSelectOption} isResult={false}
                    />
                </ScrollView>
                <View style={styles.nextQuizButton}>
                   {
                    currentQuestionIndex != 0 && <Button
                    label={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Previous'}
                    className={OutlineButton}
                    disabled={false}
                    onPress={navigateToPrevQuestion}
                    />
                   }
                    <Button
                        label={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Save & Next'}
                        className={LoginButton}
                        disabled={false}
                        onPress={navigateToNextQuestion}
                    />
                </View>
            </View>
            
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={bottomSheetVisible}
                    onRequestClose={() => setBottomSheetVisible(false)}
                >
                <View style={{backgroundColor: 'rgba(0, 0, 0,0.3)',flex:1}}>
                    <View style={styles.bottomSheetContainer}>
                        {/* <Student
                        selectedSubject={(item: any) => setSubjectAndCloseModal(item)}
                          /> */}
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                position: "absolute",
                                bottom: 0,

                            }}
                        >
                            <View style={styles.closeButton}>
                                <TouchableOpacity
                                    style={styles.edit}
                                    onPress={() => setBottomSheetVisible(false)}
                                >
                                    <CrossIcon height={20} width={32} fill={"red"} />
                                </TouchableOpacity>
                                {/* <Text>Select Subject</Text> */}
                            </View>
                        </View>
                    </View>
                 </View>
            </Modal>
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
        //  position: "absolute",
        display: 'flex',
        flexDirection: 'row',
        right: 10
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
        // marginBottom: 10,
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
        backgroundColor: Colors.primary, // Change to your active question color
        color: Colors.white,
    },
    nextQuizButton: {
        flex: 1,
        width: "90%",
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between'
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
        elevation: 2, // for Android shadow
    },
    questionInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16
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
    bottomSheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    closeButton: {
        flexDirection: "row",
        bottom: 10,
        position: "absolute",
        gap: 10,
        alignItems: "center",
    },
    edit: {
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        backgroundColor: Colors.Hawkes_Blue,
        borderColor: Colors.skyblue,
        borderWidth: 0.5,
        borderRadius: 90,
    },
});

export default QuizQuestionsPage;
