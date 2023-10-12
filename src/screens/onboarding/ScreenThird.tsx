import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginButton, LoginButton1 } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { GreenCheck, SecondCorousel, ThirdCorousel } from '../../components/common/SvgComponent/SvgComponent';

export const ScreenThird = () => {
    const navigation = useNavigation();

    function moveToScreenThird() {
        navigation.navigate('Login' as never);
    }
    function moveToScreenTwo() {
        navigation.navigate('ScreenTwo' as never);
    }


    return (
        <View style={ScreenOneStyle.container}>
        <View>
            <Image style={ScreenOneStyle.gif} source={require("../../../assets/gifs/third3.gif")}></Image> 
        </View>
        <View style={ScreenOneStyle.intro}>
        <Text style={ScreenOneStyle.introHeading}>
            Class & Subject Practice with AI Zeal
            </Text>
            <View style={ScreenOneStyle.tick}>
               <GreenCheck height={35} width={35} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Practice class-specific questions in various subjects.
            </Text>
            </View>
            <View style={ScreenOneStyle.tick}>
               <GreenCheck height={32} width={32} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Chat with AI Zeal for instant help and guidance.
            </Text>
            </View>
            <View style={ScreenOneStyle.tick}>
               <GreenCheck height={39} width={39} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Watch your progress soar as you keep honing your skills!
            </Text>
            </View>
        </View>
        <View style={ScreenOneStyle.buttonSection}>
            <View>
                <ThirdCorousel height={60} width={100} fill='green' />
            </View>
                </View>
                <View style={ScreenOneStyle.button}>
                <Button label={"Previous"} 
                        className={LoginButton1}
                        disabled={false} onPress={moveToScreenTwo}></Button>
                <Button label={"login"} 
                className={LoginButton}
                disabled={false} onPress={moveToScreenThird}></Button>
        </View>
    </View>
    )
  }
  
  const ScreenOneStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'column',
        position:'relative',
    },
    gif: {
        height: 500, 
        width: "100%"
    },
    intro: {
        paddingHorizontal: 24
    },
    introHeading: {
        fontSize: 24,
        fontWeight: "300"
    },
    introDesc: {
        fontSize: 18,
        fontWeight: "400"
    },
    buttonSection: {
        paddingHorizontal: 24,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tick:{
        flexDirection: 'row',
        gap:10,
    },
    button:{
        // width: "50%" ,
        // position: 'absolute',
        justifyContent:'space-between',
        bottom:20,
        paddingHorizontal:7,
        flexDirection:'row',
    }

})