import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigators/AppNavigator';

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
      'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
      'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
    });
    setFontLoaded(true);
    setTimeout(() => {
      setLoading(true); // Set loading to true when fonts are loaded
    }, 1000);
  }

  useEffect(() => {
    loadFonts();
  }, []); // Run this effect only once on component mount

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      {loading && isFontLoaded ? (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
