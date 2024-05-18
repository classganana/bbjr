import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft, DownArrow, NewBackIcon } from '../../components/common/SvgComponent/SvgComponent'
import { Colors } from '../../styles/colors'
import { QuizIntoduction } from '../../components/quiz/QuizIntoduction'
import { QuizInformation } from '../../components/quiz/QuizInformation'
import { Button } from '../../components/common/ButttonComponent/Button'
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { httpClient } from '../../services/HttpServices';
import { useUser } from '../../context/UserContext';
import { UtilService } from '../../services/UtilService'


export const QuizFirstPage = () => {
    const { user } = useUser();
    const navigation = useNavigation();
    const [quizFlow, setQuizFlow] = useState<string | null>('');
    const [quizType, setQuizType] = useState<string | null>();
    //   const [quizType, setQuizType] = useState<string | null>();
    const [quizContent, setQuizContent] = useState<any>(null);
    const [chapters, setChapters] = useState();
    const startQuiz = () => {
        navigation.navigate('QuizQuestionPages' as never, quizContent as never);
    };
    const [loading, setLoading] = useState(true);

    const [subject, setSubject] = useState();

    const [currentQuiz, setCurrentQuiz] = useState<any>(null);
    const route = useRoute();
    useEffect(() => {
        getQuizFlow();
        getQuizType();
        setCurrentQuiz(() => route.params)
        console.log(route.params)
    }, [])

    useEffect(() => {
        console.debug(currentQuiz, quizContent);
    }, [currentQuiz, quizContent]);

    const getQuizFlow = async () => {
        setQuizType(await UtilService.getQuizType())
        setQuizFlow(await AsyncStorage.getItem('quizFlow'));
        return await AsyncStorage.getItem('quizFlow');
    }

    const getQuizType = () => {
        AsyncStorage.getItem('quizType').then((q) => {
            getQuizContent(q);
        })
        return AsyncStorage.getItem('quizType');
    }

    const onBack = () => {
        navigation.navigate('QuizHomepage' as never)
    }

    const getQuizContent = async (quizType: string | null) => {
        const listOfChapters = route && route.params && route.params && route.params[0].map((item: any) => {
            return item.title;
        })

        setChapters(listOfChapters);
        setCurrentQuiz(() => route.params)
        const subject = route.params[0][0].subject;
        setSubject(subject);
        AsyncStorage.setItem('subject', subject);
        if(quizType != 'quiz') {
            setupPracticeSession(listOfChapters)
        } else {
            const req = {
                "schoolId": "default",
                "boardId": user?.board,
                "subject": subject,
                "className": user?.class,
                "studentId": user?.userId,
                "chapterName": listOfChapters,
                "dataType": "school",
                // "size": 1,
                "size": quizType == 'quiz' ? listOfChapters.length * 10 : 50,
            }

            // adding this so that quiz for all the chapters can be fetched
            route.params[0][0].allChapter && delete req.chapterName;

            const endPoint = quizType == 'quiz' ? '/data/quizz' : '/data/mcq';
            const reqObj = {
                "service": "ml_service",
                "endpoint": endPoint,
                "requestMethod": "POST",
                "requestBody": req
            }
            const quizFlows = await UtilService.getQuizFlow();
            if (quizFlows == 'Quizzes') {
                delete req.chapterName;
                delete req.subject;
            }
    
            httpClient.post(`auth/c-auth`, reqObj)
                .then((res: any) => {
                    const quiz = {
                        schoolId: 'default',
                        chapterName: listOfChapters,
                        subject: subject,
                        boardId: user?.board,
                        className: user?.class,
                        studentId: user?.userId,
                        ...res.data.data,
                    }
                    setQuizContent(quiz);
                    setLoading(false);
                    if (quizType != 'quiz') maintainQuizInLocal(quiz);
                })
        }
    }

    const setupPracticeSession = async (listOfChapters: string[]) => {
        try {
            const matchingQuizzes = await UtilService.getMatchingQuizzes(listOfChapters);
            // Assuming setCurrentQuiz expects a value:
            if(matchingQuizzes && matchingQuizzes.mcqs){
                setCurrentQuiz(matchingQuizzes);
                setQuizContent(matchingQuizzes);
                console.log(currentQuiz, quizContent);
            } else {
                // getting content from API
                console.log("getting practive questions from api");
                const req = {
                    "schoolId": "default",
                    "boardId": user?.board,
                    subject: route.params[0][0].subject,
                    "className": user?.class,
                    "studentId": user?.userId,
                    "chapterName": listOfChapters,
                    "dataType": "school",
                    // "size": 1,
                    "size": quizType == 'quiz' ? listOfChapters.length * 10 : 50,
                }
                
                const endPoint = quizType == 'quiz' ? '/data/quizz' : '/data/mcq';
                const reqObj = {
                    "service": "ml_service",
                    "endpoint": endPoint,
                    "requestMethod": "POST",
                    "requestBody": req
                }
                const quizFlows = await UtilService.getQuizFlow();
                if (quizFlows == 'Quizzes') {
                    delete req.chapterName;
                    delete req.subject;
                }

                route?.params[0][0].allChapter == true ? delete req.chapterName: ''

                console.log(reqObj);
        
                httpClient.post(`auth/c-auth`, reqObj)
                    .then((res: any) => {
                        const quiz = {
                            schoolId: 'default',
                            chapterName: listOfChapters,
                            subject: route.params[0][0].subject,
                            boardId: user?.board,
                            className: user?.class,
                            studentId: user?.userId,
                            ...res.data.data,
                        }
                        setQuizContent(quiz);
                        if (quizType != 'quiz') maintainQuizInLocal(quiz);
                    })
            }
          } catch (error) {
            console.error('Error fetching or setting quizzes:', error);
            // Handle the error appropriately, e.g., display a user-friendly message.
          }
    }

    const maintainQuizInLocal = async (selectedQuiz: any) => {
        let quizList: any | null = await AsyncStorage.getItem('localQuizzes');
        if (!quizList) {
            // If no data is in local storage, create a new list with the selected quiz.
            quizList = [selectedQuiz];
        } else {
            quizList = JSON.parse(quizList);

            // Function to check if two arrays are equal
            const arraysEqual = (arr1: any[], arr2: any[]) => {
                return (
                    arr1.length === arr2.length &&
                    arr1.every((value, index) => value === arr2[index])
                );
            };
            // Check if there's a quiz with the same chapterName (arraysEqual).
            const index = quizList.findIndex((quiz: any) => arraysEqual(quiz.chapterName, selectedQuiz.chapterName));

            if (index !== -1) {
                // If a quiz with the same chapterName exists, replace it with the new selectedQuiz.
                quizList[index] = selectedQuiz;
            } else {
                // If there's no quiz with the same chapterName, add the selectedQuiz to the list.
                quizList.push(selectedQuiz);
            }
        }

        await AsyncStorage.setItem('localQuizzes', JSON.stringify(quizList));
    };

    const ChapterDropdown = () => {

        const [show, setShow] = useState(false);

        return (
            <View style={styles.chapterList}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.infoContainerTextWidth}>
                    {subject}
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row', flex: 0.5 }} onPress={() => setShow(!show)} >
                    <Text>View Selected Chapters</Text>
                    <DownArrow height={'20'} width={'20'} fill={Colors.black_01} />
                </TouchableOpacity>
                {show && <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownHeading}>
                        <Text style={{fontWeight: '500'}}>{subject} - Total Chapters {chapters?.length}</Text>
                        <TouchableOpacity onPress={() => setShow(!show)} style={styles.reverseIcon}>
                            <DownArrow height={'20'} width={'20'} fill={Colors.black_01} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listOfChapters}>
                        {chapters && chapters?.map((chapter: string, index: number) => {
                            return <Text key={index} style={styles.chapterName}>{chapter}</Text>
                        })}
                    </View>
                </View>}
            </View>
        )
    }

    if (loading) {
        // Render loading indicator while loading
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={Colors.primary} />
          </View>
        );
      }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <NewBackIcon accessible={true} accessibilityLabel={'Back Button'} height={'18'} width={'18'} fill={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>
                        {quizType} Details</Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoContainerTitle}>
                        {quizType}
                    </Text>
                    {chapters && chapters?.length ? <ChapterDropdown /> :
                        <Text style={styles.infoContainerText}>
                            {chapters}
                        </Text>
                    }
                    {!!route?.params[0][0].allChapter &&
                        <Text style={styles.infoContainerText}>
                          {route.params[0][0].subject} - All Chapters
                        </Text>
                    }
                </View>
            </View>
            <View style={styles.quizInfo}>
                <QuizIntoduction mcqs={quizContent?.mcqs?.length} time={quizContent?.time} />
                {quizType !== 'practice' &&  <QuizInformation />}
            </View>
            <View style={styles.startQuizButton}>
                <Button label={"Start " + quizType} className={LoginButton} disabled={false} onPress={startQuiz} ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chapterName: {
        marginTop: 15
    },
    listOfChapters: {
        marginTop: 24,
    },
    dropdownContainer: {
        borderWidth: 0.5,
        borderColor: Colors.secondary,
        width: "100%",
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        right: 0,
        paddingHorizontal: 16,
        paddingVertical: 16,
        ...Platform.select({
          ios: {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          },
          android: {
            elevation: 5,
          },
        }),
      },
    dropdownHeading: {
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        elevation: 2
    },
    reverseIcon: {
        transform: [{ rotate: '180deg' }]
    },
    infoContainerTextWidth: {
        fontSize: 18,
        fontWeight: "500",
        flex: 1,
        color: Colors.black_01
    },
    chapterList: {
        width: "100%",
        borderRadius: 5,
        zIndex: 10,
        display: 'flex',
        gap: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative'
    },
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        paddingHorizontal: 22,
        paddingVertical: 26,
        // height: 150,
        flexShrink: 0,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 26
    },
    headingTitle: {
        textTransform: 'capitalize',
        color: Colors.black_01,
        fontWeight: "500",
        fontSize: 18
    },
    backButton: {
        height: 48,
        width: 48,
        borderRadius: 45,
        backgroundColor: Colors.white,
        display: 'flex',
        marginLeft: -10,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        marginTop: 18,
        display: 'flex',
    },
    infoContainerTitle: {
        fontSize: 18,
        fontWeight: "500",
        color: "#7A7A7A",
        textTransform: 'capitalize'
    },
    infoContainerText: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.black_01
    },
    quizInfo: {
        zIndex: -1,
        flex: 1,
        backgroundColor: '#FFF',
        paddingHorizontal: 24,
    },
    startQuizButton: {
        width: "90%",
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 16,
        alignSelf: 'center',
        height: 48
    }
});