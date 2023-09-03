import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent'
import { Colors } from '../../styles/colors'
import { QuizIntoduction } from '../../components/quiz/QuizIntoduction'
import { QuizInformation } from '../../components/quiz/QuizInformation'
import { Button } from '../../components/common/ButttonComponent/Button'
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles'
import { useNavigation } from '@react-navigation/native'

export const QuizFirstPage = () => {
    const navigation = useNavigation();

  const moveToQuizQuestionsPage = () => {
    navigation.navigate("QuizQuestionsPage" as never);
  };
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.heading}>
                <View style={styles.backButton}>
                    <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                </View>
                <Text style={styles.headingTitle}>Quiz Details</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoContainerTitle}>
                    Quizzes
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
            <Button label={"Start Quiz"} className={LoginButton} disabled={false} onPress={moveToQuizQuestionsPage} ></Button>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 150,
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
        gap: 28
    },
    headingTitle: {
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
        color: "#7A7A7A"
    },
    infoContainerText: {
        fontSize: 18,
        fontWeight: "500",
        color: Colors.black_01
    },
    quizInfo: {
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