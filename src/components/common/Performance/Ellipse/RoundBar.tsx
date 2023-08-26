import React from 'react';
import { View, Text } from 'react-native';
import { Svg, Circle } from 'react-native-svg';
import { Colors } from '../../../../styles/colors';

interface EllipsePercentageProps {
  size: number;
  progress: number;
  strokeWidth: number;
}

const EllipsePercentage: React.FC<EllipsePercentageProps> = ({
  size,
  progress,
  strokeWidth,
}) => {
  const outerRadius = (size - strokeWidth) / 2;
  const innerRadius = outerRadius - strokeWidth;
  const outerCircumference = 2 * Math.PI * outerRadius;
  const innerCircumference = 2 * Math.PI * innerRadius;
  const outerOffset = outerCircumference - (progress / 100) * outerCircumference;
  const innerOffset = innerCircumference - (progress / 100) * innerCircumference;

  const fontSize = size * 0.25;


  return (
    <View style={{ position: 'relative', width: size, height: size }}>
      <Svg width={size} height={size} viewBox={`0 -1 ${size} ${size}`} style={{ transform: [{ rotate: '-90deg' }], position: 'absolute' }}>
        {/* Outer blue circle */}
        <Circle
          r={outerRadius - 2}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="#5BA1ED"
          strokeWidth={strokeWidth - 9}
        />
        <Circle
          r={innerRadius - 1}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="#5BA1ED"
          strokeWidth={strokeWidth - 9}
        />
        {/* Inner blue circle */}
        <Circle
          r={innerRadius + 1}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="#5BA1ED"
          strokeWidth={strokeWidth}
          strokeDasharray={[innerCircumference, innerCircumference]}
          strokeDashoffset={innerOffset}
        />
        {/* Outer transparent circle (to hide the blue bar outside the progress) */}
        <Circle
          r={outerRadius + 1}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={[outerCircumference, outerCircumference]}
          strokeDashoffset={outerOffset}
        />
      </Svg>
      <Text
        style={{
          position: 'absolute',
          top: size / 2 - fontSize / 2, // Center vertically
          left: size / 2 - fontSize / 2, // Center horizontally
          textAlign: 'center',
          fontSize: 12,
          fontWeight: 'bold',
          color: Colors.blue_01, // You can customize the color of the percentage text
        }}
      >
        {`${progress}%`}
      </Text>
    </View>
  );
};

export default EllipsePercentage;