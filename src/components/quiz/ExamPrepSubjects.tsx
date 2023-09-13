import React, { useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors'
import { Pencil } from '../common/SvgComponent/SvgComponent'
import { ExamPrepQuizCard, ExamPrepQuizCardData } from './ExamPrepQuizCard'

type Props = {
    subjects: string[]
}

export const ExamPrepSubjects = ({ subjects }: Props) => {
    const [selectedSubject, setSelectedSubject] = useState("Maths");
    // const [showSubjectList, setShowSubjectList] = useState(false);
    const [data, setData] = useState<ExamPrepQuizCardData[]>([
        {
            id: 0,
            title: 'Test Your Knowledge on',
            infoText: 'Info about Card 1',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 1,
            title: 'Card 2',
            infoText: 'Info about Card 2',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 2,
            title: 'Card Cmapis',
            infoText: 'Info about Card 2',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 10,
            timeRequired: 20,
        },
    ]);

    const Block = ({ title }: any) => {
        return <TouchableOpacity style={blockStyle.container} onPress={() => setSelectedSubject(title)}>
            <Text style={blockStyle.text}>{title}</Text>
        </TouchableOpacity>
    }

    return (
        <>
            {(!selectedSubject) && <View style={styles.container}>
                <Text style={styles.heading}>
                    All Subject wise
                </Text>
                <Text style={styles.subheading}>
                    Select a subject
                </Text>
                <View style={styles.subjectList}>
                    {subjects.map((subject, index) => {
                        const uniqueKey = `subject_${index}`;
                        return <Block key={uniqueKey} title={subject}></Block>;
                    })}
                </View>
            </View>}
            {(selectedSubject) && <View style={styles.container}>
                <Text style={styles.heading}>
                    Selected Subject
                </Text>
                <View style={styles.headingSection}>
                    <TouchableOpacity style={styles.selectedSubject}>
                        <Text style={styles.selectedSubject.text}>{selectedSubject}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editSelectedSubject} onPress={() => setSelectedSubject("")} >
                        <Text>Change</Text>
                        <View style={styles.pencil}>
                            <Pencil height={'20'} width={'20'} fill={Colors.white} />
                        </View>
                    </TouchableOpacity>
                </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => (
                            <ExamPrepQuizCard {...item} onCardClick={() =>{}} />
                        )}
                    />
            </View>}
        </>
    )
}

const blockStyle = StyleSheet.create({
    container: {
        textAlign: 'center',
        width: "45%",
        paddingVertical: 12,
        paddingHorizontal: 22,
        borderRadius: 8,
        borderWidth: 1 / 2,
        borderColor: '#006B7F',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4,
    },
    text: {
        width: "100%",
        textAlign: 'center',
        color: Colors.black_03,
        fontSize: 18
    }
})

const styles = StyleSheet.create({
    container: {
        paddingVertical: 12
    },
    heading: {
        fontSize: 14,
        fontWeight: '500',
        color: '#4A4A4A'
    },
    subheading: {
        marginTop: 24,
        color: "#808080",
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center'
    },
    subjectList: {
        marginTop: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 28,
        justifyContent: 'center'
    },
    headingSection: {
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center"
    },
    selectedSubject: {
        height: 30,
        paddingHorizontal: 14,
        paddingVertical: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#006B7F',
        backgroundColor: '#DFEEEF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4, // This adds elevation (like shadow) for Android
        text: {
            padding: 0,
        }
    },
    editSelectedSubject: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 10,
        alignItems: 'center',
        backgroundColor: "#006B7F14",
        // paddingVertical: 5,
        paddingLeft: 15,
        borderRadius: 25
    },
    pencil: {
        backgroundColor: Colors.primary,
        borderRadius: 26,
        padding: 6
    }
})