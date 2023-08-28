import { StyleSheet } from "react-native";
import { Colors } from "../../../styles/colors";


export const LoginScreenStyle = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.white,
    },
    progressBar: {
        marginTop: 30,
        height: 12,
        width: "25%",
        borderRadius: 10,
        backgroundColor: Colors.progressBar,
        display: 'flex',
        left: "-5%",
        top: "-25%"
    },
    progressBarItem: {
        height: 12,
        width: "50%",
        borderRadius: 10,
        backgroundColor: Colors.primary
    },
    formContainer: {
        // marginVertical: 'auto',
        backgroundColor: Colors.white,
        paddingHorizontal: 16,

    },
    formContainerTitle : {
        color: Colors.primary,
        fontWeight: "700",
        fontSize: 32,
        marginBottom: 30

    },
    inputSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: 16
    },
    inputFieldContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: 12
    },
    inputFieldLabel: {
        color: Colors.black_06,
        fontSize: 14
    },
    inputField: {
        color: Colors.black_06,
        fontSize: 14,
        padding: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray_14,
    },
    inputPhoneField: {
        color: Colors.black_06,
        fontSize: 14,
        padding: 20,
        gap: 12,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: Colors.gray_14,
        display: 'flex',
        flexDirection: 'row'
    },
    verticalLine: {
        height: 20,
        width: 1,
        backgroundColor: "#BAB7B7",
    },
    inputPhoneFieldBox: {
        borderColor: 'transparent'
    },
    errorMsg: {
        color: Colors.red,
        fontWeight: '400',
        fontSize: 10
    },
    termsAndPolicy: {
        marginTop: 20,
        fontSize: 12,
        color: Colors.black_01
    },
    actionButtons: {
        marginTop: 28,
        display: 'flex',
        flexDirection: 'column',
        gap: 30
    }

})