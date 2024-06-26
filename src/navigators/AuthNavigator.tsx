import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BotScreen } from '../screens/bot/BotScreen';
import { LoginScreen } from '../screens/Auth/LoginScreen/LoginScreen';
import { SignUpScreen } from '../screens/Auth/SignUpScreen/SignUpScreen';

export const AuthNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
