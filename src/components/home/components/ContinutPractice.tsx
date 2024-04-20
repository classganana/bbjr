import React from 'react'
import { Image, Platform, StyleSheet, Text, View } from 'react-native'
import { CancelButton, StartExamPrep } from '../../common/ButttonComponent/ButtonStyles'
import { Button } from '../../common/ButttonComponent/Button'
import { Colors } from '../../../styles/colors'

type Props = {
    onPress: () => void;
}

export const ContinutPractice = (props: Props) => {
  return (
    <View style={style.container}>
        {/* <Text style={style.mainHeading}>
            Continue Practice
        </Text> */}
        <View style={style.block}>
            <Image style={style.image} source={require('../../../../assets/png/practice.png')} />
            <View style={style.rightBlock}>
                <Text style={style.heading}>Welcome aboard!</Text>
                <Text style={style.infoText}>Start practicing now and unlock your potential!</Text>
                <Button label={'Start Exam Prep'} 
                    disabled={false} 
                    className={StartExamPrep} 
                    onPress={props.onPress} />
            </View>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
    container: {
        marginVertical: 1,
        flex: 1,
        padding: 14,
        borderRadius: 12,
        alignSelf: 'center',
        width: '98%',
        backgroundColor: '#F5F7FF',
        borderColor: Colors.white,
        borderWidth: 0.1,
        marginTop: 10,
        paddingVertical: 20,
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0, 0, 0, 0.15)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 8,
          },
          android: {
            // elevation: 1,
          },
        }),
    },
    image: {
        height: 100,
        width: 100
    },
    block: {
        flexDirection: 'row',
        justifyContent:"center",
        gap: 20,
        width: "100%"
    },
    rightBlock: {
        width: "50%",
        alignItems: 'center',
    },
    heading: {
        color: "#3D3D3D",
        fontSize: 18,
        fontWeight: '600'
    },
    infoText: {
        fontSize: 14,
        marginTop: 10,
        textAlign: 'center',
        marginBottom: 20,
        color: "#4D4D4D",
        lineHeight: 20,
    },
    mainHeading: {
        color: "#1E1E1E",
        fontSize: 12,
        fontWeight: '500',
        marginBottom: 15
    }
})
