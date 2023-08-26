import {
  Platform,
  StyleProp,
  Text,
  TextInput,
  TextStyle,
  View,
} from "react-native";
import { InputComponentStyle } from "./InputComponentStyle";

export interface InputComponentProps {
  label?: string;
  name: string;
  placeholder: string;
  className: {
    label: StyleProp<TextStyle>;
    inputBox: StyleProp<any>;
  };
  secureTextEntry?: boolean;
  onChange: any;
}

export const InputComponent = ({
  label,
  placeholder,
  name,
  onChange,
  secureTextEntry,
}: InputComponentProps) => {
  return (
    <>
      <View style={InputComponentStyle.container}>
        <Text style={InputComponentStyle.title}>{label}</Text>
        <TextInput
          style={InputComponentStyle.input}
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          key={name}
          onChangeText={(text) => onChange(text)}
          onChange={onChange}
        />
      </View>
    </>
  );
};
