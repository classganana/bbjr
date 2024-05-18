import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Onboard } from '../screens/onboarding/Onboard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../styles/colors';

export const OnBoardingNavigator = () => {
  const Stack = createNativeStackNavigator();
  const [loading, setLoading] = useState(true); // State to manage loading indicator
  const navigation = useNavigation();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Simulate async operation
        await new Promise(resolve => setTimeout(resolve, 1000));
        // Check if the user has completed onboarding
        const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
        if (onboardingCompleted === 'true') {
          // If onboarding is completed, navigate to another screen
          navigation.navigate('DashboardNavigator' as never);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        // After the onboarding status check is complete, set loading to false
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [navigation]);

  if (loading) {
    // Render loading indicator while loading
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  
  return (
  <View style={{flex: 1, width: "100%"}}>
        <Stack.Navigator>
        <Stack.Screen name="ScreenOne" component={Onboard} options={{ headerShown: false }} /> 
        </Stack.Navigator>
  </View>
  )
}
