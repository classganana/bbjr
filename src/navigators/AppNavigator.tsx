import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { OnBoardingNavigator } from './OnboardinNavigator';
import { DashboardNavigator } from './DashboardNavigator';
import { QuizNavigator } from './QuizNavigator';
import { LoginScreen } from '../screens/Auth/LoginScreen/LoginScreen';

export const AppNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%", backgroundColor: 'white' }}>
            <Stack.Navigator>
                {/* <Stack.Screen name='OnBoarding' component={OnBoardingNavigator} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} /> */}
                {/* <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} options={{ headerShown: false }} /> */}
                <Stack.Screen name="Quiz" component={QuizNavigator} options={{ headerShown: false }}></Stack.Screen>
            </Stack.Navigator>
        </View>
    )
}
