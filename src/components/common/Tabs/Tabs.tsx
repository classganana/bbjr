import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";

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
    backgroundColor: "#f2f2f2",
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "blue",
  },
  tabText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  activeTabText: {
    color: "blue",
  },
  indicator: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: "100%",
    backgroundColor: "blue",
  },
});
export default Tabs;
