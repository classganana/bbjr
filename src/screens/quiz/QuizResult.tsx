import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ArrowLeft, ShareIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton, OutlineButton } from '../../components/common/ButttonComponent/ButtonStyles';

type Props = {
    noOfQuestions: number,
    noOfCorrectAnswers: number
}

export const QuizResult = (props: Props) => {
    const result = [
        {
            label: "Total Score",
            value: `${props.noOfCorrectAnswers}/${props.noOfQuestions}`
        },
        {
            label: "Total Questions",
            value: `${props.noOfQuestions}`
        },
        {
            label: "Wrong Questions",
            value: `${props.noOfQuestions - props.noOfCorrectAnswers}`
        },
        {
            label: "Right Questions",
            value: `${props.noOfCorrectAnswers}`
        }
    ]

    console.log(result);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <ArrowLeft height={'30'} width={'30'} fill={'black'}></ArrowLeft>
                    </View>
                    <View style={[styles.backButton, { position: "absolute", right: 10 }]}>
                        <ShareIcon height={'20'} width={'20'} fill={'black'} />
                    </View>
                </View>
            </View>
            <View style={styles.imageSection}>
                <Image style={styles.image} source={require('../../../assets/png/trophy.png')}></Image>
            </View>
            <View style={styles.cardsContainer}>
                {result.map((item, index) => (
                    <View style={styles.marksCards} key={index}>
                        <Text style={styles.label}>{item.label}</Text>
                        <Text style={[
                            styles.values,
                            item.label === 'Wrong Questions' && styles.redText,
                            item.label === 'Right Questions' && styles.greenText
                        ]}>{item.value}</Text>
                    </View>
                ))}
            </View>
            <View style={styles.buttonSection}>
                <Button label={"Show Answers"} className={OutlineButton} disabled={false} onPress={function (): void {
                    throw new Error('Function not implemented.');
                } } ></Button>
                <Button label={"Play Again"} className={LoginButton} disabled={false} onPress={function (): void {
                    throw new Error('Function not implemented.');
                } } ></Button>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 300,
        // width: "100%"
    },
    image: {
        height:300,
        width: "100%"
    },
    cardsContainer: {
        display: 'flex',
        gap: 10,
        paddingHorizontal: 20
        },
    marksCards: {
        display: 'flex',
        padding: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 12,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2
    },
    label: {
        color: "#757575",
        fontSize: 16,
        fontWeight: '500'
    },
    values: {
        fontSize: 22,
        fontWeight: '500',
        color: Colors.black_01
    },
    redText: {
        color: 'red'
    },
    greenText: {
        color: 'green'
    },
    buttonSection:{
        display: 'flex',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    }
});
