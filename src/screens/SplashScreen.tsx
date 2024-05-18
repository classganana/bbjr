import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../styles/colors'

export const SplashScreen = () => {
    return (
        <View style={spStyle.container}>
            <View style={spStyle.logoContainer}>
                <Text style={spStyle.logoText}>
                    BRAIN BOOSTER Jr.
                </Text>
                <Text style={spStyle.logoInfoText}>Ultimate Education Companion</Text>
            </View>
            <View style={spStyle.parentCompany} >
                <Text style={spStyle.from}>From</Text>
                <Text style={spStyle.parentCompanyName}>ITonic Labs</Text>
            </View>
        </View>
    )
}

const spStyle = StyleSheet.create({
    container: {
        position: 'relative',
        flex: 1,
        width: "100%",
        alignItems: 'center',
        backgroundColor: Colors.primary,
        justifyContent: 'center',
    },
    logoContainer: {
        alignItems: 'center',
    },
    logo: {
        height: 200,
        width: 200
    },
    logoText: {
        fontFamily: 'Open-Sans',
        fontSize: 30,
        fontWeight: '600',
        color: Colors.white
    },
    logoInfoText: {
        fontWeight: '600',
        fontSize: 14,
        color: Colors.white
    },
    parentCompany: {
        position: 'absolute',
        bottom: 100,
        alignItems: 'center'
    },
    from: {
        color: Colors.white,
        fontSize: 8
    },
    parentCompanyName: {
        color: Colors.white,
        fontSize: 12
    }
})
