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
        height: 50,
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: '#DFDFDF',
        backgroundColor: '#FFF',
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
    bottomSheetContainer: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        backgroundColor: Colors.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
})