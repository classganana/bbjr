import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../../styles/colors';

type Props = {
    label: string,
    perc: number,
}

export const ProgressBar = (props: Props) => {
    const perc = props.perc + "%";

    return (
        <View>
            <Text style={ProgressBarStyle.infoText}>{props.label} </Text>
        <View style={ProgressBarStyle.container}>
            <View style={[ProgressBarStyle.progress, { width: props.perc }]}></View>
            </View>
        </View>
    );
}

const ProgressBarStyle = StyleSheet.create({
    container: {
        backgroundColor: "#006B7F47",
        width: "100%",
        height: 14,
        borderRadius: 20,
        overflow: 'hidden',

    },
    progress: {
        backgroundColor: Colors.white,
        height: '100%',
    },
    infoText: {
        color: "#5E5E5E",
        paddingBottom: 2
    }
});
