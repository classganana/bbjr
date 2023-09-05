import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ClockIcon, StrongBackButton, TestIcon } from '../../components/common/SvgComponent/SvgComponent';
import { SearchIcon } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { Card, CardData } from '../../components/quiz/QuizCard';

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Quizzes');
    const [data, setData] = useState<CardData[]>([
        {
            id: 0,
            title: 'Test Your Knowledge on',
            infoText: 'Info about Card 1',
            imageUrl: 'https://example.com/image1.jpg',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 1,
            title: 'Card 2',
            infoText: 'Info about Card 2',
            imageUrl: 'https://example.com/image2.jpg',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 2,
            title: 'Card Cmapis',
            infoText: 'Info about Card 2',
            imageUrl: 'https://example.com/image2.jpg',
            done: false,
            noOfQuestions: 10,
            timeRequired: 20,
        },
    ]);
    const [options, setOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");


    useEffect(() => {
        setOptions(false);
    },[tab, searchTerm])

    
    
    const updateList = (index: number) => {
        setOptions(true);
        let tempData = data;
        tempData = tempData.map((temp) => {
            if (temp.id != (index)) {
                temp.selected = false;
            }
            return temp;
        })
        tempData[index].selected = true;
        setData(() => [...tempData]);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <StrongBackButton height={'25'} width={'25'} fill={'black'} />
                    </View>
                    <Text style={styles.headingTitle}>Explore Quiz</Text>
                </View>
                <View style={styles.infoContainer}>
                    <SearchIcon height={'20'} width={'20'} fill={'#787878'} />
                    <TextInput style={styles.searchBox}
                     onChangeText={(text) => {setSearchTerm(text)}}
                     placeholderTextColor={"#808080"} placeholder='Seach Quizzes'></TextInput>
                </View>
            </View>
            <View style={styles.tabs}>
                <Tabs activeTab={tab} tabs={['Quizzes', 'Practices']} onChangeTab={(i) => setTab(i)} ></Tabs>
            </View>
            <View style={styles.tabs}>
                <Text style={styles.selectedOption}>{tab}</Text>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.title}
                    renderItem={({ item }) => (
                        <Card {...item} onCardClick={(i) => updateList(i)} />
                    )}
                />
            </View>
            {options && <View style={styles.floatingButtonContainer}>
                <View style={styles.floatingButton}>
                    <TestIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Practice</Text>
                </View>
                <View style={styles.floatingButton}>
                    <ClockIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Take a Test</Text>
                </View>
            </View>}
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
    },
    floatingButtonContainer: {
        position: 'absolute',
        height: 46,
        width: "80%",
        bottom: 24,
        alignSelf: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#B1B1B1',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    floatingButton: {
        flex: 1,
        borderWidth: 1 / 4,
        borderColor: "#C5C5C5",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    floatingButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.primary
    }
});