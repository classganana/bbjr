import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { Questions } from '../common/SvgComponent/SvgComponent';
import { UtilService } from '../../services/UtilService';

type QuizIntoductionProps = {
    mcqs: number,
    time: number,
}

export const QuizIntoduction = (props: QuizIntoductionProps) => {

    const [quizType, setQuizType] = useState<string | null>('');

    useEffect( () => {
        setQuizTypes();
    })

    const setQuizTypes = async () => {
        const quiz = await UtilService.getQuizType();
        setQuizType(quiz);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Points to note for Practice Test:</Text>
            <View style={styles.options}>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                        <Text style={styles.optionHeading}>{props.mcqs} Question</Text>
                        <Text style={styles.optionInfo}>10 point for a correct answer</Text>
                    </View>
                </View>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                        {quizType == 'practice' ? 
                        <Text style={styles.optionHeading}>No Time Limit</Text>
                        : 
                        <Text style={styles.optionHeading}>{props.time} Seconds</Text>
                    }
                        <Text style={styles.optionInfo}>Total duration of the quiz</Text>
                    </View>
                </View>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                    {quizType == 'practice' ? 
                        <Text style={styles.optionHeading}>No Scoring</Text>
                        : 
                       <Text style={styles.optionHeading}>Win {props.mcqs * 10} Points</Text>}
                        <Text style={styles.optionInfo}>Answer all questions correctly</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 28
    },
    header: {
        fontWeight: '700',
        color: Colors.black_03,
        fontSize: 16
    },
    options: {
        display: 'flex',
        gap: 20,
        marginTop: 20

    },
    option: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 18
    },
    optionHeading: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.black_07
    },
    optionInfo: {
        fontWeight: '400',
        fontSize: 14,
        color: Colors.gray_12
    }
});
