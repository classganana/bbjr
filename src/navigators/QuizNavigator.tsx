import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react'
import { View } from 'react-native';
import { ExploreQuiz } from '../screens/quiz/ExploreQuiz';
import { QuizFirstPage } from '../screens/quiz/QuizFirstPage';
import { QuizQuestionsPage } from '../screens/quiz/QuizQuestionsPage';
import { Colors } from '../styles/colors';
import { QuizResult } from '../screens/quiz/QuizResult';
import { QuizHomePage } from '../screens/quiz/QuizHomePage';

export const QuizNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
    <View style={{flex: 1, width: "100%", backgroundColor: Colors.white}}>
          <Stack.Navigator>
              {/* <Stack.Screen name="ExploreQuiz" component={QuizFirstPage} options={{ headerShown: false }} />  */}
              {/* <Stack.Screen name="QuizQuestionPages" component={QuizQuestionsPage} options={{ headerShown: false }} />  */}
              <Stack.Screen name="QuizHomePage" component={QuizHomePage} options={{ headerShown: false }} /> 

          </Stack.Navigator>
    </View>
    )
  }