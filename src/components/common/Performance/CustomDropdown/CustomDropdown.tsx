import React, { useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Colors } from "../../../../styles/colors";


type CustomDropdownProps = {
  label: string;
  dropdownPlaceholder: string;
  list: { label: string }[];
};

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  dropdownPlaceholder,
  list,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>(dropdownPlaceholder);

  const handleDropdownSelect = (itemLabel: string) => {
    setSelectedItem(itemLabel);
    setInputValue(itemLabel);
    setDropdownVisible(false);
  };

  const handleInputPress = () => {
    setDropdownVisible(!isDropdownVisible);
  };


  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  const HideStar = label === "Select Exam" || label === "Select Subject";

  return (
    <TouchableWithoutFeedback onPress={handleDropdownClose}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleInputPress}>
          <View>
            <View style={styles.label}>
              <Text style={styles.labeltext}>{label}</Text>
              {!HideStar && <Text style={styles.star}> *</Text>}
            </View>
            <View style={styles.inputcontainer}>
              <Text style={styles.inputValue}>{inputValue}</Text>
              <Text style={styles.icon}>{isDropdownVisible ? "▲" : "▼"}</Text>
            </View>
          </View>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdowncontainer}>
            <FlatList
              data={list}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.dropdownOption}
                  onPress={() => handleDropdownSelect(item.label)}
                >
                  <Text>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
  },

  inputcontainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingLeft: 10,
    top: 3,
    padding: 10,
    elevation: 4,
    shadowColor: Colors.shadow_color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5
  },

  label: {
    display: "flex",
    flexDirection: "row",

  },

  labeltext: {
    fontSize: 12,
    fontFamily: "Inter-Regular",
    paddingHorizontal: 4,
  },

  star: {
    color: Colors.red,
  },

  icon: {
    marginHorizontal: 5,
  },

  dropdowncontainer: {
    elevation: 20,
    shadowColor: Colors.black_03,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderColor: Colors.black_01,
    borderRadius: 5,
    padding: 10,
    width: "100%",
    backgroundColor: Colors.white,
  },

  dropdownOption: {
    paddingVertical: 5,
  },

  inputValue: {
    color: Colors.gray_09,
  }
});
