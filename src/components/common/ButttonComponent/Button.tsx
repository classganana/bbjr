import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from "react-native";

export interface Props {
  label: string | any;
  className?: {
    container?: StyleProp<ViewStyle>;
    title?: StyleProp<TextStyle>;
  };
  disabled: boolean;
  onPress: () => void;
  styles?: StyleProp<ViewStyle>;
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: string;
}

export const Button = (props: Props) => {
  const handlePress = ()=>{
    props.disabled ? undefined : props.onPress()
  }
  return (
    <TouchableWithoutFeedback
      onPress={handlePress}
    >
      <View
        style={[
          styles.container,
          props.className?.container,
          props.disabled && styles.disabledContainer,
          props.styles,
        ]}
      >
        <Text
          style={[
            styles.title,
            props.className?.title,
            props.disabled && styles.disabledTitle,
          ]}
        >
          {props.label}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  title: {
    color: "white",
    textAlign: "center",
  },
  disabledContainer: {
    opacity: 0.8,
    // backgroundColor: "gray",
  },
  disabledTitle: {
    // You can add styles for the text when the button is disabled here
  },
});
