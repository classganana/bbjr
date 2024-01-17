import { StyleSheet } from "react-native";
import { Colors } from "../../styles/colors";

export const BotStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        // flex: 1,
        paddingHorizontal: 14,
        flexDirection: 'row',
        gap: 14,
        justifyContent: 'space-between',
        height: 50,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#DFDFDF',
        backgroundColor: '#F0F2FC',
        shadowColor: 'rgba(0, 0, 0, 0.10)',
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 1,
        shadowRadius: 2,
        elevation: 2, // for Android shadow
    },
    headerIcon: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center'
    },
    headerTitle: {
        color: Colors.primary,
        fontSize: 18,
        fontWeight: '600'
    },
    headerTitleInfo: {
        fontSize: 12,
        color: "#23AE00"
    },
    headerButton: {

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
    selectSubjectContainer: {
        borderRadius: 25,
        // backgroundColor: "#006B7F14",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        borderColor: Colors.primary,
        borderWidth: 1/2,
        paddingHorizontal: 12,
        paddingVertical: 2
        // height: 28 
    },
    selectedSubject: {
      // backgroundColor: Colors.primary,
      paddingHorizontal: 10,
    //   paddingVertical: 4,
      borderRadius: 20,
    },
    selectedSubjectText: {
      paddingHorizontal: 10,
      paddingVertical: 4,
      color: Colors.primary,
      overflow: 'hidden',
      maxWidth: 200
    },
    edit: {
        alignItems: "center",
        justifyContent: "center",
        width: 32,
        height: 32,
        backgroundColor: Colors.primary,
        borderColor: Colors.skyblue,
        borderWidth: 0.5,
        borderRadius: 90,
      },
    menu: {
        height: 28,
        width: 28,
        backgroundColor: "#D9D9D97A",
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center'
    }
})