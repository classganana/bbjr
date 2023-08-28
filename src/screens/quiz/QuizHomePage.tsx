import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ArrowLeft, StrongBackButton } from '../../components/common/SvgComponent/SvgComponent';
import { SearchIcon } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { Card, CardData } from '../../components/quiz/QuizCard';

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Quizzes');
    const data: CardData[] = [
        {
            id: '1',
            title: 'Test Your Knowledge on',
            infoText: 'Info about Card 1',
            imageUrl: 'https://example.com/image1.jpg',
            done: true,
            noOfQuestions: 30,
            timeRequired: 30,
        },
        {
            id: '2',
            title: 'Card 2',
            infoText: 'Info about Card 2',
            imageUrl: 'https://example.com/image2.jpg',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
        },
        {
            id: '3',
            title: 'Card Cmapis',
            infoText: 'Info about Card 2',
            imageUrl: 'https://example.com/image2.jpg',
            done: true,
            noOfQuestions: 10,
            timeRequired: 20,
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        {/* <StrongBackButton height={'16'} width={'16'} fill={'black'} /> */}
                        <StrongBackButton height={'25'} width={'25'} fill={'black'} />
                    </View>
                    <Text style={styles.headingTitle}>Explore Quiz</Text>
                </View>
                <View style={styles.infoContainer}>
                    <SearchIcon height={'20'} width={'20'} fill={'#787878'} />
                    <TextInput style={styles.searchBox} placeholderTextColor={"#808080"} placeholder='Seach Quizzes'></TextInput>
                </View>
            </View>
            <View style={styles.tabs}>
                <Tabs activeTab={tab} tabs={['Quizzes', 'Practices']} onChangeTab={(i) => setTab(i)} ></Tabs>
            </View>
            <View style={styles.tabs}>
                <Text style={styles.selectedOption}>{tab}</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Card {...item} />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 20,
        height: 150,
        flexShrink: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.primary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    headingTitle: {
        color: Colors.white,
        fontWeight: "500",
        fontSize: 20
    },
    backButton: {
        height: 25,
        width: 25,
        borderRadius: 25,
        backgroundColor: Colors.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoContainer: {
        backgroundColor: Colors.white,
        height: 44,
        marginTop: 28,
        display: 'flex',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
    },
    searchBox: {
        fontSize: 14,
        color: '#787878'
    },
    tabs: {
        paddingHorizontal: 16,
    },
    selectedOption: {
        marginVertical: 18,
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black_03
    }
}
);