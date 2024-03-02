import React, { useEffect, useState } from 'react';
import { View, TextInput, ScrollView, Platform, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button'
import { Colors } from '../../styles/colors';
import { ArrowLeft, CameraIcon, NewBackButton } from '../../components/common/SvgComponent/SvgComponent';
import { Picker } from '@react-native-picker/picker';
import { CancelButton, EditButton, ExitButton, LoginButton, OutlineButton, SubmitButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { httpClient } from '../../services/HttpServices';
import { useUser } from '../../context/UserContext';
import CircleInitials from '../../components/common/CircleInitials/CircleInitials';
import { CustomDropdown } from '../../components/common/Performance/CustomDropdown/CustomDropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [classValue, setClassValue] = useState(0); // No default class selected
    const [school, setSchool] = useState('');
    const [board, setBoard] = useState(''); // No default board selected
    const [phoneNumber, setPhoneNumber] = useState('');
    const [GuardianName, setGuardianName] = useState('');
    const [GuardianEmail, setGuardianEmail] = useState('');
    const [userId, setUserId] = useState<any>('');
    const { user, setUser } = useUser()
    const navigation = useNavigation();

    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };


    useEffect(() => {
        if (user) {
            setName(user.name);
            setBoard(user.board);
            setClassValue(user.class);
            setPhoneNumber(user.phoneNumber);
            setSchool(user.school);
            setUserId(user.userId);
            user.guardianEmail && setGuardianEmail(user.guardianEmail);
            user.guardianName && setGuardianName(user.guardianName);
        }
    }, [])


    const updateProfile = () => {
        let updatedData: any = {
            name,
            class: classValue,
            school,
            board,
            phoneNumber,
        };

        updatedData.class = parseInt(updatedData.class);

        GuardianName ? updatedData = { ...updatedData, GuardianName } : ''
        GuardianEmail ? updatedData = { ...updatedData, GuardianEmail } : ''

        httpClient.patch(`users/${userId}`, {
            ...updatedData
        }).then((res) => {
            if (res.data.acknowledged) {
                setUser({ ...updatedData, userId });
                AsyncStorage.setItem('user', JSON.stringify({ ...updatedData, userId }));
                toggleEditMode();
            }
        });
    }

    const listOfClass = [
        { label: 5 },
        { label: 6 },
        { label: 7 },
        { label: 8 },
        { label: 9 },
        { label: 10 },
    ]

    const listOfBoards = [
        { label: "CBSE" },
        { label: "ICSE" },
        { label: "Telangana Board" },
    ]

    const onBack = () => {
        navigation.navigate('Setting' as never)
    }




    return (
        <ScrollView style={{ flex: 1, flexGrow: 1, backgroundColor: 'white' }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.heading}>
                        <TouchableOpacity style={styles.backButton} onPress={() => onBack()}>
                            <NewBackButton height={'18'} width={'25'} fill={'black'} />
                        </TouchableOpacity>
                        <Text style={styles.headingTitle}>Profile</Text>
                    </View>
                </View>
                <View style={styles.DetailContainer}>
                    <View style={styles.ImageContainer}>
                        <CircleInitials name={user?.name} size={150} />
                    </View>


                    <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Student Name"
                            editable={isEditMode}
                            value={name}
                            onChangeText={text => {
                                setName(() => text);
                                // checkFields();
                            }}
                        />
                    </View>

                    {/* <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone number"
                            value={phoneNumber}
                            editable={isEditMode}
                            onChangeText={text => {
                                setPhoneNumber(text);
                                // checkFields();
                            }}
                        />
                    </View> */}

                    <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Class</Text>
                        <View style={styles.picker}>
                            <Picker
                                enabled={isEditMode}
                                selectedValue={classValue.toString()}
                                onValueChange={(itemValue) => {
                                    setClassValue(parseInt(itemValue));
                                    // checkFields();
                                }}
                            >
                                <Picker.Item style={styles.pickerItem} label="5" value="5" />
                                <Picker.Item style={styles.pickerItem} label="6" value="6" />
                                <Picker.Item label="7" value="7" />
                                <Picker.Item label="8" value="8" />
                                <Picker.Item label="9" value="9" />
                                <Picker.Item label="10" value="10" />
                                <Picker.Item label="11" value="11" />
                                <Picker.Item label="12" value="12" />
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.label}>School/College</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="School Name"
                        value={school}
                        editable={isEditMode}
                        onChangeText={text => {
                            setSchool(text);
                            // checkFields();
                        }}
                    />

                    <Text style={styles.label}>Board</Text>
                    <View style={styles.picker}>
                        <Picker
                            enabled={isEditMode}
                            selectedValue={board}
                            onValueChange={(itemValue) => {
                                setBoard(itemValue);
                                // checkFields();
                            }}
                        >
                            <Picker.Item label="Select Board" value="" />
                            <Picker.Item label="CBSE" value="CBSE" />
                        </Picker>
                    </View>
                    {/* <Picker.Item label="ICSE" value="ICSE" /> */}
                    {/* <Picker.Item label="TELANGANA" value="TELANGANA" /> */}
                    <Text style={styles.label}>Guardian’s Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Guardian’s Name"
                        value={GuardianName}
                        editable={isEditMode}
                        onChangeText={text => {
                            setGuardianName(text);
                            // checkFields();
                        }}
                    />
                    <Text style={styles.label}>Guardian’s Email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Guardian's Email"
                        value={GuardianEmail}
                        editable={isEditMode}
                        onChangeText={text => {
                            setGuardianEmail(text);
                            // checkFields();
                        }}
                    />
                    <View style={styles.btn}>
                        {!isEditMode ? (
                            <Button
                                label={'Edit Profile'}
                                disabled={false}
                                className={EditButton}
                                onPress={toggleEditMode} // Toggle edit mode when the button is pressed
                            />
                        ) : (
                            <>
                                <Button label={'Cancel'} disabled={false} className={CancelButton} onPress={toggleEditMode} />
                                <Button label={'Submit'} disabled={false} className={LoginButton} onPress={updateProfile} />
                            </>
                        )}
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white
    },
    header: {
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexShrink: 0,
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10
    },
    headingTitle: {
        fontWeight: "500",
        fontSize: 18,
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    DetailContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.white,
        paddingHorizontal: 20,
    },
    ImageContainer: {
        paddingHorizontal: '25%',
        paddingTop: 20,
        alignItems: 'center'
    },
    ProfileImage: {
        height: 154,
        width: 154,
        borderRadius: 100,
        backgroundColor: Colors.gray_05,
        position: 'relative',
    },
    CameraBorder: {
        height: 50,
        width: 50,
        borderRadius: 100,
        backgroundColor: Colors.primary,
        position: 'absolute',
        bottom: 0,
        right: 0
    },
    inputBlocks: {
        paddingVertical: 0,
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
    },
    input: {
        padding: 0,
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        // height: 35, // Set the height as needed
        // marginBottom: 10,
    },
    picker: {
        zIndex: 100,
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        // backgroundColor: "#FFF",
        height: 40, // Set the height as needed
        // marginBottom: 0,
        margin: 0,
        top: -15,
        width: "100%",
        padding: 0
    },
    btn: {
        display: 'flex',
        margin: 30,
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: '100%',
    },
    Editbtn: {
        margin: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    pickerItem: {
        paddingVertical: 0, // Remove vertical padding
        paddingHorizontal: 0, // Remove horizontal padding
        margin: 0, // Remove margin
        padding: 0
    },

});
export default EditProfile;