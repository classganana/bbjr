import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

export const ContinutPractice = () => {
  return (
    <View style={style.container}>
        <Text>
            Continue Practice
        </Text>
        <View>
            <Image style={style.image} source={require('../../../../assets/png/practice.png')} />
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "rgba(232, 238, 240, 0.38)"
    },
    image: {
        height: 100,
        width: 100
    }
})
