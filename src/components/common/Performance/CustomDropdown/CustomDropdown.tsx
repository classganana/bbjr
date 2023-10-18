import React, { useState } from "react";
import {
  ScrollView,
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { Colors } from "../../../../styles/colors";

type CustomDropdownProps = {
  label: string;
  dropdownPlaceholder: string;
  list: { label: string | number }[];
  defaultSelectedItem?: any;
};

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  dropdownPlaceholder,
  list,
  defaultSelectedItem,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | number>(
    defaultSelectedItem
  );
  const [inputValue, setInputValue] = useState<string | number>(
    dropdownPlaceholder
  );

  const handleDropdownSelect = (itemLabel: string | number) => {
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
              <Text style={styles.labeltext}>
                {label}
                {!HideStar && <Text style={styles.star}> *</Text>}
              </Text>
            </View>
            <View style={styles.inputcontainer}>
              <Text style={styles.inputValue}>{inputValue}</Text>
              <Text style={styles.icon}>
                {isDropdownVisible ? "▲" : "▼"}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {isDropdownVisible && (
          <View style={styles.dropdowncontainer}>
            {/* <View
              style={{ maxHeight: 400 }} // Set a maximum height for scrolling
            > */}
              <FlatList
                data={list}
                keyExtractor={(item) => item.label.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.dropdownOption}
                    onPress={() => handleDropdownSelect(item.label)}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                )}
              />
            {/* </View> */}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: Colors.white,
    elevation: 4,
    shadowColor: Colors.shadow_color,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 0.5,
    borderRadius: 10,
    display: "flex",
  },

  inputcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    padding: 10,
  },

  label: {
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
    backgroundColor: Colors.gray_01,
    zIndex: 100,
    height: 100
  },

  dropdownOption: {
    paddingVertical: 5,
  },

  inputValue: {
    color: Colors.gray_09,
  },
});
