import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../styles/colors';
import { ArrowIcon, ArrowLeft, FirstCorousel } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { CancelButton, LoginButton, OutlineButton, TryAgain } from '../../components/common/ButttonComponent/ButtonStyles';

export const Onboard = () => {
    const [i, setI] = useState(0);
    const data = [
        {
            image: require('../../../assets/gifs/quizzes.gif'),
            title: "Personalized Quiz",
            info: "Combining the best of AI and language science, lessons are tailored to help you learn at just the right level and pace.",
            dots: require('../../../assets/png/fdots.png')
        },
        {
            image: require('../../../assets/gifs/doubt.gif'),
            title: "The free, fun, and effective way to solve doubts!",
            info: "Learning with Eduzy is fun, and research shows that it works.",
            dots: require('../../../assets/png/mdots.png')
        },
        {
            image: require('../../../assets/gifs/examprep.gif'),
            title: "Fun & Effective Exam preparation",
            info: "Learning with Eduzy is fun, and research shows that it works.",
            dots: require('../../../assets/png/ldots.png')
        },
    ];

    const next = () => {
        if (i == 2) setI(0);
        else setI(i + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.dynamicContent}>
                <Image style={styles.gif} source={data[i].image} />
                <Text style={styles.heading}>{data[i].title}</Text>
                <Text style={styles.infoText}>{data[i].info}</Text>
                <Image style={styles.dots} source={data[i].dots} />
            </View>
            <View style={[styles.footer, i == 2 && {gap: 16}]}>
                {i < 2 && <><TouchableOpacity onPress={next} style={styles.next}>
                    <ArrowLeft height={24} width={24} fill={'white'} />
                </TouchableOpacity><TouchableOpacity onPress={next}>
                        <Text style={styles.skip}>Skip</Text>
                    </TouchableOpacity></>}
                { i == 2 && <>
                    <Button label={"Get Started"} disabled={false} onPress={function (): void {} } className={TryAgain} />
                    <Button label={"Get Started"} disabled={false} onPress={function (): void {} } className={CancelButton} />
                </>}    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 10,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center'
    },
    dynamicContent: {
        flex: 7,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 22
    },
    gif: {
        height: 328,
        width: 288
    },
    dots: {
        position: 'absolute',
        height: 8,
        width: 51,
        top: "100%"
    },
    heading: {
        color: Colors.black_08,
        fontSize: 32,
        fontWeight: '700',
        marginTop: 50,
        textAlign: 'center'
    },
    infoText: {
        marginTop: 18,
        color: Colors.gray_18,
        lineHeight: 24,
        fontSize: 14,
        textAlign: 'center'
    },
    footer: {
        marginTop: 30,
        flex: 3,
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,

    },
    next: {
        height: 56,
        width: 56,
        backgroundColor: Colors.primary,
        borderRadius: 56,
        justifyContent: 'center',
        alignItems: 'center'
    },
    skip: {
        fontSize: 16,
        fontWeight: '700',
        color: "#727374",
    },
});
