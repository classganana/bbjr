import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { BotScreen } from '../screens/bot/BotScreen';

export const BotNavigator = () => {
    const Stack = createNativeStackNavigator();
    return (
    <View style={{flex: 1, width: "100%"}}>
          <Stack.Navigator>
              <Stack.Screen name="BotNavigation" component={BotScreen} options={{ headerShown: false }} /> 
          </Stack.Navigator>
    </View>
    )
}