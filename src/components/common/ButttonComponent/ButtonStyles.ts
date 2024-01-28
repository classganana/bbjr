import { ImageStyle, Platform, StyleSheet, TextStyle, ViewStyle } from "react-native";
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
    // borderWidth: 1,
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


export const PrimarySmallButton = StyleSheet.create({
  container: {
    height: 22,
    // flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 6,
    paddingHorizontal: 12,
    // paddingVertical: 6
  },
  title: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },  
})

export const PrimaryDefaultCircleButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    // flex: 1,
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 24,
    paddingHorizontal: 12,
  },
  title: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});

export const PrimaryDefaultButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    // flex: 1,
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    // paddingHorizontal: 12
  },
  title: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});

export const PrimaryIconDefaultButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    // flex: 1,
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    gap: 10
    // paddingHorizontal: 12
  },
  title: {
    color: Colors.white,
    fontWeight: "400",
    fontSize: 14,
    fontFamily: "Inter-Regular",
  },
});

export const TryAgain = StyleSheet.create<Style>({
  container: {
    height: 50,
    // flex: 1,
    width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    // padding: 24,
    // paddingVertical: 22
  },
  title: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export const LoginButton = StyleSheet.create<Style>({
  container: {
    // height: 56,
    flex: 1,
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    borderRadius: 8,
    // padding: 24,
    // paddingVertical: 22
  },
  title: {
    color: Colors.white,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});


export const SmallOutlineButton = StyleSheet.create<Style>({
  container: {
    // height: 22,
    // flex: 1,
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 10,
    fontFamily: "Inter-Regular",
  },
});


export const PrimaryOutlineButton = StyleSheet.create<Style>({
  container: {
    // flex: 1,
    // width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    backgroundColor: Colors.white,
    // padding: 12
  },
  title: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 20,
    fontFamily: "Inter-Regular",
  },
});

export const ShowAnswer = StyleSheet.create<Style>({
  container: {
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    borderColor: "rgba(0, 107, 127, 0.50)",
    backgroundColor: Colors.white,
  },
  title: {
    color: 'rgba(0, 107, 127, 0.80)',
    fontWeight: "600",
    fontSize: 18,
    fontFamily: "Inter-Regular",
  }

})

export const OutlineButton = StyleSheet.create<Style>({
  container: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    borderColor: Colors.primary,
    backgroundColor: Colors.white,
  },
  title: {
    color: Colors.primary,
    fontWeight: "600",
    fontSize: 16,
    fontFamily: "Inter-Regular",
  },
});

export const OutlinePlaneButton = StyleSheet.create<Style>({
  container: {
    // flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1 / 4,
    borderColor: "#FAFAFA",
    backgroundColor: Colors.white,
    padding: 8,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 }, // Adjust offset as needed
    shadowOpacity: 0.25, // Increase opacity for better visibility
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    color: "#424242",
    fontWeight: "600",
    fontSize: 16,
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
    backgroundColor: Colors.primary,
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
    color: Colors.white,
    fontWeight: "600",
    fontSize: 24,
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

export const CancelButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    flex: 1,
    // width: "90%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    borderColor: Colors.primary,
    paddingVertical: 8,
    backgroundColor: Colors.white,

  },
  title: {
    // padding: 30,
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Inter-Regular",
  }
});

export const StartExamPrep = StyleSheet.create<Style>({
  container: {
    height: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderWidth: 1/4,
    borderColor: Colors.primary,
    paddingVertical: 8,
    backgroundColor: Colors.white
  },
  title: {
    // padding: 30,
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 12,
    fontFamily: "Inter-Regular",
  }
});

export const ExitButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    width:  130,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // borderWidth: 4/4,
    backgroundColor:Colors.primary,
    borderColor:Colors.primary,

  },
  title: {
    // padding: 30,
    color: Colors.white,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Inter-Regular",
  }
});
export const EditButton = StyleSheet.create<Style>({
  container: {
    height: 40,
    width:  '100%',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    // borderWidth: 4/4,
    backgroundColor:Colors.primary,
    borderColor:Colors.primary,

  },
  title: {
    // padding: 30,
    color: Colors.white,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Inter-Regular",
  }
});
export const ExploreButton = StyleSheet.create<Style>({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor:Colors.primary,
    borderColor:Colors.primary,
    paddingHorizontal:15,
    paddingVertical:5,
  },
  title: {
    color: Colors.white,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Inter-Regular",
  }
});

export const ResendOtpButton = StyleSheet.create<Style>({
  container: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor:Colors.white,
    paddingHorizontal:15,
    paddingVertical:5,
  },
  title: {
    color: Colors.primary,
    fontWeight: "500",
    fontSize: 15,
    fontFamily: "Inter-Regular",
  }
});