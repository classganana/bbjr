import { ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "../../../styles/colors";
import { Style } from "../ButttonComponent/ButtonStyles";

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

  export const EditIconButton: IconButtonStyle =
  StyleSheet.create<IconButtonStyle>({
    container: {
      width: 100,
      height: 40,
      flex: 1,
      // display: "flex",
      // flexDirection: "row",
      // justifyContent: "center",
      backgroundColor: 'red',
      // padding: 12,
      // fontSize: 18,
      // gap: 15,
      // borderRadius: 12,
      // shadowColor: Colors.black_03,
      // shadowOffset: { width: 0, height: 1 },
      // shadowOpacity: 0.8,
      // shadowRadius: 1,
    },
    title: {
      color: Colors.white,
    },
  });

  export const OutlinePlaneButton = StyleSheet.create<Style>({
    container: {
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-around",
      borderColor: Colors.white,
      backgroundColor: Colors.white,
      padding: 6,
      // elevation: 3,
      // borderRadius: 1/2,
      // borderColor: Colors.white,
      // borderWidth: 0.5,
     
  },
    title: {
      color: "#424242",
      fontSize: 12,
    },
  });