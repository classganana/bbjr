import { Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Dashboard } from '../screens/Home/Dashboard';
import EditProfile from '../screens/Profile/EditProfile';
import viewLeadboard from '../screens/Profile/viewLeadboard';

export const DashboardNavigator = () => {

    const Stack = createNativeStackNavigator();
    return (
    <View style={{flex: 1, width: "100%"}}>
          <Stack.Navigator>
              {/* <Stack.Screen name="Home" component={Dashboard} options={{ headerShown: false }} /> */}
              {/* <Stack.Screen name="EditProfile" component={EditProfile} options={{ headerShown: false }} /> */}
              <Stack.Screen name="EditProfile" component={viewLeadboard} options={{ headerShown: false }} />
          </Stack.Navigator>
    </View>
    )
  }
  