import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent'
import { Colors } from '../../styles/colors'
import { QuizIntoduction } from '../../components/quiz/QuizIntoduction'
import { QuizInformation } from '../../components/quiz/QuizInformation'
import { Button } from '../../components/common/ButttonComponent/Button'
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation, useRoute } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { httpClient } from '../../services/HttpServices'


export const QuizFirstPage = () => {
  const navigation = useNavigation();
  const [quizType, setQuizType] = useState<string | null>();
  const [quizContent, setQuizContent] = useState();
  const startQuiz = () => {
        navigation.navigate('QuizQuestionPages' as never, quizContent as never);
  };

  const [currentQuiz, setCurrentQuiz] = useState<any>();
  const route = useRoute();
  useEffect(() => {
        getQuizType();
        setCurrentQuiz(() => route.params)
  },[])

  const getQuizType = () => {
    AsyncStorage.getItem('quizType').then((q) => {
        getQuizContent(q);

    })
  }
  
  const onBack = () => {
    navigation.navigate('QuizHomepage' as never)
  }

  const getQuizContent = (quizType: string | null) => {
    
    const listOfChapters = route && route.params && route.params  && route.params[0].map((item: any) => {
        return item.title;
    })
    setCurrentQuiz(() => route.params)
    const subject = route.params[0][0].subject;

    const req = {
        "schoolId": "default",
        "boardId": "CBSE",
        "subject": subject,
        "className": 10,
        "studentId": 10,
        "chapterName": listOfChapters,
        "dataType": "school",
        "size": 5
      }
      const endPoint = quizType == 'quiz'?'/data/quizz': '/data/mcq' ; 

      const reqObj = {
        "service": "ml_service",
        "endpoint":  endPoint,
        "requestMethod": "POST",
        "requestBody": req
    }


    console.log(route.params);

    httpClient.post(`auth/c-auth`, reqObj)
        .then((res: any) => {
            const quiz = {
                schoolId: 'default',
                chapterName: listOfChapters,
                subject: subject,
                boardId: "CBSE",
                className: 10,
                studentId: 10,
                quizzType: "chapter",
                screenPage: "examPreparation",
                ...res.data.data,
            }
            setQuizContent(quiz);
        })
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
                <Text style={styles.infoContainerText}>
                    English Vocabulary Quiz
                </Text>
            </View>
        </View>
        <View style={styles.quizInfo}>
            <QuizIntoduction />
            <QuizInformation />
        </View>
        <View style={styles.startQuizButton}>
            <Button label={"Start Quiz"} className={LoginButton} disabled={false} onPress={startQuiz} ></Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: "#F2F7F8"
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 150,
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