import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../styles/colors';

type Props = {
    label: string,
    perc: number,
}

export const ExamPrepProgressBar = (props: Props) => {
    const perc = props.perc + "%";

    return (
        <View style={{width: "100%"}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={ProgressBarStyle.infoText}>{props.label} </Text>
                <Text style={ProgressBarStyle.infoText}>{props.perc? props.perc: 0}%</Text>
            </View>
        <View style={ProgressBarStyle.container}>
            <View style={[ProgressBarStyle.progress, { width: `${props.perc}%` }]}></View>
            </View>
        </View>
    );
}

const ProgressBarStyle = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
        width: "100%",
        height: 14,
        borderRadius: 20,
        overflow: 'hidden',
        borderWidth: 0.5,
        borderColor: '#B6B6B6',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 1, // For Android shadow

    },
    progress: {
        // opacity: 0.4,
        backgroundColor: Colors.primary,
        height: '100%',
    },
    infoText: {
        color: "#5E5E5E",
        paddingBottom: 2
    }
});
