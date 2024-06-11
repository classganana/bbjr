import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { OnBoardingNavigator } from './OnboardinNavigator';
import { DashboardNavigator } from './DashboardNavigator';
import { QuizNavigator } from './QuizNavigator';
import { BotNavigator } from './BotNavigator';
import { LoginScreen } from '../screens/Auth/LoginScreen/LoginScreen';
import { AuthNavigator } from './AuthNavigator';
import { ProfileNavigator } from './ProfileNavigator';
import BottomTabSetup from '../screens/BottomTab/BottomTabSetup';
import { UserType, useUser } from '../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { LoginScreen } from '../screens/Auth/LoginScreen/LoginScreen';

export const AppNavigator = () => {
    const { setUser } = useUser();
    const navigation = useNavigation();

    useEffect(() => {
        setLoggedInUser();
    }, [])

    const setLoggedInUser = async () => {
       const user: string | null = await AsyncStorage.getItem('user');
       const userData: UserType = JSON.parse(user as string);
        if(userData && userData.userId) {
            setUser(userData);
            navigation.reset({
                index: 0,
                routes: [{ name: 'DashboardNavigator' } as never] // Replace 'Home' with the actual name of your main screen
              });
        } else {
            navigation.navigate('OnBoarding' as never)  
        }
    }

    const Stack = createNativeStackNavigator();
    return (

        <View style={{ flex: 1, width: "100%", backgroundColor: 'white' }}>
            <Stack.Navigator>
                <Stack.Screen name='OnBoarding' component={OnBoardingNavigator} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Auth" component={AuthNavigator} options={{ headerShown: false }} />
                <Stack.Screen name="DashboardNavigator" component={BottomTabSetup} options={{ headerShown: false }} />
                <Stack.Screen name="Quiz" component={QuizNavigator} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Bot" component={BotNavigator} options={{ headerShown: false }}></Stack.Screen>
                <Stack.Screen name="Profile" component={ProfileNavigator} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
