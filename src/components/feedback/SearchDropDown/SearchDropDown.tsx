import React, { useState, useMemo, useEffect } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { defalutSearchDropdownStyle } from "./SearchDropDownStyle";
import {
  CrossIcon,
  DropdownComponentIcon,
  SearchIcon,
} from "../../common/SvgComponent/SvgComponent";
import Checkbox from "expo-checkbox";
import { Colors } from "../../../styles/colors";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type Props = {
  label: string;
  list: any[];
  onItemsSelected: (items: any[]) => void;
};

export const SearchDropdown: React.FC<Props> = ({
  label,
  list,
  onItemsSelected,
}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any[]>([]);

  useEffect(() => {
    onItemsSelected(selectedItem); // Notify parent about the updated items
  }, [selectedItem, onItemsSelected]);

  function setChecked(item: any) {
    setSelectedItem((prev: any[]) => {
      const index = prev.findIndex(
        (selectedItem) => selectedItem.name === item.name
      );
      if (index !== -1) {
        // Item already exists, remove it from the array
        const updatedItems = prev.filter(
          (selectedItem) => selectedItem.name !== item.name
        );
        return updatedItems;
      } else {
        // Item doesn't exist, add it to the array
        const updatedItems = [...prev, item];
        return updatedItems;
      }
    });
  }

  function removeItem(item: any) {
    console.log(item);
    setSelectedItem((prev: any[]) => {
      return prev.filter((selectedItem) => selectedItem.name !== item.name);
    });
  }

  const checkIfItemIsSelected = useMemo(() => {
    const selectedNames = selectedItem.map((selected) => selected.name);
    return (item: any) => selectedNames.includes(item.name);
  }, [selectedItem]);

  const onClick = () => {
    setToggleDropdown(true);
  };

  const closeDropdown = () => {
    setToggleDropdown(false);
  };

  const DropdownItems: React.FC = () => {
    return (
      <View style={defalutSearchDropdownStyle.dropdownListontainer}>
        <View style={defalutSearchDropdownStyle.inputFieldContainer}>
          <SearchIcon height={15} width={20} fill={"#858282"} />
          <TextInput
            style={defalutSearchDropdownStyle.inputField}
            placeholder="Search names"
          />
          <TouchableWithoutFeedback onPress={closeDropdown}>
            <CrossIcon height={20} width={32} fill={"red"} />
          </TouchableWithoutFeedback>
        </View>
        {list.map((item, index) => (
          <TouchableOpacity
            onPress={() => setChecked(item)}
            style={defalutSearchDropdownStyle.dropdownItem}
            key={index}
          >
            <View style={defalutSearchDropdownStyle.dropdownItemImageSection}>
              <Image
                source={{ uri: item.imageUrl }}
                style={defalutSearchDropdownStyle.image}
              />
              <Text>{item.name}</Text>
            </View>
            <Checkbox
              value={checkIfItemIsSelected(item)}
              onValueChange={() => setChecked(item)}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const ChipsSection = () => {
    return (
      <View style={defalutSearchDropdownStyle.chipsContainer}>
        {selectedItem.map((item, index) => {
          return (
            <View style={defalutSearchDropdownStyle.chips} key={index}>
              <Image
                source={{ uri: item.imageUrl }}
                style={defalutSearchDropdownStyle.image}
              />
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => removeItem(item)}>
                <View style={{ width: "100%" }}>
                  <CrossIcon height={20} width={32} fill={Colors.gray_03} />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View style={defalutSearchDropdownStyle.container}>
      <View>
        <Text>{label}</Text>
      </View>
      <View>
        <TouchableWithoutFeedback
          style={[
            defalutSearchDropdownStyle.dropdownValueContainer,
            toggleDropdown
              ? defalutSearchDropdownStyle.dropdownLabelWithShadow
              : defalutSearchDropdownStyle.dropdownValueContainer,
          ]}
          onPress={onClick}
        >
          {selectedItem.length ? (
            <ChipsSection />
          ) : (
            <Text style={defalutSearchDropdownStyle.label}>DropdownField</Text>
          )}
          <DropdownComponentIcon height={30} width={16} fill={"#1C1C1C"} />
        </TouchableWithoutFeedback>
        {toggleDropdown ? (
          <DropdownItems />
        ) : (
          <Text style={{ display: "none" }}> </Text>
        )}
      </View>
    </View>
  );
};
