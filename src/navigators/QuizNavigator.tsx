import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View } from 'react-native';
import { ExploreQuiz } from '../screens/quiz/ExploreQuiz';
import { QuizFirstPage } from '../screens/quiz/QuizFirstPage';
import { QuizQuestionsPage } from '../screens/quiz/QuizQuestionsPage.1';
import { Colors } from '../styles/colors';
import { QuizResult } from '../screens/quiz/QuizResult';
import { QuizHomePage } from '../screens/quiz/QuizHomePage';
import { QuizQuestionAnswerReview } from '../screens/quiz/QuizQuestionAnswersReview';

export const QuizNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
    <View style={{flex: 1, width: "100%", backgroundColor: Colors.white}}>
          <Stack.Navigator>
              <Stack.Screen name="QuizHomepage" component={QuizHomePage} options={{ headerShown: false }} /> 
              {/* <Stack.Screen name="ExploreQuiz" component={ExploreQuiz} options={{ headerShown: false }} />  */}
              {/* <Stack.Screen name="QuizQuestionPages" component={QuizQuestionsPage} options={{ headerShown: false }} />  */}
              {/* <Stack.Screen name="QuizResultPage" component={() => <QuizResult noOfQuestions={0} noOfCorrectAnswers={0} />} options={{ headerShown: false }} />  */}
              {/* <Stack.Screen name="QuizQuestionAnswersReview" component={QuizQuestionAnswerReview} options={{ headerShown: false }} />  */}
          </Stack.Navigator>
    </View>
    )
  }