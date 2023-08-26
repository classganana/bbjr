import {
  Text,
  TouchableOpacity,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";
import React, { ReactNode } from "react";

interface Props {
  onPress: () => void;
  icon: ReactNode;
  label: string;
  pos: "left" | "right";
  className?: {
    container?: StyleProp<ViewStyle> | StyleProp<any>;
    title?: StyleProp<TextStyle>;
  };
  backgroundColor: string;
  style?: StyleProp<ViewStyle>;
}

export const IconButton: React.FC<Props> = ({
  onPress,
  icon,
  label,
  pos,
  backgroundColor,
  style,
  className,
}) => {
  const containerStyle: StyleProp<ViewStyle> = [
    className?.container,
    pos === "right" && { flexDirection: "row-reverse" },
    { backgroundColor },
    style,
  ];

  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <View>{icon}</View>
      <Text style={className?.title}>{label}</Text>
    </TouchableOpacity>
  );
};
