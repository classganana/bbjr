import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";
import { Colors } from "../../../styles/colors";

export type Style = {
  container: ViewStyle;
  title?: TextStyle;
  icon?: ImageStyle;
};

export const defaultButton = StyleSheet.create<Style>({
  container: {
    // backgroundColor: Colors.red,
    // padding:10,

    padding: 5,
    backgroundColor: Colors.gray_15,
    borderColor: Colors.Lavender_Pinocchio,
    borderWidth: 1,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black_03,
    // shadowOffset: {
    //   width: 1,
    //   height: 1,
    // },
  },
  title: {
    fontSize: 16
  }
});

export const primaryButton = StyleSheet.create<Style>({
  container: {
    backgroundColor: Colors.brand,
  },
  title: {
    color: Colors.brand,
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export const LoginButton = StyleSheet.create<Style>({
  container: {
    height: 56,
    // flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export const GoogleSignIn = StyleSheet.create<Style>({
  container: {
    height: 56,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
  },
  title: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
})

export const RegisterButton = StyleSheet.create<Style>({
  container: {
    height: 56,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
    borderRadius: 8,
    borderWidth: 1,
  },
  title: {
    color: Colors.black_01,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});
export const SubmitButton = StyleSheet.create<Style>({
  container: {
    height: 56,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.Hawkes_Blue,
    borderColor: Colors.Lavender_Pinocchio,
    borderRadius: 8,
    borderWidth: 0.5,
    shadowColor: Colors.shadow_color,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 4, // For Android
  },
  title: {
    color: Colors.black_01,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export const ResultButton = StyleSheet.create<Style>({
  container: {
    height: 37,
    width: "100%",
    display: "flex",
    // marginHorizontal:10,
    justifyContent: "center",
    backgroundColor: Colors.Hawkes_Blue,
    borderColor: Colors.Lavender_Pinocchio,
    // marginBottom:10,
    paddingLeft: 10,
  },
  title: {
    color: Colors.black_01,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});

export const PurpleButton = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
    backgroundColor: Colors.Hawkes_Blue,
    borderColor: Colors.Lavender_Pinocchio,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: Colors.black_03,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export const def = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: Colors.Hawkes_Blue,
    borderColor: Colors.Lavender_Pinocchio,
    borderWidth: 0.5,
    borderRadius: 10,
    shadowColor: Colors.black_03,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export const StartButton = StyleSheet.create<Style>({
  container: {
    height: 56,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.skyblue,
    borderColor: Colors.Lavender_Pinocchio,
    borderRadius: 25,
    borderWidth: 0.5,
    shadowColor: Colors.shadow_color,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 7,
    elevation: 4,
  },
  title: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 20,
    fontFamily: "Inter-SemiBold",
  },
});
