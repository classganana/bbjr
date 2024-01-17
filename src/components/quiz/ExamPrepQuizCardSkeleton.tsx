import React from 'react';
import { View, StyleSheet } from 'react-native';

const ExamPrepQuizCardSkeleton = () => {
  const skeletonStyles = StyleSheet.create({
    skeleton: {
      backgroundColor: '#E0E0E0',
      borderRadius: 10,
      marginBottom: 10,
    },
    skeletonText: {
      backgroundColor: '#E0E0E0',
      borderRadius: 5,
      height: 14,
      width: '80%',
      marginBottom: 6,
    },
  });

  return (
    <View style={skeletonStyles.skeleton}>
      <View style={{ flexDirection: 'row', padding: 14, alignItems: 'center' }}>
        <View style={{ width: 64, height: 64, backgroundColor: '#D9D9D9', borderRadius: 12 }} />
        <View style={{ flex: 1, marginLeft: 14 }}>
          <View style={skeletonStyles.skeletonText} />
          <View style={skeletonStyles.skeletonText} />
          <View style={skeletonStyles.skeletonText} />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
            <View style={{ width: '30%', height: 14, backgroundColor: '#E0E0E0', borderRadius: 5 }} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default ExamPrepQuizCardSkeleton;
