import { Colors } from '../../styles/colors';
import { StyleSheet } from 'react-native';
import { QuizQuestionsPage } from './QuizQuestionsPage.1';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    questionNumbersScroll: {
        marginTop: 10,
        marginBottom: 16,
        maxHeight: 50,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F0F0F0',
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
    },
    headingTitle: {
        color: "#7A7A7A",
        fontWeight: "500",
        fontSize: 14,
    },
    headingInfo: {
        fontWeight: '500',
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 2,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    timerText: {
        marginTop: 4,
        textAlign: 'center',
        color: "#525252",
        fontSize: 12,
    },
    questionNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        // marginBottom: 10,
        padding: 10,
    },
    questionNumber: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#D4D4D4',
        marginHorizontal: 5,
    },
    questionNumberText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    activeQuestion: {
        backgroundColor: Colors.primary, // Change to your active question color
        color: Colors.white,
    },
    nextQuizButton: {
        width: "90%",
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
});


export default QuizQuestionsPage;
