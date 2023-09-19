import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors'
import { Button } from '../common/ButttonComponent/Button'
import { PrimaryOutlineButton, SmallOutlineButton, SubmitButton } from '../common/ButttonComponent/ButtonStyles'

export const QuizOverviewQuestions = ({closeSheet}: any) => {
 
  const questions = [
    {
        "question": "What is the capital of France?",
        "options": [
            "New York",
            "Paris",
            "London",
            "Tokyo"
        ],
        "correctAnswer": "Paris",
        "selectedAnswer": "London"
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "options": [
            "Mars",
            "Venus",
            "Jupiter",
            "Neptune"
        ],
        "correctAnswer": "Mars",
        "selectedAnswer": "Jupiter"
    },
    {
        "question": "Who wrote the play 'Romeo and Juliet'?",
        "options": [
            "William Shakespeare",
            "Jane Austen",
            "Charles Dickens",
            "Mark Twain"
        ],
        "correctAnswer": "William Shakespeare",
        "selectedAnswer": "Mark Twain"
    },
    {
        "question": "Which gas do plants use for photosynthesis?",
        "options": [
            "Oxygen",
            "Nitrogen",
            "Carbon Dioxide",
            "Hydrogen"
        ],
        "correctAnswer": "Carbon Dioxide",
        "selectedAnswer": "Hydrogen"
    },
    {
        "question": "What is the largest mammal on Earth?",
        "options": [
            "Elephant",
            "Giraffe",
            "Blue Whale",
            "Lion"
        ],
        "correctAnswer": "Blue Whale"
    },
    {
        "question": "Which scientist developed the theory of relativity?",
        "options": [
            "Isaac Newton",
            "Albert Einstein",
            "Galileo Galilei",
            "Nikola Tesla"
        ],
        "correctAnswer": "Albert Einstein"
    },
    {
        "question": "Which language is widely used for web development?",
        "options": [
            "Java",
            "C++",
            "Python",
            "JavaScript"
        ],
        "correctAnswer": "JavaScript"
    },
    {
        "question": "What is the chemical symbol for gold?",
        "options": [
            "Ag",
            "Au",
            "Fe",
            "Cu"
        ],
        "correctAnswer": "Au"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        "correctAnswer": "Jupiter"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        "correctAnswer": "Jupiter"
    },
    {
        "question": "What is the largest planet in our solar system?",
        "options": [
            "Earth",
            "Mars",
            "Jupiter",
            "Venus"
        ],
        "correctAnswer": "Jupiter"
    },
    {
        "question": "Which famous painting features a woman with a mysterious smile?",
        "options": [
            "Starry Night",
            "Mona Lisa",
            "The Persistence of Memory",
            "American Gothic"
        ],
        "correctAnswer": "Mona Lisa"
    }
]   
    
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <View style={styles.subheader}>
                <View style={styles.primaryCircle}></View>
                <Text>Answered</Text>
            </View>
            <View >
                <Text style={styles.line}>|</Text>
                </View>
            <View style={styles.subheader}>
                <View style={styles.secondaryCircle}></View>
                <Text>UnAnswered</Text>
            </View>
        </View>
        <View style={styles.questionsBody}>
            { questions.map((question, index) => {
                return <View key={index} style={[(question.selectedAnswer)?styles.answeredCircle: styles.unansweredCircle]}>
                    <Text style={[(question.selectedAnswer)?styles.answeredCircleText: styles.unansweredCircleText]}> {index+1} </Text>
                </View>
            }) }
        </View>
        <View style={styles.footer}>
            <Button className={PrimaryOutlineButton} label={"Resume"} disabled={false} onPress={closeSheet} />
        </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 12,
        paddingVertical: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomColor: '#CDCDCD',
        borderBottomWidth: 1/2,
        paddingVertical: 10,
    },
    line: {
        fontSize: 25,
        fontWeight: '100'
    },
    subheader:{
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center'
    },
    questionsBody: {
        flexDirection: 'row', 
        flexWrap: 'wrap',
        gap: 25,
        justifyContent: 'center',
        marginTop: 45
    },
    primaryCircle: {
        height: 14,
        width: 14,
        backgroundColor: Colors.primary,
        borderRadius: 14,
    },
    secondaryCircle: {
        height: 14,
        width: 14,
        backgroundColor: "#006B7F1A",
        borderRadius: 14,
    },
    answeredCircle: {
        height: 32,
        width: 32,
        borderRadius: 32,
        backgroundColor: Colors.primary,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    answeredCircleText: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.white
    },
    unansweredCircle: {
        borderRadius: 16,
        backgroundColor: "#006B7F1A",
        height: 32,
        width: 32,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    unansweredCircleText: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.primary
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        width: "90%",
        alignSelf: 'center'
    }

})