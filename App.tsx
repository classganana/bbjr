import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigators/AppNavigator';
import AnimatedSplash from "react-native-animated-splash-screen";
import { UserProvider } from './src/context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [isSplashDone, setSplashDone] = useState(false); // New state for splash screen

  async function loadFonts() {
    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
      'Inter-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
      'Inter-ExtraBold': require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    });
  }

  const splastScreenControl = async () => {
    loadFonts().then(async () => {
      setFontLoaded(true);
      const isItFirstTime = await AsyncStorage.getItem('user');
      if (isItFirstTime && isItFirstTime.length) {
        setSplashDone(true); // Mark splash screen as done if user data is already stored in AsyncStorage
      } else {
          setTimeout(() => {
            setSplashDone(true);
          }, 3000)
      }
    })
  }

  useEffect(() => {
    splastScreenControl();
  }, []); // Run this effect only once on component mount

  return (
    <SafeAreaView style={styles.container}>
      <AnimatedSplash
        translucent={true}
        isLoaded={isSplashDone} // Use the new state for controlling the splash screen
        logoImage={require("./assets/gifs/two.gif")}
        backgroundColor={"#262626"}
        logoHeight={1000}
        logoWidth={450}
      >
    {/* {Platform.OS === "android" && (<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />)} */}
      {isSplashDone && isFontLoaded ? (
        <NavigationContainer>
          <UserProvider>
            <AppNavigator />
          </UserProvider>
        </NavigationContainer>
      ) : (
        <View style={styles.loadingContainer}>
          <Text>Loading</Text>
        </View>
      )}
      </AnimatedSplash>
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
