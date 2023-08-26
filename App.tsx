import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import * as Font from "expo-font";
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './src/navigators/AppNavigator';

export default function App() {
  const [isFontLoaded, setFontLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadFonts() {
    await Font.loadAsync({
      "Inter-Regular": require("./assets/fonts/Inter-Regular.ttf"),
      "Inter-Bold": require("./assets/fonts/Inter-Bold.ttf"),
      "Inter-ExtraBold": require("./assets/fonts/Inter-ExtraBold.ttf"),
    });
    setFontLoaded(true);
    setTimeout(() => {
      setLoading(true); // Set loading to true when fonts are loaded
    }, 1000)
  }

  useEffect(() => {
    loadFonts();
  }, []) // Run this effect only once on component mount

  return (
    <SafeAreaView style={styles.container}>
      {loading && isFontLoaded ? (
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      ) : (
        <Text>Loading</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
