import React from 'react';
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button';
import { useNavigation } from '@react-navigation/native';
import { LoginButton, LoginButton1 } from '../../components/common/ButttonComponent/ButtonStyles';
import { Colors } from '../../styles/colors';
import { GreenCheck, SecondCorousel } from '../../components/common/SvgComponent/SvgComponent';


export const ScreenTwo = () => {

    const navigation = useNavigation();

    function moveToScreenThird() {
          navigation.navigate('ScreenThird' as never);
    }
    function moveToScreenOne() {
        navigation.navigate('ScreenOne' as never);
  }
    // const labels = ['Level up your knowledge with interactive quizzes!','Compete, learn, and climb the leader board!','Quiz your way to becoming a champion!.']
    
  
    return (
        <View style={ScreenOneStyle.container}>
            <TouchableWithoutFeedback onPress={moveToScreenThird}>
            <Text style={{ fontSize: 24 , fontWeight: "500", position: 'absolute',zIndex:10, right:10,top:10 , color:'#006B7F' }}>
                    Skip
                </Text>
                </TouchableWithoutFeedback>
        <View>
            <Image style={ScreenOneStyle.gif} source={require("../../../assets/gifs/second2.gif")}></Image> 
        </View>
        <View style={ScreenOneStyle.intro}>
            <Text style={ScreenOneStyle.introHeading}>
            Boost Your Knowledge
            </Text>
            <View style={ScreenOneStyle.tick}>
                    <GreenCheck height={28} width={28} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Level up your knowledge with interactive quizzes!
            </Text>
            </View>
            <View style={ScreenOneStyle.tick}>
               <GreenCheck height={25} width={25} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Compete, learn, and climb the leader board!
            </Text>
            </View>
            <View style={ScreenOneStyle.tick}>
               <GreenCheck height={25} width={25} fill='green' />
            <Text style={ScreenOneStyle.introDesc}>
            Quiz your way to becoming a champion!.
            </Text>
            </View>
        </View>
        <View style={ScreenOneStyle.buttonSection}>
            <View style={{position: 'relative'}}>
                <SecondCorousel height={60} width={100} fill='green' />
            </View>
                </View>
            <View style={ScreenOneStyle.button}>
                <Button label={"Previous"} 
                        className={LoginButton1}
                        disabled={false} onPress={moveToScreenOne}></Button>
                <Button label={"Next"} 
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
        // flexDirection: 'column',
        position:'relative',
    },
    gif: {
        height: 500, 
        width: "100%"
    },
    intro: {
        paddingHorizontal: 24,
        width:'100%',
        marginBottom:0,

         
    },
    introHeading: {
        fontSize: 24,
        fontWeight: "600"
    },
    introDesc: {
        fontSize: 18,
        fontWeight: "500"
    },
    buttonSection: {
        paddingHorizontal: 24,
        backgroundColor: Colors.white,
        display: 'flex',
        // flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // top:0
    },
    tick:{
        flexDirection: 'row',
        gap:10,
    },
    button:{
        width: "60%" ,
        // position: 'absolute',
        justifyContent:'space-between',
        bottom:15,
        // paddingHorizontal:7,
        flexDirection:'row',
        gap:200,
    }

})