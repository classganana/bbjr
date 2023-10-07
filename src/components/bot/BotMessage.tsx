import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { BotIcon } from '../common/SvgComponent/SvgComponent'

export const BotMessage = ({text}: any) => {

  return (
    <View style={botMsg.container}>
        <View>
            <BotIcon height={32} width={32} fill={'red'}  />
        </View>
        <View style={botMsg.messageContainer}>
            <Text>
                {text}
            </Text>
        </View>
    </View>
  )
}

const botMsg = StyleSheet.create({
    container: {
        // flex: 1,
        width: "100%",
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-end',
        paddingHorizontal: 10
    },
    messageContainer: {
        marginTop: 10,
        padding: 20,
        width: "90%",
        borderTopStartRadius: 20,
        borderBottomEndRadius: 20,
        borderTopEndRadius: 20,
        elevation: 4, // For Android
        shadowColor: 'rgba(0, 0, 0, 0.15)', // For iOS
        shadowOffset: { width: 0, height: 0 }, // For iOS
        shadowOpacity: 1, // For iOS
        shadowRadius: 8, // For iOS
    }
})