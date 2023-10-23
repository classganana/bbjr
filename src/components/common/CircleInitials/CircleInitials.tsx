import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../../../styles/colors';

interface CircleInitialsProps {
  name: string | undefined;
  size?: number;
}

const CircleInitials: React.FC<CircleInitialsProps> = ({ name, size = 50 }) => {
  // Function to extract initials from the name
  const getInitials = (fullName: string| undefined): string => {
    if (typeof fullName !== 'string' || fullName.trim() === '') {
        // Handle invalid input
        return '';
    }

    const words = fullName.trim().split(' ');
    const initials = words
        .filter((word) => word) // Remove empty strings
        .map((word) => word[0].toUpperCase());

    return initials.join('');
};

  // Function to generate a contrasting text color based on the background color
  const getContrastingColor = (backgroundColor: string): string => {
    // Calculate the luminance of the background color
    const r = parseInt(backgroundColor.slice(1, 3), 16);
    const g = parseInt(backgroundColor.slice(3, 5), 16);
    const b = parseInt(backgroundColor.slice(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

    // Return either black or white text based on luminance
    return luminance > 0.5 ? 'black' : 'white';
  };

  const initials = getInitials(name);

  // Generate a background color based on the initials (for example, based on a hash of the initials)
  const backgroundColor = `#${(initials.charCodeAt(0) * initials.charCodeAt(1) * initials.charCodeAt(2)) % 0x1000000}`;

  return (
    <View style={[styles.circle,{width: size,height: size,borderRadius: size}]}>
      <Text style={{fontSize: size/2, color: getContrastingColor(backgroundColor) }}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary
  },
});

export default CircleInitials;
