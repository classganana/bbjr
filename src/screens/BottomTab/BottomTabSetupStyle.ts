import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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