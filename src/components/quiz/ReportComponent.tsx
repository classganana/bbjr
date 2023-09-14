import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Colors } from '../../styles/colors';
import { Button } from '../common/ButttonComponent/Button';
import { OutlineButton } from '../common/ButttonComponent/ButtonStyles';


function ReportComponent() {
    const buttons = ['Incorrect or incomplete question', 'Incorrect or incomplete Options', 'Formatting or image quality issue'];
      
    return (
        <>
            <View style={styles.container}>
                <Text style={styles.Text}> What seems to be the problem?</Text>
                <Text style={styles.text}>Your feedback will help us to improve your test taking experience</Text>
                {buttons.map((buttonLabel, index) => (
                    <TouchableOpacity  >
                        <View style={styles.Button} key={index}>
                            <Text>{buttonLabel}</Text>
                            <View style={styles.optionMarker}>
                                <View style={styles.markesign}></View>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

            {/* <View style={{display:"flex",width:"100%",flex:1}}>
            <Button label={'cancel'} disabled={false} className={OutlineButton} onPress={function (): void {
                throw new Error('Function not implemented.');
            }}></Button>
            </View> */}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 20,
        gap: 19,
    },
    Text: {
        color: Colors.black_01,
        fontFamily: 'Inter-Regular',
        fontSize: 16,
        fontWeight: '500',
    },
    text: {
        color: Colors.light_gray_04,
        fontFamily: 'Inter-Regular',
        fontSize: 14,
        fontStyle: 'normal',
        fontWeight: '400',
    },
    Button: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#FFF',
        padding: 12,
        marginBottom: 8,
        borderRadius: 12,
        borderWidth: 0.5,
        borderColor: 'rgba(0, 107, 127, 0.35)',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 4,
        elevation: 2, // for Android shadow
    },
    optionMarker: {
        width: 14,
        height: 14,
        borderRadius: 8,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#006B7F',   
    },
    markesign:{
        width: 10,
        height: 10,
        borderRadius: 6,
        backgroundColor: '#006B7F',
        justifyContent: 'center',
        alignItems: 'center',
        // marginRight: 10,
        // borderWidth: 0.5, 
    }
});

export default ReportComponent;
