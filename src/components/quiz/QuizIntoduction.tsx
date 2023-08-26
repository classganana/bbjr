import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { Questions } from '../common/SvgComponent/SvgComponent';

export const QuizIntoduction = () => {
  return (
        <View style={styles.container}>
            <Text style={styles.header}>Brief explanation about this quiz</Text>
            <View style={styles.options}>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                        <Text style={styles.optionHeading}>10 Question</Text>
                        <Text style={styles.optionInfo}>10 point for a correct answer</Text>
                    </View>
                </View>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                        <Text style={styles.optionHeading}>10 Question</Text>
                        <Text style={styles.optionInfo}>10 point for a correct answer</Text>
                    </View>
                </View>
                <View style={styles.option}>
                    <Questions height={'40'} width={'40'} fill={'black'} />
                    <View>
                        <Text style={styles.optionHeading}>10 Question</Text>
                        <Text style={styles.optionInfo}>10 point for a correct answer</Text>
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
