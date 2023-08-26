import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "../../../styles/colors";
import { Platform } from "react-native";

export interface InputComponentStyle {
  container: ViewStyle;
  title?: TextStyle;
  input?: any;
}

export const InputComponentStyle: InputComponentStyle =
  StyleSheet.create<InputComponentStyle>({
    container: {
      borderWidth: 1,
      borderColor: Colors.dark_gray,
      borderStyle: "solid",
      width: "100%",
      display: "flex",
      flexDirection: "row",
      backgroundColor: Colors.gray_01,
      padding: 18,
      gap: 10,
      borderRadius: 12,
    },
    title: {},
    input: {
      fontSize: 15,
      ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
      fontWeight: "500",
      width: "100%",
      color: Colors.gray_02,
      backgroundColor: Colors.gray_01,
    },
  });
