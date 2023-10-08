import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { SettingsPage } from '../screens/profile/SettingsPage';
import EditProfile from '../screens/profile/EditProfile';

export const ProfileNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
        <View style={{ flex: 1, width: "100%" }}>
            <Stack.Navigator>
                <Stack.Screen name="Setting" component={SettingsPage} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} />
            </Stack.Navigator>
        </View>
    )
}
