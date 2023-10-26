import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Colors } from "../../styles/colors";
import { ExamPrepProgressBar } from "./ExamPrepProgressBar";
import { useState } from "react";

export interface HistoryExamPrepQuizCardData {
    id: number;
    title: string[] | string; // we can also name it chapter name
    infoText: string;
    imageUrl: string;
    noOfQuestions: number,
    timeRequired?: number,
    prevTestScore?: number,
    done: boolean,
    practiceProgress?: number,
    selected?: boolean,
    multiSelect?: boolean,
    score: number | undefined,
    quizzId?: string | undefined,
    onCardClick?: (selectedOption: number) => void;
}


export const HistoryExamPrepQuizCard: React.FC<HistoryExamPrepQuizCardData> = ({ id, title, infoText, score, imageUrl, done, noOfQuestions, timeRequired, selected, multiSelect ,onCardClick }) => {
    const [toggleMenu, setToggleMenu] = useState(false);


    return  <TouchableWithoutFeedback onPress={() => onCardClick && onCardClick(id)}>
        <View style={[styles.card]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: 'https://placehold.co/400' }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.infoText}>{title}</Text>
                    <Text style={styles.title}>Recent Test score - {score ? score : 0}/100</Text>
                </View>
            </View>
        </View>
    </TouchableWithoutFeedback>
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 14,
        borderRadius: 10,
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
        marginBottom: 10,
        gap: 12
    },
    imageContainer: {
        width: 64,
        height: 64,
    },
    image: {
        backgroundColor: '#D9D9D9',
        width: 64,
        height: 64,
        borderRadius: 12,
    },
    textContainer: {
        flex: 1,
        gap: 18,
        width: "100%"
    },
    title: {
        fontSize: 14,
        color: "#343434"
    },
    infoText: {
        fontSize: 14,
        color: '#000000',
        fontWeight: '600'
    },
    questionText: {
        color: "#999",
        fontSize: 12
    },
    quizInfo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        width: "100%"
    },
    selected: {
        borderWidth: 1 / 2,
        borderColor: '#006B7F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 4, // For Android shadow
    },
    multiSelected: {
        borderWidth: 1 / 2,
        borderColor: '#006B7F',
        shadowColor: 'rgba(0, 0, 0, 0.25)',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 8,
        shadowOpacity: 1,
        backgroundColor: "#F0F6F8",
        elevation: 4
    },
})