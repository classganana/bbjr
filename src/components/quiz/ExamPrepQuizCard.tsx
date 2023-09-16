import { Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedbackComponent, View } from "react-native";
import { Colors } from "../../styles/colors";
import { ExamPrepProgressBar } from "./ExamPrepProgressBar";

export interface ExamPrepQuizCardData {
    id: number;
    title: string; // we can also name it chapter name
    infoText: string;
    imageUrl: string;
    noOfQuestions: number,
    timeRequired?: number,
    prevTestScore?: number,
    done: boolean,
    practiceProgress?: number,
    selected?: boolean,
    onCardClick?: (selectedOption: number) => void;
}


export const ExamPrepQuizCard: React.FC<ExamPrepQuizCardData> = ({ id, title, infoText, imageUrl, done, noOfQuestions, timeRequired, selected, onCardClick }) => (
    <TouchableOpacity onPress={() => onCardClick && onCardClick(id)}>
        <View style={[styles.card,
        done && { backgroundColor: 'rgba(0, 107, 127, 0.08)' },
        selected && styles.selected]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.textContainer}>
                <View>
                    <Text style={styles.infoText}>{title}</Text>
                    <Text style={styles.title}>Test score - 40/100</Text>
                </View>
                <View style={styles.quizInfo}>
                    <ExamPrepProgressBar perc={30} label={"Practice"} />
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

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
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
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
    }
})