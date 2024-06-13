import React, { SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, CrossIcon, InfoIcon, NewBackIcon, ReportIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QuestionComponent from '../../components/quiz/QuestionComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, OutlineButton, SmallOutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import styles from './QuizQuestionsPageStyle';
import ReportComponent from '../../components/quiz/ReportComponent';
import { Description } from '../../components/feedback/Description/Description';
import Popup from '../Popup/popup';
import { QuizOverView } from '../../components/quiz/QuizOverView';
import { httpClient } from '../../services/HttpServices';
import { useUser } from '../../context/UserContext';
import { UtilService } from '../../services/UtilService';
import { Colors } from '../../styles/colors';
import { ToastService } from '../../services/ToastService';


export type Answers = Array<{
    mcqId: string,
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
    const [quizQuestionList, setQuizQuestionList] = useState<any>([]);
    const navigation = useNavigation();
    const route = useRoute();
    const [reqObject, setReqObject] = useState();
    const [quizType, setQuizType] = useState<string | null>('');
    const [quizFlow, setQuizFlow] = useState<string | null>('');
    const [quizzId, setQuizzId] = useState<string | null>('');
    const {user} = useUser();
    const [subject, setSubject] = useState<string | null>('');
    const reportOptions = ['Incorrect or incomplete question', 'Incorrect or incomplete Options', 'Formatting or Image Quality issue'];

    const getQuizType = async () => {
        setQuizType(await AsyncStorage.getItem('quizType'));
        setSubject(await AsyncStorage.getItem('subject'));
    }

    const getQuizFlow = async () => {
        setQuizFlow(await AsyncStorage.getItem('quizFlow'));
    }

    const findQuizForPracticeNUpdateByChapterName = async () => {
        let quizList: any | null = await AsyncStorage.getItem('localQuizzes');
        if (quizList) {
            quizList = JSON.parse(quizList);
            const matchingQuizzes = quizList.filter((quiz: any) => {
                if (!Array.isArray(quiz.chapterName) || !Array.isArray(route?.params?.chapterName)) {
                  return false; // Handle cases where either value is not an array
                }
            
                const setA = new Set(quiz.chapterName);
                const setB = new Set(route?.params?.chapterName);
            
                return setA.size === setB.size &&
                       [...setA].every((item) => setB.has(item))
              }); 
        }
    }

    useEffect(() => {
        getQuizType();
        getQuizFlow();
        // add time score dataType screenpage
        setReqObject(route.params as any);
        setQuizQuestionList(route.params.mcqs);
        AsyncStorage.removeItem('questions',);
        setTimer(10);
        // setTimer(route.params.time);
        setQuizzId(route.params.quizzId)
        setQuestionsInLocal();
    }, [])

    useFocusEffect(
        useCallback(() => {
          const fetchData = async () => {
            getQuizType();
            getQuizFlow();
            // add time score dataType screenpage
            setQuizQuestionList(route.params.mcqs);
            await AsyncStorage.removeItem('questions');
            setTimer(1000);
            // setTimer(route.params.time);
            setQuizzId(route.params.quizzId);
            setQuestionsInLocal();
          };
      
          fetchData();
      
          return () => {
            // Cleanup function if necessary
          };
        }, [route.params])
      );

    const setQuestionsInLocal = async () => {
        const quizDetails = {
            timeTaken: timer,
            quizQuestionList,
            chapterNames: reqObject?.chapterName
        }
        AsyncStorage.setItem('questions', JSON.stringify(quizDetails));
    }

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

    useEffect(() => {
        setQuestionsInLocal();
    },[quizQuestionList])

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
        setHideHintText(false);
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
                quizQuestionList,
                chapterNames: reqObject?.chapterName
            }
            quizQuestionList['timeTaken'] = timer;
            const list = JSON.stringify(quizDetails)
            await AsyncStorage.setItem('questions', list);
            const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
            const quizType = await UtilService.getQuizType();
            if(quizType == 'practice') {
                UtilService.updateLocalPracticeMcqs(reqObject?.chapterName, quizQuestionList)
                submitPractice(UserAnswerList)
            } else {
                if (currentQuestionIndex == quizQuestionList.length - 1) {
                    submitQuiz(UserAnswerList)
                    navigation.navigate('QuizResultPage' as never, UserAnswerList as never);
                }
            }
        } catch (error) {
            console.error('Error storing data:', error);
        }
    };

    const submitQuiz = async (answerList: questionWithTime) => {
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
        tempRequest.studentName = user?.name;
        tempRequest.screenPage = quizFlow != 'Quizzes' ? 'examPreparation' : `quizzes`
        tempRequest.quizzType = quizFlow == 'Quizzes' ? 'class' : `chapter`;
        if(quizFlow == 'Quizzes') delete tempRequest.chapterName;

        setReqObject(tempRequest);
        const reqObj = {
            "service": "ml_service",
            "endpoint": quizType == 'quiz' ? `/answered/quizz` : `/answered/mcq`,
            "requestMethod": "POST",
            "requestBody": reqObject
        }

        if(quizType != 'practice') {
            return httpClient.post(`auth/c-auth`, reqObj)
                .then((res) => {
                    if (res.data.statusCode == 200) {
                        navigation.navigate('QuizResultPage' as never, answerList as never);
                    }
                });
        } else {

        }
    }

    const submitPractice = async (answerList: questionWithTime) => {
        const q = {
            mcqId : currentQuestion.mcqId,
            selectedAnswer: currentQuestion.selectedAnswer
        }

        const questions = answerList.quizQuestionList.map((answer) => {
            return {
                mcqId: answer.mcqId,
                selectedAnswer: answer.selectedAnswer ? answer.selectedAnswer : undefined
            }
        });

        const tempRequest: any = reqObject;
        tempRequest.mcqs = [q];
        tempRequest.studentName = user?.name;
        tempRequest.screenPage = quizFlow != 'Quizzes' ? 'examPreparation' : `quizzes`;
        tempRequest.quizzType = quizFlow == 'Quizzes' ? 'class' : `chapter`;
        
        if(quizFlow == 'Quizzes') delete tempRequest.chapterName;

        tempRequest.dataType = "school";
        setReqObject(tempRequest);
        const reqObj = {
            "service": "ml_service",
            "endpoint": quizType == 'quiz' ? `/answered/quizz` : `/answered/mcq`,
            "requestMethod": "POST",
            "requestBody": reqObject
        }

        return httpClient.post(`auth/c-auth`, reqObj)
            .then((res) => {
                if (res.data.statusCode == 200) {
                    if(currentQuestionIndex === quizQuestionList.length - 1){
                        userEndsThequiz();
                    } else {
                        setCurrentQuestionIndex(currentQuestionIndex + 1);
                    }
                }
            });
    }

    const timerEnds = async () => {
        const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
        submitQuiz(UserAnswerList)
    }

    const userEndsThequiz = async () => {
        const UserAnswerList = JSON.parse((await AsyncStorage.getItem('questions')) as string);
        if(quizType != 'practice') {
            submitQuiz(UserAnswerList);
        } else {
            navigation.reset({
                index: 0,
                routes: [{ name: 'QuizHomepage' } as never] // Replace 'Home' with the actual name of your main screen
              });
            // navigation.navigate('QuizHomepage' as never, { replace: true } as never);
        }
    }

    const reportQuestion = async (feedback: SetStateAction<string>) => {
        const req = {
            schoolId: "default",
            boardId: user?.board,
            subject: subject,
            className: user?.class,
            studentId: user?.userId,
            feedbackOn: "mcqs",
            msg: [
                {"feedback": "negative"},
                {"feedbackMessage": feedback},
            ],
            mcqId: currentQuestion.mcqId,
          }
          const reqObj = {
            "service": "ml_service",
            "endpoint": `/feedback`,
            "requestMethod": "POST",
            "requestBody": req
        }

        const res = await httpClient.post(`auth/c-auth`, reqObj);
        if (res.data.statusCode == 200) {
            setBottomSheetVisible(false);
            ToastService("Thanks, we will look into the issue.")
        } else {
            ToastService("Something went wrong! please try again later.")
            setBottomSheetVisible(false);
            navigateToNextQuestion();
        }

    }

    const currentQuestion = quizQuestionList[currentQuestionIndex];
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [questionInfoSheet, setQuestionInfoSheet] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [hintVisibility, setHintVisibility] = useState(false);
    const [hideHintText, setHideHintText] = useState(false)
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.headingLeft}>
                        {/* <Text style={styles.headingTitle}>{quizType == 'practice' ? 'Practice': 'Test'}</Text> */}
                        <Button className={SmallOutlineButton} 
                            label={quizType == 'practice' ? 'Finish': 'Finish'} 
                            disabled={false} onPress={() => {
                                setModalVisible(true)
                                }} />
                        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.headingInfo}>{reqObject?.chapterName}</Text>
                    </View>
                    <View style={styles.headingRight}>
                        <View style={{ display: 'flex', gap: 2, flex: 1, alignItems: "flex-end", }}>
                        {timer > 0 && 
                            <View style={styles.timerBlock}>
                                <Text style={styles.timerText}>Time Left:</Text>
                                <Text style={styles.timer}>{formatTime(timer)}</Text>
                            </View>}
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.body}>
                <View style={styles.questionInfo}>
                    <View style={styles.questionInfoDropDown}>
                        <Text style={styles.questionInfoText}>Question {currentQuestionIndex + 1}/{quizQuestionList.length}</Text>
                        <TouchableOpacity onPress={() => setQuestionInfoSheet(true)} style={{height: 40, width: 40}}>
                            <InfoIcon accessible={true} accessibilityLabel={"Quiz Info"} height={'20'} width={'20'} fill={'black'} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        onPress={() => setBottomSheetVisible(true)}
                    >
                        <ReportIcon height={'18'} width={'18'} fill={'white'} accessible={true} accessibilityLabel={"Report"}  />
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
                                    quizQuestionList[index].selectedAnswer && styles.activeQuestion,
                                    quizType == 'practice' && quizQuestionList[index].answer == quizQuestionList[index].selectedAnswer  && { backgroundColor: '#4BAE4F'},
                                    quizType == 'practice' && quizQuestionList[index].selectedAnswer && quizQuestionList[index].answer != quizQuestionList[index].selectedAnswer  && { backgroundColor: 'red'},
                                ]}
                                onPress={() => navigateToQuestion(index)}
                            >
                                <Text style={[styles.questionNumberText,
                                            currentQuestionIndex === index && {color: 'white'},
                                            quizQuestionList[index].selectedAnswer && {color: 'white'}]}>{index + 1}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                <ScrollView contentContainerStyle={styles.scrollContainer}>
                    {currentQuestion && currentQuestion.question && <QuestionComponent
                        question={quizQuestionList[currentQuestionIndex].question}
                        options={quizQuestionList[currentQuestionIndex].options}
                        selectedAnswer={quizQuestionList[currentQuestionIndex].selectedAnswer}
                        onSelectOption={handleSelectOption} 
                        correctAnswer={quizQuestionList[currentQuestionIndex].answer}
                        isResult={quizType == 'practice'}
                    />
                    }
                </ScrollView>
                {
                    //    quizQuestionList[currentQuestionIndex] && quizQuestionList[currentQuestionIndex].selectedAnswer && quizType == 'practice' && <View style={styles.hintSheetContainer}>
                    quizQuestionList[currentQuestionIndex] && quizQuestionList[currentQuestionIndex].selectedAnswer && quizType == 'practice' && <View style={styles.hintSheetContainer}>
                            <View style={styles.hintSheetContainerHeader}>
                                <View style={styles.hintSheetContainerHeaderLeft}>
                                    <Text style={styles.hintSheetContainerHeaderLeftText}>
                                        Explanation
                                    </Text>
                                    <View style={styles.aiGeneratedCircle}>
                                        <Text style={{color: Colors.primary }}>
                                            AI Generated
                                        </Text>
                                    </View>                                
                                </View>
                                <TouchableOpacity onPress={() => {setHideHintText(!hideHintText)}} 
                                style={[styles.hintTextButton, hideHintText && {transform: [{rotate: '90deg'}]} ]}>
                                    <NewBackIcon accessible={true} accessibilityLabel={'Show Hint'}  height={18} width={18} fill={Colors.black_01} />
                                </TouchableOpacity>
                            </View>
                            {hideHintText && 
                                <View style={styles.hintAnswer}>
                                    <Text style={styles.hintAnswerText}>{quizQuestionList[currentQuestionIndex].explanation}</Text>
                                </View>
                            }
                    </View>
                    }
                <View> 
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
            </View>

            <Modal
                animationType="fade"
                transparent={true}
                visible={bottomSheetVisible}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                    <View style={styles.bottomSheetContainer}>
                        <ReportComponent report={(item) => {
                            reportQuestion(item);
                        } } closeModal={function (value: React.SetStateAction<boolean>): void {
                            setBottomSheetVisible(false);
                        } } options={reportOptions} />
                    </View>
                </View>
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(!modalVisible)}>
                <Popup setModalVisible={setModalVisible} exit={function (value: React.SetStateAction<string>): void {
                        userEndsThequiz();
                        setModalVisible(!modalVisible)
                    } } />
            </Modal>
            <Modal
                animationType="fade"
                transparent={true}
                visible={questionInfoSheet}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                    <View style={styles.bottomSheetContainer}>
                        {reqObject && <QuizOverView chapterNames={reqObject.chapterName} time={formatTime(timer)} onCloseSheet={() => setQuestionInfoSheet(false)} questions={quizQuestionList} 
                        clickedQuestion={function (n: number): void {
                            setQuestionInfoSheet(false)
                            navigateToQuestion(n);
                        } } />}
                    </View>
                </View>
            </Modal>

        </View>
    );
};

export default QuizQuestionsPage;
