import React, { useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Vibration,
  Animated,
  TouchableOpacity,
  Modal,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BotScreen } from "../bot/BotScreen";
import { Dashboard } from "../Home/Dashboard";
import { QuizHomePage } from "../quiz/QuizHomePage";
import { SettingsPage } from "../Profile/SettingsPage";
import { useNavigation } from "@react-navigation/native";
import { HomeIcon } from "../../components/common/SvgComponent/SvgComponent";
const Tab = createBottomTabNavigator();
const BottomTabSetup = () => {
  const [focusedTab, setFocusedTab] = useState<
    "FeedBackScreen" | "PasswordScreen" | "LoginScreen" | "PerformanceNavigator"
  >("FeedBackScreen");
  const navigation = useNavigation();
  const [showPopup, setShowPopup] = useState(false);
  const scaleValues: { [key: string]: Animated.Value } = {
    FeedBackScreen: useRef(new Animated.Value(1)).current,
    PasswordScreen: useRef(new Animated.Value(1)).current,
    LoginScreen: useRef(new Animated.Value(1)).current,
    PerformanceNavigator: useRef(new Animated.Value(1)).current,
  };
  const popupOffset = useRef(new Animated.Value(0)).current;
  const handlePressIn = (tabName: keyof typeof scaleValues) => {
    setFocusedTab(tabName as any);
    Animated.spring(scaleValues[tabName], {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = (tabName: keyof typeof scaleValues) => {
    Animated.spring(scaleValues[tabName], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const handleTabPress = (tabName: keyof typeof scaleValues) => {
    // Duration of the vibration in milliseconds
    const vibration = 20;
    Vibration.vibrate(vibration);
    // Show the popup when the specific bottom tab is clicked
    setShowPopup(true);
  };

  const handleStudentAssistantPress = () => {
    // Navigate to the desired screen when clicking on the "StudentAI" tab
    navigation.navigate('Bot' as never);
    // navigation.navigate('BotScreen' as never);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };
  const tabBarStyle = {
    // Your existing tabBarStyle...
    position: "absolute",
    bottom: 0,
    elevation: 1,
    ...styles.shadow,
  };
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            elevation: 1,
            ...styles.shadow,
          },
        }}
      >

        <Tab.Screen
          name="Home"
          component={Dashboard}
          options={{
            tabBarIcon: ({ focused }) => (
              <Animated.View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [
                    { scale: focused ? scaleValues.PasswordScreen : 1 },
                  ],
                }}
                onTouchStart={() => handlePressIn("PasswordScreen")}
                onTouchEnd={() => handlePressOut("PasswordScreen")}
                onTouchCancel={() => handlePressOut("PasswordScreen")}
              >
                <Image
                  source={require("../../../assets/png/home.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: focused ? "black" : "#748C94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "black" : "#748C94",
                    fontSize: 14,
                  }}
                >
                  Home
                </Text>
              </Animated.View>
            ),
          }}
        />
        <Tab.Screen
          name="LoginScreen"
          component={QuizHomePage}
          options={{
            tabBarIcon: ({ focused }) => (
              <Animated.View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  transform: [{ scale: focused ? scaleValues.LoginScreen : 1 }],
                }}
                onTouchStart={() => handlePressIn("LoginScreen")}
                onTouchEnd={() => handlePressOut("LoginScreen")}
                onTouchCancel={() => handlePressOut("LoginScreen")}
              >
                <Image
                  source={require("../../../assets/png/quiz.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "black" : "#748C94",
                    fontSize: 14,
                  }}
                >
                  Login
                </Text>
              </Animated.View>
            ),

          }}
        />
        <Tab.Screen
          name="StudentAssistantSetupScreen"
          component={BotScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Bot' as never)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
            <Image
                  source={require("../../../assets/png/botIcon.png")}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text
                  style={{
                    color: focused ? "#E32F45" : "#748C94",
                    fontSize: 14,
                  }}
                >
                  StudentAI
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={SettingsPage}
          options={{
            tabBarIcon: ({ focused }) => (
              <TouchableOpacity onPress={() => navigation.navigate('Profile' as never)}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  source={require("../../../assets/png/threelines.png")}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                    // tintColor: focused ? "#E32F45" : "#748C94",
                  }}
                />
                <Text
                  style={{
                    color: focused ? "black" : "#748C94",
                    fontSize: 14,
                  }}
                >
                  Profile
                </Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Tab.Navigator>
      {/* Popup */}
      <Modal visible={showPopup} transparent animationType="fade">
        <TouchableOpacity
          style={styles.popupContainer}
          onPress={handleClosePopup}
        >
          <Animated.View
            style={[
              styles.popupContent,
              {
                transform: [{ translateY: popupOffset }],
              },
            ]}
          >
            {/* You can place your popup content here */}
            <Text style={styles.popupText}>This is a Popup!</Text>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#7F5DF0",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  popupContainer: {
    flex: 1,
    justifyContent: "flex-end", // Place the popup at the bottom of the screen
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  popupContent: {
    backgroundColor: "black",
    padding: 16,
    borderRadius: 8,
  },
  popupText: {
    fontSize: 20,
    color: "white",
  },
});
export default BottomTabSetup;
