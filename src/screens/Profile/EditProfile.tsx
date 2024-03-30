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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { ToastService } from '../../services/ToastService';
import Dropdown from '../../components/common/Performance/CustomDropdown/CustomDropdown';

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

    useEffect(() =>{})


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
                ToastService('Profile updated successfully.');
            }
        });
    }

    const listOfClass = [
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12"
    ]

    const listOfBoards = [
        "CBSE",
        // "ICSE",
        // "Telangana Board"
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

                    <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Phone Number</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Phone number"
                            value={phoneNumber}
                            editable={false}
                            onChangeText={text => {
                                setPhoneNumber(text);
                                // checkFields();
                            }}
                        />
                       {isEditMode && <Text style={{color: 'red', fontSize: 12}}>Phone number can't be edited.</Text>}
                    </View>

                    <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Class</Text>
                        <Dropdown disabled={isEditMode} options={listOfClass} onSelect={(itemValue) => {
                            console.log(itemValue);
                            setClassValue((prev) => parseInt(itemValue));
                            // checkFields();
                        } } label={classValue} />

                    </View>
                    <View style={styles.inputBlocks}>
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
                    </View>

                    <View style={styles.inputBlocks}>
                        <Text style={styles.label}>Board</Text>
                        <Dropdown disabled={isEditMode} options={listOfBoards} onSelect={(itemValue) => {
                            console.log(itemValue);
                            setBoard((prev) => itemValue);
                            // checkFields();
                        } } label={board} dropdownTitle={''} />

                    </View>
                    {/* <Picker.Item label="ICSE" value="ICSE" /> */}
                    {/* <Picker.Item label="TELANGANA" value="TELANGANA" /> */}
                    <View style={styles.inputBlocks}>
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
                    </View>

                    <View style={styles.inputBlocks}>
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
                    </View>
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
        paddingHorizontal: 10,
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
        marginTop: 10
    },
    label: {
        fontSize: 16,
        fontWeight: '400',
    },
    input: {
        padding: 0,
        borderBottomWidth: 1,
        borderColor: Colors.primary,
        color: 'black'
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