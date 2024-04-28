import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F2F7F8",
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    questionNumbersScroll: {
        backgroundColor: 'white',
        marginTop: 10,
        marginBottom: 16,
        maxHeight: 60,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 16,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F2F7F8',
    },
    heading: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 28,
        flex: 1,
    },
    headingLeft: {
        height: 50,
        flex: 7,
        justifyContent: 'space-between',
        gap: 10
    },
    headingRight: {
        flex: 3,
        // height: 30
    },
    headingTitle: {
        color: Colors.primary,
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
    timerBlock: {
        //  position: "absolute",
        display: 'flex',
        flexDirection: 'row',
        right: 10,
        gap: 10
    },
    timer: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 3,
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
        borderBottomWidth: 1 / 4,
    },
    questionNumber: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: 'rgba(41, 71, 212, 0.1)',
        marginHorizontal: 5,
    },
    questionNumberText: {
        color: Colors.black_01,
        fontSize: 16,
        fontWeight: '700',
    },
    activeQuestion: {
        backgroundColor: Colors.primary, // Change to your active question color
        color: Colors.white,
    },
    quizButtonContainer: {
        minHeight: "15%",
        maxHeight: "30%",
    },
    nextQuizButton: {
        flex: 1,
        width: "90%",
        position: 'absolute',
        bottom: 20,
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        paddingHorizontal: 16,
        justifyContent: 'space-between',
        gap: 10
    },
    body: {
        flex: 1,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.10,
        shadowRadius: 15,
        elevation: 2, // for Android shadow
    },
    questionInfo: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16
    },
    questionInfoDropDown: {
        display: 'flex',
        flexDirection: 'row',
        gap: 6,
        alignItems: 'center',
    },
    questionInfoText: {
        fontSize: 16,
        fontWeight: '500',
    },
    bottomSheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    hintSheetContainer : {
        position: "absolute",
        width: "100%",
        bottom: "12%",
        backgroundColor: Colors.white,
        alignSelf: 'center',
    },
    hintSheetContainerHeader: {
        paddingVertical: 16,
        paddingHorizontal: 20,
        flexDirection: 'row', 
        justifyContent: 'space-between',
        backgroundColor: "white",
        shadowColor: Colors.black_03,
        borderWidth: 0.5,
        borderBottomColor: "white",
        ...Platform.select({
          ios: {
            shadowColor: 'rgba(0, 0, 0, 0.15)',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 1,
            shadowRadius: 8,
          },
          android: {
            elevation: 4,
          },
        })
    },
    hintSheetContainerHeaderLeft: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 10
    },
    hintSheetContainerHeaderLeftText: {
        fontSize: 18,
        fontWeight: '500',
    },
    aiGeneratedCircle: {
        borderColor: "#2947D41A",
        borderWidth: 1,
        borderRadius: 25,
        paddingVertical:5,
        paddingHorizontal:10, 
    },
    hintTextButton: {
        transform: [{rotate: '-90deg'}]
    },
    hintAnswer: {
        paddingVertical: 16,
        paddingHorizontal: 20,  
    },
    hintAnswerText: {
        fontSize: 16,
        color: "#454545"
    },
    closeButton: {
        flexDirection: "row",
        bottom: 10,
        position: "absolute",
        gap: 10,
        alignItems: "center",
    },
    edit: {
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        backgroundColor: Colors.Hawkes_Blue,
        borderColor: Colors.skyblue,
        borderWidth: 0.5,
        borderRadius: 90,
    },
});

export default styles;