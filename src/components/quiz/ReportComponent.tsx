import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Colors } from '../../styles/colors';

function ReportComponent() {
  return (
    <View style={styles.container}>
        {/* <View style={styles.TextContainer}> */}
        <Text style={styles.Text}> What seems to be the problem?</Text>
        <Text style={styles.text}>Your feedback will help us to improve your test taking experience</Text>
        {/* </View> */}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display:'flex',
        paddingHorizontal:20,
        paddingVertical:20,
        gap:19,
    },
    Text:{
    color:Colors.black_01,
    fontFamily: 'Inter-Regular',  
    fontSize: 16, 
    fontWeight: '500', 
    },
    text:{
    color: Colors.light_gray_04,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    }
});

export default ReportComponent