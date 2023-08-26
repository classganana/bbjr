import {
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

export interface Props {
  label: string | any;
  className?: {
    container?: StyleProp<ViewStyle> | StyleProp<any>;
    title?: StyleProp<TextStyle>;
  };
  disabled: boolean;
  onPress: () => void;
  styles?: StyleProp<any>;
}

export const Button = (props: Props) => {
  return (
    <>
      <TouchableOpacity
        style={[
          props.className?.container,
          props.disabled
            ? styles.disabledContainer
            : props.className?.container,
          props.styles,
        ]}
        onPress={props.onPress}
      >
        <View style={[props.className?.container, props.styles]}>
          <Text style={props.className?.title}>{props.label}</Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  // Add your disabled styles here
  disabledContainer: {
    opacity: 0.5,

    // Add any other styles you want to apply to the disabled container
  },
  disabledTitle: {
    // Add any styles you want to apply to the text when the button is disabled
  },
});
