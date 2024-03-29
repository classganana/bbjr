import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BotScreen } from '../screens/bot/BotScreen';
import { UserProvider } from '../context/UserContext';

export const BotNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen name="BotScreen" component={BotScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
