import React from 'react';
import { View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScreenOne } from '../screens/onboarding/ScreenOne';
import { ScreenTwo } from '../screens/onboarding/ScreenTwo';
import { ScreenThird } from '../screens/onboarding/ScreenThird';

export const OnBoardingNavigator = () => {

  const Stack = createNativeStackNavigator();
  return (
  <View style={{flex: 1, width: "100%"}}>
        <Stack.Navigator>
        <Stack.Screen name="ScreenOne" component={ScreenOne} options={{ headerShown: false }} /> 
        <Stack.Screen name="ScreenTwo" component={ScreenTwo} options={{ headerShown: false }} /> 
        <Stack.Screen name="ScreenThird" component={ScreenThird} options={{ headerShown: false }} /> 
        </Stack.Navigator>
  </View>
  )
}
