import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SettingsPage } from '../screens/Profile/SettingsPage';
import ViewLeadboard from '../screens/Profile/viewLeadboard';
import EditProfile from '../screens/Profile/EditProfile';
import { QuizHistory } from '../screens/Profile/QuizHistory';


export const ProfileNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen name="Setting" component={SettingsPage} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
                <Stack.Screen name="Leaderboard" component={ViewLeadboard} options={{ headerShown: false }} />
                <Stack.Screen name="QuizHistory" component={QuizHistory} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
