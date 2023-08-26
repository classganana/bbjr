import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: Colors.white,
    padding: 16,
    borderRadius: 8,
    width: "100%",
    justifyContent: "space-between",
    shadowColor: Colors.black_03,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    cursor: "pointer",
    elevation: 4, // For Android
  },

  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },

  image: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  imageStyle: {
    width: 18,
    height: 18,
    borderRadius: 20,
  },

  text: {
    display: "flex",
    justifyContent: "space-between",
    gap: 16,
    fontFamily: "Inter-Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
  },

  role: {
    color: Colors.gray_03,
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  text1: {
    display: "flex",
    color: Colors.gray_03,
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    alignItems: "center",
  },

  dotSeparator: {
    height: 4,
    alignItems: "center",
    justifyContent: "center",
    display: "flex",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gray_04,
    display: "flex",
    alignItems: "center",
  },

  footer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "flex-end",
    top: 10,
  },

  date: {
    color: Colors.gray_03,
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },

  status: {
    color: Colors.gray_03,
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
  },

  imageContainer: {
    flexDirection: "row",
    marginHorizontal: 30,
    marginTop: 10,
  },

  secondProfileName: {
    color: Colors.gray_03,
    fontFamily: "Inter-Regular",
    fontSize: 10,
    fontStyle: "normal",
    fontWeight: "400",
    marginHorizontal: 5,
    display: "flex",
    alignItems: "center",
  },

  Feedback: {
    display: "flex",
    fontFamily: "Inter-Regular",
    fontSize: 12,
    fontStyle: "normal",
    fontWeight: "400",
    color: Colors.black_03,
    marginTop: 10,
    marginBottom: 16,
    borderLeftWidth: 1,
    paddingLeft: 4,
    borderColor: Colors.gray_04,
  },
});

export default styles;
