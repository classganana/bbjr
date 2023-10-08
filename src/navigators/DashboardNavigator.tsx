import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dashboard } from '../screens/Home/Dashboard';

export const DashboardNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
