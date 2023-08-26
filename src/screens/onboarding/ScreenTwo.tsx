import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { SecondCorousel } from '../../components/common/SvgComponent/SvgComponent';


export const ScreenTwo = () => {

    const navigation = useNavigation();

    function moveToScreenThird() {
          navigation.navigate('ScreenThird' as never);
    }
  
    return (
        <View style={ScreenOneStyle.container}>
        <View>
            <Image style={ScreenOneStyle.gif} source={require("../../../assets/gifs/second.gif")}></Image> 
        </View>
        <View style={ScreenOneStyle.intro}>
            <Text style={ScreenOneStyle.introHeading}>
                Solve Instant Doubts
            </Text>
            <Text style={ScreenOneStyle.introDesc}>
                Instantly conquer confusion! Get answers to your questions and overcome doubts in a snap 
            </Text>
        </View>
        <View style={ScreenOneStyle.buttonSection}>
            <View>
                <SecondCorousel height={60} width={100} fill='green' />
            </View>
            <View style={{width: "50%"}}>
                <Button label={"Next"} 
                className={LoginButton}
                disabled={false} onPress={moveToScreenThird}></Button>
            </View>
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
        fontWeight: "600"
    },
    introDesc: {
        fontSize: 28,
        fontWeight: "500"
    },
    buttonSection: {
        paddingHorizontal: 24,
        backgroundColor: Colors.white,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
})