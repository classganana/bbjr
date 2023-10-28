import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { FirstCorousel } from '../../components/common/SvgComponent/SvgComponent';

export const ScreenOne = () => {
  const navigation = useNavigation();

  function moveToScreenTwo() {
        navigation.navigate('ScreenTwo' as never);
  }

  return (
    <View style={ScreenOneStyle.container}>
        <View style={ScreenOneStyle.gifContainer}>
            <Image style={ScreenOneStyle.gif} source={require("../../../assets/gifs/first.gif")}></Image> 
        </View>
        <View style={ScreenOneStyle.introContainer}>
            <Text style={ScreenOneStyle.introHeading}>
                Solve Instant Doubts
            </Text>
            <Text style={ScreenOneStyle.introDesc}>
                Instantly conquer confusion! Get answers to your questions and overcome doubts in a snap 
            </Text>
        </View>
        <View style={ScreenOneStyle.buttonSectionContainer}>
            <View style={ScreenOneStyle.buttonContainer}>
                <FirstCorousel height={60} width={100} fill='limegreen' />
            </View>
            <Button label={"Next"} 
                className={LoginButton}
                disabled={false} onPress={moveToScreenTwo}></Button>
        </View>
    </View>
  )
}

const ScreenOneStyle = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        paddingVertical: 40
    },
    gifContainer: {
        flex: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    gif: {
        height: '100%',
        width: '100%',
    },
    introContainer: {
        flex: 4,
        paddingHorizontal: 24,
        justifyContent: 'center'
    },
    introHeading: {
        fontSize: 24,
        fontWeight: "600",
    },
    introDesc: {
        fontSize: 28,
        fontWeight: "500",
    },
    buttonSectionContainer: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        paddingHorizontal: 24,
        backgroundColor: Colors.white,
    },
    buttonContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        borderRadius: 10,
        elevation: 5,
    }
})
