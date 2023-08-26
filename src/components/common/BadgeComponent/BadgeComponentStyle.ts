import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

export const BadgeComponentStyle = StyleSheet.create({
  container: {
    height: 30,
    width: 30,
    position: "relative",
  },
  badgeIcon: {
    width: 15,
    height: 15,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.red,
    borderRadius: 50,
    fontSize: 10,
    position: "absolute",
    top: 0,
    right: 0,
  },
});
