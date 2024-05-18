import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";


export const styles = StyleSheet.create({
    crossMultiSelect: {
        borderColor: "#C5C5C5",
        borderWidth: 1 / 2,
        borderRadius: 20,
        flexDirection: 'row',
        gap: 8,
        alignItems: 'center',
        paddingVertical: 4,
        paddingHorizontal: 10
    },
    container: {
        margin: 0,
        flex: 1,
        backgroundColor: Colors.white,
    },
    header: {
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
        paddingVertical: 20,
        height: 70,
        flexShrink: 0,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    examPreparation: {
        fontWeight: '600',
        fontSize: 18,
        marginVertical: 16
    },
    headingTitle: {
        color: Colors.black_05,
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
    body: { backgroundColor: Colors.white, flex: 1, borderTopStartRadius: 20, borderTopEndRadius: 20 },
    noQuizFound: {
        flex: 1,
        height: 600,
        justifyContent: 'space-around',
        alignItems: 'center',

        // backgroundColor: 'red'
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
        paddingTop: 40,
        paddingBottom: 10,
        position: 'absolute',
        // height: 46,
        paddingHorizontal: 32,
        gap: 14,
        width: "100%",
        bottom: 0,
        alignSelf: 'center',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        borderWidth: 0.5,
        borderColor: '#B1B1B1',
        boxShadow: "0px 0px 15px 1px rgba(0, 0, 0, 0.25)",
        backgroundColor: "#FFF",
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
        // flexDirection: 'row',
        overflow: 'hidden'
    },
    selectedChapterContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 8,
    },
    selectedChapters: {
        minWidth: 28,
        maxWidth: 50,
        fontSize: 14,
        fontWeight: '600',
        paddingVertical: 4,
        paddingHorizontal: 10,
        backgroundColor: "#2947D41C",
    },
    crossfloatingButton: {
        position: "absolute",
        right: 20,
        top: 4,
        width: 48, // Adjusted width
        height: 48, // Adjusted height    
        padding: 8,
    },
    floatingButton: {
        padding: 8,
        flex: 1,
        borderWidth: 1 / 4,
        borderColor: "#C5C5C5",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
        height: 48,
    },
    floatingButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: Colors.primary
    },
    bottomSheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'scroll',
        paddingBottom: 50
    },
    modalTitleContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
    },
    subjecttxt: {
        alignSelf: 'center',
        // paddingTop: 30,
        // paddingBottom: 10,
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        fontWeight: '500',
        color: Colors.black_01
    },
    selectedSubject: {
        width: 180,
        paddingVertical: 14,
        paddingHorizontal: 14,
        textAlign: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#DFE4FF',
        backgroundColor: Colors.primary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 4, // This property adds shadow on Android
        color: Colors.white,
        height: 48,
    },
    changebutton: {
        height: 48,
        borderRadius: 10,
        backgroundColor: '#F0F2FC',
        width: '40%',
        //  justifyContent: 'center', 
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 12,
        //  position: 'relative' 
    },
    pencil: {
        // borderRadius: 26.35, 
        // backgroundColor: Colors.primary, 
        alignItems: 'center',
        // position: 'absolute', 
        // right: 5, 
        transform: [{ rotate: '270deg' }]
    },
    buttoncontainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
    },
    chapterWise: {
        fontSize: 16,
        fontWeight: '600'
    },
    allChapterCard: {
        paddingTop: 10,
        paddingHorizontal: 15,
        height: 300,
        borderRadius: 30,
        overflow: 'hidden',
        backgroundColor: Colors.white,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        pencil:{ 
            // borderRadius: 26.35, 
            // backgroundColor: Colors.primary, 
            alignItems: 'center', 
            // position: 'absolute', 
            // right: 5, 
            transform: [{ rotate: '270deg' }]
        },
        verticalSeperator: {
            width: 1,
            borderColor: Colors.gray_20,
            borderRightWidth: 1,
            marginHorizontal: 10
        },
        buttoncontainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:10,
            paddingVertical:20,
        },
        chapterWise: {
            fontSize: 16,
            fontWeight: '600'
        },
        allChapterCard: {
            paddingTop: 10,
            paddingHorizontal: 15,
            height: 300, 
            borderRadius: 30, 
            overflow: 'hidden',
            backgroundColor: Colors.white,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 1,
            shadowRadius: 4,
            elevation: 1,
        },
        allChapterCardtext: {
            marginTop: "5%",
            fontSize: 16,
            fontWeight: '500',

        shadowOpacity: 1,
        shadowRadius: 4,
        elevation: 1,
    },
    crossCloseIcon: { 
        backgroundColor: 'white', 
        height: 40, 
        width: 40, 
        borderRadius: 40, 
        justifyContent: 'center', 
        alignItems: 'center',
        top: "18%",
        left: "45%"
    }
});