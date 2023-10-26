import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft, DownArrow } from '../../components/common/SvgComponent/SvgComponent'
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
    const [quizContent, setQuizContent] = useState<any>();
    const [chapters, setChapters] = useState();
    const startQuiz = () => {
        navigation.navigate('QuizQuestionPages' as never, quizContent as never);
    };

    const [subject, setSubject] = useState();

    const [currentQuiz, setCurrentQuiz] = useState<any>();
    const route = useRoute();
    useEffect(() => {
        getQuizFlow();
        getQuizType();
        setCurrentQuiz(() => route.params)
    }, [])

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
                if (quizType != 'quiz') maintainQuizInLocal(quiz);
            })
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
                    {chapters}
                </Text>
                <TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => setShow(!show)} >
                    <Text>view more</Text>
                    <DownArrow height={'20'} width={'20'} fill={Colors.black_01} />
                </TouchableOpacity>
                {show && <View style={styles.dropdownContainer}>
                    <View style={styles.dropdownHeading}>
                        <Text>{subject} - Total Chapters {chapters?.length}</Text>
                        <TouchableOpacity onPress={() => setShow(!show)} style={styles.reverseIcon}>
                            <DownArrow height={'20'} width={'20'} fill={Colors.black_01} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.listOfChapters}>
                        {chapters && chapters?.map((chapter: string) => {
                            return <Text style={styles.chapterName}>{chapter}</Text>
                        })}
                    </View>
                </View>}
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity onPress={onBack} style={styles.backButton}>
                        <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>{quizType} Details</Text>
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
                </View>
            </View>
            <View style={styles.quizInfo}>
                <QuizIntoduction mcqs={quizContent?.mcqs?.length} time={quizContent?.time} />
                <QuizInformation />
            </View>
            <View style={styles.startQuizButton}>
                <Button label={"Start Quiz"} className={LoginButton} disabled={false} onPress={startQuiz} ></Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    chapterName: {
        marginTop: 15
    },
    listOfChapters: {
        marginTop: 24
    },
    dropdownContainer: {
        borderWidth: 0.5,
        borderColor: 'rgba(0, 107, 127, 0.24)',
        width: "100%",
        position: 'absolute',
        backgroundColor: 'white',
        top: 0,
        paddingHorizontal: 18,
        paddingVertical: 20,
    },
    dropdownHeading: {
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    reverseIcon: {
        transform: [{ rotate: '180deg' }]
    },
    infoContainerTextWidth: {
        width: 200,
        fontSize: 18,
        fontWeight: "500",
        color: Colors.black_01
    },
    chapterList: {
        width: "100%",
        borderRadius: 5,
        zIndex: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: "#F2F7F8"
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        // height: 150,
        flexShrink: 0,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28
    },
    headingTitle: {
        textTransform: 'capitalize',
        color: Colors.black_01,
        fontWeight: "500",
        fontSize: 18
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
    infoContainer: {
        marginTop: 18,
        display: 'flex',
        paddingHorizontal: 10
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
        paddingHorizontal: 24,
    },
    startQuizButton: {
        width: "90%",
        position: 'absolute',
        bottom: 20,
        paddingHorizontal: 16,
        alignSelf: 'center'
    }
});