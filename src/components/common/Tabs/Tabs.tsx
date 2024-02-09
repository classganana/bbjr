import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";

interface TabsProps {
  activeTab: string;
  tabs: string[];
  onChangeTab: (tab: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, tabs, onChangeTab }) => {
  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab}
          style={[styles.tab, activeTab === tab && styles.activeTab]}
          onPress={() => onChangeTab(tab)}
        >
          <Text
            style={[styles.tabText, activeTab === tab && styles.activeTabText]}
          >
            {tab}
          </Text>
          {activeTab === tab && <View style={styles.indicator} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.secondary,
    padding: 6,
    borderRadius: 10
    // backgroundColor: "#f2f2f2",
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    overflow: 'hidden'
  },
  activeTab: {
    backgroundColor: Colors.primary,
    color: Colors.white,

  },
  tabText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.gray_19
  },
  activeTabText: {
    color: Colors.white
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: Colors.primary,
  },
});
export default Tabs;
