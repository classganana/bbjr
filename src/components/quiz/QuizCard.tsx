import { Image, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../styles/colors";
import { GreenCheck } from "../common/SvgComponent/SvgComponent";

export interface CardData {
    id: string;
    title: string;
    infoText: string;
    imageUrl: string;
    noOfQuestions: number,
    timeRequired: number,
    done: boolean
}


export const Card: React.FC<CardData> =  ({ title, infoText, imageUrl, done, noOfQuestions, timeRequired }) => (
    <View style={[styles.card, done && { backgroundColor: 'rgba(0, 107, 127, 0.08)' } ]}>
        <View style={styles.imageContainer}>
            <Image source={{ uri: imageUrl }} style={styles.image} />
        </View>
        <View style={styles.textContainer}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.infoText}>{infoText}</Text>
            </View>
            <View style={styles.quizInfo}>
                <Text style={styles.questionText}>{noOfQuestions} Questions</Text>
                <Text>•</Text>
                <Text style={styles.questionText}>{timeRequired} minutes</Text>
                { done && <GreenCheck height={"11"} width={"11"} fill={"green"} /> }
            </View>
        </View>
    </View>
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
        gap: 18
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
    quizInfo : {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: 8
    }
})