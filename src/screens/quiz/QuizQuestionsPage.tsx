import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, CrossIcon, InfoIcon, ReportIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import quizQuestions from '../../utils/responses/quizquestions';
import QuestionComponent from '../../components/quiz/QuestionComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, OutlineButton, SmallOutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation, useRoute } from '@react-navigation/native';
import styles from './QuizQuestionsPageStyle';
import ReportComponent from '../../components/quiz/ReportComponent';
import { Description } from '../../components/feedback/Description/Description';
import Popup from '../Popup/popup';
import { QuizOverView } from '../../components/quiz/QuizOverView';
import { httpClient } from '../../services/HttpServices';

export type Answers = Array<{
    mcqId?: string,
    question: string;
    options: string[];
    answer: string;
    selectedAnswer?: string
}>

export type questionWithTime = {
    timeTaken: number,
    quizQuestionList: Answers
}

export const QuizQuestionsPage = () => {
    const [timer, setTimer] = useState(100);
    const questionScrollViewRef = useRef<ScrollView | null>(null);;
    const [quizQuestionList, setQuizQuestionList] = useState<any>(quizQuestions);
    const navigation = useNavigation();
    const route = useRoute();
    const [reqObject, setReqObject] = useState();
    const [quizType, setQuizType] = useState<string | null>('');
    const [quizFlow, setQuizFlow] = useState<string | null>('');
    const [quizzId, setQuizzId] = useState<string | null>('')

    const getQuizType = async () => {
        setQuizType(await AsyncStorage.getItem('quizType'));
    }

    const getQuizFlow = async () => {
        setQuizFlow(await AsyncStorage.getItem('quizFlow'));
    }

    useEffect(() => {
        getQuizType();
        getQuizFlow();
        const req = {
            "schoolId": "default",
            "boardId": "CBSE",
            "subject": "string",
            "className": 0,
            "studentId": 0,
            "chapterName": [
                "string"
            ],
            "dataType": "school",
            "size": 0
        }

        // add time score dataType screenpage
        setReqObject(route.params as any);
        setQuizQuestionList(route.params.mcqs);
        setTimer(route.params.time);
        setQuizzId(route.params.quizzId)

        // const reqObj = {
        //     "service": "ml_service",
        //     "endpoint":  `/data/quizz`,
        //     "requestMethod": "POST",
        //     "requestBody": {
        //         "schoolId": "default",
        //         "boardId": "CBSE",
        //         "subject": "Science",
        //         "className": 10,
        //         "chapterName": [
        //             "Crop Production and Management"
        //         ],
        //         "studentId": 10,
        //         "size": 10,
        //         "dataType": "school"
        //     }
        //   }          

        // httpClient.post(`auth/c-auth`, reqObj)
        // .then((res) => {

        //     // setQuizQuestionList(res.data.data.mcqs);
        // });
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                // Handle timer completion, e.g., show a message or trigger an action
            }
        }, 1000); // Update the timer every second

        if (timer == 0) {
            timerEnds()
        };
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
        setQuizQuestionList((quizQuestionList: any) => {
            const updatedList = [...quizQuestionList];
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
        }
        scrollToNextQuestion();
    };

    const navigateToPrevQuestion = () => {
        if (currentQuestionIndex < quizQuestionList.length) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
        scrollToPrevQuestion();
    };

    const calculateScore = (answerList: questionWithTime) => {
        let score = 0;
        answerList.timeTaken;
        answerList.quizQuestionList.forEach((answer) => {
            if (answer.selectedAnswer && answer.answer == answer.selectedAnswer)
                score += 10;
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
            const quizDetails = {
                timeTaken: timer,
                quizQuestionList
            }
            quizQuestionList['timeTaken'] = timer;
            const list = JSON.stringify(quizDetails)
            await AsyncStorage.setItem('questions', list);
            const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
            if (currentQuestionIndex == quizQuestionList.length - 1) {
                submitQuiz(UserAnswerList)
                // navigation.navigate('QuizResultPage' as never, UserAnswerList as never);
            }
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    const submitQuiz = (answerList: questionWithTime) => {
        const questions = answerList.quizQuestionList.map((answer) => {
            return {
                mcqId: answer.mcqId,
                selectedAnswer: answer.selectedAnswer ? answer.selectedAnswer : undefined
            }
        });

        const tempRequest: any = reqObject;
        tempRequest.mcqs = questions;
        tempRequest.score = calculateScore(answerList);
        tempRequest.time = timer;
        tempRequest.studentName = "Trin";
        tempRequest.screenPage = quizFlow != 'Quizzes' ? 'examPreparation' : `quizzes`
        if(quizFlow == 'Quizzes') delete tempRequest.chapterName;

        setReqObject(tempRequest);
        console.log(reqObject);
        const reqObj = {
            "service": "ml_service",
            "endpoint": quizType == 'quiz' ? `/answered/quizz` : `/answered/mcq`,
            "requestMethod": "POST",
            "requestBody": reqObject
        }

        return httpClient.post(`auth/c-auth`, reqObj)
            .then((res) => {
                if (res.data.statusCode == 200) {
                    navigation.navigate('QuizResultPage' as never, answerList as never);
                }
            });
    }

    const timerEnds = async () => {
        const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
        submitQuiz(UserAnswerList)
    }


    const currentQuestion = quizQuestionList[currentQuestionIndex];
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [questionInfoSheet, setQuestionInfoSheet] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View>
                        <Text style={styles.headingTitle}>Test</Text>
                        <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
                    </View>
                    {timer > 0 && <View style={{ display: 'flex', gap: 10 }}>
                        <View style={styles.timerBlock}>
                            <Text style={styles.timerText}>Time Left:</Text>
                            <Text style={styles.timer}>{formatTime(timer)}</Text>
                        </View>
                        <Button className={SmallOutlineButton} label={'Finish Test'} disabled={false} onPress={() => setModalVisible(true)} />
                    </View>}
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.questionInfo}>
                    <View style={styles.questionInfoDropDown}>
                        <Text style={styles.questionInfoText}>Question {currentQuestionIndex + 1}/{quizQuestionList.length}</Text>
                        <TouchableOpacity onPress={() => setQuestionInfoSheet(true)}>
                            <InfoIcon height={'20'} width={'20'} fill={'black'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => setBottomSheetVisible(true)}
                    >
                        <ReportIcon height={'18'} width={'18'} fill={'white'} />
                    </TouchableOpacity>
                </View>
                <ScrollView ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
                    <View style={styles.questionNumbers}>
                        {quizQuestionList.map((_: any, index: number) => (
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
                    {currentQuestion && currentQuestion.question && <QuestionComponent
                        question={currentQuestion.question}
                        options={currentQuestion.options}
                        onSelectOption={handleSelectOption} isResult={false}
                    />
                    }
                </ScrollView>
                <View style={styles.nextQuizButton}>
                    {
                        currentQuestionIndex != 0 && <Button
                            label={'Previous'}
                            className={OutlineButton}
                            disabled={false}
                            onPress={navigateToPrevQuestion}
                        />
                    }
                    <Button
                        label={currentQuestionIndex === quizQuestionList.length - 1 ? 'Submit' : 'Save & Next'}
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
                <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                    <View style={styles.bottomSheetContainer}>
                        <ReportComponent />
                        <View style={{ paddingHorizontal: 20, paddingVertical: 20, }}>
                            <Description placeholder={'Write your feedback'} title={''} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                position: "absolute",
                                bottom: 0,
                                // left:20,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                justifyContent: "space-between",
                                width: '100%',

                            }}

                        >
                            <Button label={'cancel'} disabled={false} className={OutlineButton} onPress={() => setBottomSheetVisible(false)}></Button>
                            <Button label={'Report'} disabled={false} className={LoginButton} onPress={function (): void {
                                throw new Error('Function not implemented.');
                            }}></Button>
                        </View>
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <Popup setModalVisible={setModalVisible} />
            </Modal>

            <Modal
                animationType="fade"
                transparent={true}
                visible={questionInfoSheet}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                    <View style={styles.bottomSheetContainer}>
                        <QuizOverView time={formatTime(timer)} onCloseSheet={() => { setQuestionInfoSheet(false) }} />
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default QuizQuestionsPage;
