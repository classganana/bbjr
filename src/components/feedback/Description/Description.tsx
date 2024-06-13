import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  BackHandler,
} from "react-native";
import { Colors } from "../../../styles/colors";
import { useNavigation } from "@react-navigation/native";

interface DescriptionComponentProps {
  placeholder: string;
  title: string;
  onDescriptionChange?: (text: string) => void;
}

export const Description: React.FC<DescriptionComponentProps> = ({
  placeholder,
  title,
  onDescriptionChange,
}) => {
  const [description, setDescription] = useState("");
  const navigation = useNavigation();

  const handleDescriptionChange = (text: string) => {
    setDescription(text);
    // Call the function provided by the parent with the updated description
    if (onDescriptionChange) {
      onDescriptionChange(text);
    }
  };

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove(); // Remove the event listener when the component unmounts
  }, [navigator]);


  const handleTapOutside = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleTapOutside}>
      <View>
        {/* Title */}
       {title && <Text style={styles.title}>{title}</Text>}
        {/* TextInput */}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray_11}
          value={description}
          onChangeText={handleDescriptionChange}
          multiline
          textAlignVertical="top"
          onSubmitEditing={handleTapOutside} // Close keyboard on return key press
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    fontFamily: "Inter-Regular",
    marginBottom: 5,
  },
  input: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    height: 159,
    backgroundColor: Colors.white,
    borderColor: Colors.black_04,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    shadowColor: Colors.shadow_color,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    paddingVertical: 10,
  },
});
