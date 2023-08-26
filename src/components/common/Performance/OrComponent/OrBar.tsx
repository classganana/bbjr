import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../../styles/colors';

interface HorizontalBarWithORProps {
  color?: string;
  height?: number;
}

const HorizontalBarWithOR: React.FC<HorizontalBarWithORProps> = ({ color = 'grey', height = 1 }) => {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { backgroundColor: color, height }]} />
      <Text style={styles.orSymbol}>OR</Text>
      <View style={[styles.bar, { backgroundColor: color, height }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    widht: 50,
    gap: 20
  },
  bar: {
    height: 2,
    width: "30%",
  },
  margin: {}
  ,
  orSymbol: {
    fontSize: 20,
    color: Colors.gray_11,
  },
});

export default HorizontalBarWithOR;