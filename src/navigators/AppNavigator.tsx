import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LoginScreen } from '../screens/Auth/LoginScreen/LoginScreen';
import { OnBoardingNavigator } from './OnboardinNavigator';
import { DashboardNavigator } from './DashboardNavigator';

export const AppNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                {/* <Stack.Screen name='OnBoarding' component={OnBoardingNavigator} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerTitle: '' }} /> */}
                <Stack.Screen name="DashboardNavigator" component={DashboardNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
