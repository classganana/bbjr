import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, Platform } from 'react-native';
import * as Font from 'expo-font';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigators/AppNavigator';
import AnimatedSplash from "react-native-animated-splash-screen";
import { UserProvider } from './src/context/UserContext';



export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  async function loadFonts() {
    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
      'Inter-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
      'Inter-ExtraBold': require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    });
    setFontLoaded(true);
    setTimeout(() => {
      setLoading(true); // Set loading to true when fonts are loaded
    }, 10);
  }

  useEffect(() => {
    loadFonts();
  }, []); // Run this effect only once on component mount


  return (
    <SafeAreaView style={styles.container}>
   <AnimatedSplash
        translucent={true}
        isLoaded={loading}
        logoImage={require("./assets/gifs/splash.gif")}
        backgroundColor={"#262626"}
        logoHeight={1000}
        logoWidth={500}
      >
    {/* {Platform.OS === "android" && (<StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />)} */}
      {loading && isFontLoaded ? (
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
