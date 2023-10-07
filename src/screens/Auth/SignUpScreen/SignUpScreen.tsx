import React, { useState } from 'react';
import { View, TextInput, KeyboardAvoidingView, ScrollView, Platform, Image, Text, StyleSheet } from 'react-native';
import { LoginScreenStyle } from '../LoginScreen/LoginScreenStyle';
import { Constants } from '../../../constants/constants';
import { Picker } from "@react-native-picker/picker";
import { Colors } from '../../../styles/colors';
import { PrimaryDefaultButton } from '../../../components/common/ButttonComponent/ButtonStyles';
import { Button } from "../../../components/common/ButttonComponent/Button";
import { httpClient } from '../../../services/HttpServices';

export const SignUpScreen = () => {
    const [name, setName] = useState('');
    const [classValue, setClassValue] = useState(''); // No default class selected
    const [school, setSchool] = useState('');
    const [board, setBoard] = useState(''); // No default board selected
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState("");

    // Regular expression for a valid 10-digit phone number
    const phoneRegex = /^\d{10}$/;


    const handleSubmit = () => {
        const obj = {
            "name": name,
            "phoneNumber": `+91${phoneNumber}`,
            "class": parseInt(classValue),
            "board": board,
            "userId": "ayush_dixit",
            "school": "XYZ High School"
        }
        httpClient.post('auth/sign-up', obj)
            .then((response) => {
                console.log(response);
            })
    };

    const validatePhoneNumber = (inputPhoneNumber: string) => {
        if (!phoneRegex.test(inputPhoneNumber)) {
            setPhoneNumberError("Please enter a valid 10-digit phone number.");
        } else {
            setPhoneNumberError("");
        }
    };

    // Function to check if all fields are filled and phone number is valid
    const checkFields = () => {
        if (name !== '' && school !== '' && board !== '' && phoneRegex.test(phoneNumber)) {
            setIsSubmitDisabled(false);
        } else {
            setIsSubmitDisabled(true);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : null}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={LoginScreenStyle.header}>
                    <Image style={LoginScreenStyle.botIcon} source={require("../../../../assets/gifs/bot.gif")} />
                    <Text style={LoginScreenStyle.headerText}>{Constants.BrandName}</Text>
                </View>

                <View style={styles.body}>
                    <Text style={styles.heading}>Create Account</Text>

                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your name"
                        value={name}
                        onChangeText={text => {
                            setName(text);
                            checkFields();
                        }}
                    />

                    <Text style={styles.label}>Class:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={classValue}
                            onValueChange={(itemValue) => {
                                setClassValue(itemValue);
                                checkFields();
                            }}
                        >
                            <Picker.Item label="Select Class" value="" />
                            {Array.from({ length: 10 }, (_, i) => i + 3).map((item) => (
                                <Picker.Item label={item.toString()} value={item.toString()} key={item} />
                            ))}
                        </Picker>
                    </View>

                    <Text style={styles.label}>School:</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="School"
                        value={school}
                        onChangeText={text => {
                            setSchool(text);
                            checkFields();
                        }}
                    />

                    <Text style={styles.label}>Board:</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={board}
                            onValueChange={(itemValue) => {
                                setBoard(itemValue);
                                checkFields();
                            }}
                        >
                            <Picker.Item label="Select Board" value="" />
                            <Picker.Item label="ICSE" value="ICSE" />
                            <Picker.Item label="CBSE" value="CBSE" />
                            <Picker.Item label="TELANGANA" value="TELANGANA" />
                        </Picker>
                    </View>

                    {/* <Text style={styles.label}>Phone Number:</Text>
                    <View style={styles.inputPhone}>
                        <Text>+91</Text>
                        <TextInput
                            placeholder="Phone Number (+919999999999)"
                            value={phoneNumber}
                            onChangeText={text => {
                                setPhoneNumber(text);
                                checkFields();
                                validatePhoneNumber(text);
                            }}
                        />
                    </View>
                    {phoneNumberError !== "" && (
                        <Text style={styles.errorText}>{phoneNumberError}</Text>
                    )} */}
                </View>

                {/* The submit button will appear at the bottom */}
                <View style={styles.footer}>
                    <Button
                        className={PrimaryDefaultButton}
                        label={"Login"}
                        disabled={isSubmitDisabled && phoneNumberError !== ""}
                        onPress={handleSubmit}
                    />
                    <View>
                        <Text style={{ textAlign: 'center' }}>
                            By Continuing you agree to the Terms of services and Privacy policy
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
        width: "100%",
    },
    heading: {
        fontSize: 28,
        fontWeight: '600',
        color: "#323232",
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
        marginBottom: 5,
    },
    input: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#B8B8B8",
        backgroundColor: "#FFF",
        height: 50, // Set the height as needed
        marginBottom: 10,
        paddingHorizontal: 18
    },
    inputPhone: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#B8B8B8",
        backgroundColor: "#FFF",
        height: 50, // Set the height as needed
        marginBottom: 10,
        paddingHorizontal: 18
    },
    picker: {
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#B8B8B8",
        backgroundColor: "#FFF",
        height: 50, // Set the height as needed
        marginBottom: 10,
    },
    errorText: {
        color: "red",
    },
    body: {
        flex: 1,
        backgroundColor: Colors.white,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingHorizontal: 25
    },
    footer: {
        justifyContent: 'flex-end',
        backgroundColor: 'white',
        // bottom: 30,
        paddingBottom: 20, // Adjust as needed for spacing
    },
});
