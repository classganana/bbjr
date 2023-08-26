import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    perc: number
}

export const ProgressBar = (props: Props) => {
    const perc = props.perc + "%";

    return (
        <View>
            <Text style={ProgressBarStyle.infoText}>{props.perc} Points earned </Text>
        <View style={ProgressBarStyle.container}>
            <View style={[ProgressBarStyle.progress, { width: props.perc }]}></View>
            </View>
        </View>
    );
}

const ProgressBarStyle = StyleSheet.create({
    container: {
        backgroundColor: "#D9D9D9",
        width: "100%",
        height: 20,
        borderRadius: 20,
        overflow: 'hidden',

    },
    progress: {
        backgroundColor: '#999999',
        height: '100%',
    },
    infoText: {
        color: "#5E5E5E"
    }
});
