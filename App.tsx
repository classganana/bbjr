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
  const [loading, setLoading] = useState(false);
  const [splashTime, setSplashTime] = useState(3000); // Set the splash screen time in milliseconds (3 seconds by default)
  async function loadFonts() {


    await Font.loadAsync({
      'Inter-Regular': require('./assets/fonts/NunitoSans_10pt-Regular.ttf'),
      'Inter-Bold': require('./assets/fonts/NunitoSans_10pt-Bold.ttf'),
      'Inter-ExtraBold': require('./assets/fonts/NunitoSans_10pt-ExtraBold.ttf'),
    });
    setFontLoaded(true);

    setTimeout(() => {
      setLoading(true); // Set loading to true when fonts are loaded
    }, splashTime);
  }

  const splastScreenControl = async () => {
    const isItFirstTime = await AsyncStorage.getItem('user');
    if(isItFirstTime != null){
        setSplashTime(0);
    }
    loadFonts();
  }

  useEffect(() => {
    splastScreenControl();
  }, []); // Run this effect only once on component mount


  return (
    <SafeAreaView style={styles.container}>
   <AnimatedSplash
        translucent={true}
        isLoaded={loading}
        logoImage={require("./assets/gifs/two.gif")}
        backgroundColor={"#262626"}
        logoHeight={1000}
        logoWidth={450}
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
