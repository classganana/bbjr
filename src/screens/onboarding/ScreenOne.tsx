import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { FirstCorousel, GreenCheck } from '../../components/common/SvgComponent/SvgComponent';

export const ScreenOne = () => {

    const navigation = useNavigation();

    function moveToScreenTwo() {
        navigation.navigate('ScreenTwo' as never);
    }

    return (
        <View style={ScreenOneStyle.container}>
            <TouchableWithoutFeedback onPress={moveToScreenTwo }>
            <Text style={{ fontSize: 24 , fontWeight: "500", position: 'absolute',zIndex:10, right:10,top:10 , color:'#006B7F' }}>
                    Skip
                </Text>
                </TouchableWithoutFeedback>
                {/* </TouchableOpacity> */}
            <View style={ScreenOneStyle.img}>
                <Image style={ScreenOneStyle.gif} source={require("../../../assets/gifs/first2.gif")}></Image>
            </View>
            <View style={ScreenOneStyle.intro}>
                <Text style={ScreenOneStyle.introHeading}>
                   Your Personalized Study Companion
                </Text>
                <View style={ScreenOneStyle.tick}>
                    <GreenCheck height={25} width={25} fill='green' />
                <Text style={ScreenOneStyle.introDesc}>
                    Master your subjects like never before!
                </Text>
                </View>
                <View style={ScreenOneStyle.tick}>
                    <GreenCheck height={30} width={30} fill='green' />
                <Text style={ScreenOneStyle.introDesc}>
                    Get ready for a supercharged learning experience!
                </Text>
                </View>
                <View style={ScreenOneStyle.tick}>
                    <GreenCheck height={25} width={25} fill='lime' />
                <Text style={ScreenOneStyle.introDesc}>
                    Chat with our AI.
                </Text>
                </View>
            </View>
            <View style={ScreenOneStyle.corouse}>
                <FirstCorousel height={60} width={100} fill='green' />
            </View>
            <View style={ScreenOneStyle.buttonSection}>
            </View>
            <View style={{ width: "40%" , position: 'absolute', right:0, bottom:110 ,}}>
                <Button label={"Next"}
                    className={LoginButton}
                    disabled={false} onPress={moveToScreenTwo}></Button>
            </View>
        </View>
    )
}

const ScreenOneStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.tan,
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
        fontWeight: "500"
    },
    introDesc: {
        fontSize: 18,
        fontWeight: "500"
    },
    buttonSection: {
        paddingHorizontal: 24,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        },
    corouse: {
        alignItems: 'center',
        justifyContent: 'center',

    },
    img: {
        backgroundColor:Colors.tan,
        position:'relative',
    },
    tick:{
        flexDirection: 'row',
        gap:10,
    }
})