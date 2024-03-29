import { Platform, StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";


export const LoginScreenStyle = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.white,
        width: "100%",
    },
    header: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center'
    },
    botIcon: {
        height: 70,
        width: 70
    },
    headerText: {
        color: Colors.white,
        fontSize: 22,
        fontWeight: '500',
    },
    body: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        // paddingHorizontal: 25
    },
    imageBlock: {
        height: "50%",
        width: "100%"
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: Colors.dark_gray,
        borderStyle: "solid",
        width: "100%",
        display: "flex",
        flexDirection: "row",
        // backgroundColor: Colors.gray_01,
        padding: 18,
        gap: 10,
        borderRadius: 12,
      },
    input: {
        fontSize: 15,
        ...(Platform.OS === "web" ? { outlineStyle: "none" } : {}),
        fontWeight: "500",
        width: "100%",
        color: Colors.gray_02,
        // backgroundColor: Colors.gray_01,
      },
    loginHeading: {
        top: 40,
        fontSize: 22,
        fontWeight: '600',
        color: "#212121",
        textAlign: 'center'
    },
    backButton: {
        top: "5%",
        left: "5%",
        width: 43,
        height: 40,
        backgroundColor: "#E9EDFB",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    }
})