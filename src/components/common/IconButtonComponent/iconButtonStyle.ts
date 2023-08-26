import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "../../../styles/colors";

export interface IconButtonStyle {
  container: ViewStyle;
  title?: TextStyle;
  icon?: ImageStyle;
}


export const defaultIconButton: IconButtonStyle =
  StyleSheet.create<IconButtonStyle>({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors.Hawkes_Blue,
      padding: 12,
      fontSize: 18,
      gap: 10,
      borderRadius: 12,
      shadowColor: Colors.black_03,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 1,
    },
    title: {
      color: Colors.black_01,
    },
  });

export const backIconButton: IconButtonStyle =
  StyleSheet.create<IconButtonStyle>({
    container: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      backgroundColor: Colors.white,
      padding: 8,
      fontSize: 18,
      gap: 10,
      borderRadius: 20,
      borderColor: Colors.gray_05,
      borderWidth: 1,
    },
    title: {
      color: Colors.black_01,
      fontFamily: "Inter-Bold",
    },
  });
