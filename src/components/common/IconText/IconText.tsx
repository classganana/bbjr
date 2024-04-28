import { StyleSheet, Text, View } from "react-native";

export const IconText = ({
  icon,
  text,
}: {
  icon: JSX.Element;
  text: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>{icon}</View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    gap: 10,
    width: "100%",
  },
  icon: {},
  textContainer: {
    flex: 1,
  },
  text: {
  },
});
