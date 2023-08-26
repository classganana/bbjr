import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { Colors } from "../../../styles/colors";

export const NoConnectionScreen = () => {
  const [isDeviceConnected, setIsDeviceConnected] = useState(false);

  useEffect(() => {
    const connection = NetInfo.addEventListener((state: NetInfoState) => {
      setIsDeviceConnected(state.isConnected  ? state.isConnected : false);
    });

    return () => {
      connection();
    };
  }, []);


  return (
    <View style={styles.container}>
      {!isDeviceConnected && (
        <View style={styles.banner}>
          <Text style={styles.bannerText}>No internet connection</Text>
        </View>
      )}
      {!isDeviceConnected && (
        <Image
          source={require("../../../../assets/png/Ashish.png")}
          style={styles.offlineImage}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  banner: {
    backgroundColor: Colors.red_01,
    padding: 10,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  bannerText: {
    color: Colors.white,
    fontSize: 16,
  },
  offlineImage: {
    width: 200,
    height: 200,
  },
});
