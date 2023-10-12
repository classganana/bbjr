import React, { useState } from 'react';
import { View, TextInput, ScrollView, Platform, Image, Text, StyleSheet } from 'react-native';
import { Button } from '../../components/common/ButttonComponent/Button'
import { Colors } from '../../styles/colors';
import { ArrowLeft, CameraIcon } from '../../components/common/SvgComponent/SvgComponent';
import { Picker } from '@react-native-picker/picker';
import { CancelButton, EditButton, ExitButton, LoginButton, OutlineButton, SubmitButton } from '../../components/common/ButttonComponent/ButtonStyles';

const EditProfile = () => {
    const [name, setName] = useState('');
    const [classValue, setClassValue] = useState(''); // No default class selected
    const [school, setSchool] = useState('');
    const [board, setBoard] = useState(''); // No default board selected
    const [phoneNumber, setPhoneNumber] = useState('');
    const [GuardianName, setGuardianName] = useState('');
    const [GuardianEmail, setGuardianEmail] = useState('');

    const [isEditMode, setIsEditMode] = useState(false);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.heading}>
                        <View style={styles.backButton}>
                            <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                        </View>
                        <Text style={styles.headingTitle}>Profile</Text>
                    </View>
                </View>
                <View style={styles.DetailContainer}>
                    <View style={styles.ImageContainer}>
                        <View style={styles.ProfileImage} >
                            <View style={styles.CameraBorder}>
                                <CameraIcon height={'50'} width={'50'} fill={'white'} />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Student Name"
                        editable={isEditMode}
                        value={name}
                        onChangeText={text => {
                            setName(text);
                            // checkFields();
                        }}
                    />

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

                    <Text style={styles.label}>Class</Text>
                    <View style={styles.picker}>
                        <Picker
                            selectedValue={classValue}
                            enabled={isEditMode}
                            onValueChange={(itemValue) => {
                                setClassValue(itemValue);
                                // checkFields();
                            }}
                        >
                            <Picker.Item label="Select Class" value="" />
                            {Array.from({ length: 10 }, (_, i) => i + 3).map((item) => (
                                <Picker.Item label={item.toString()} value={item.toString()} key={item} />
                            ))}
                        </Picker>
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
                            <Picker.Item label="ICSE" value="ICSE" />
                            <Picker.Item label="CBSE" value="CBSE" />
                            <Picker.Item label="TELANGANA" value="TELANGANA" />
                        </Picker>
                    </View>
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
                        placeholder="Enter Guardian’s Email"
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
                            <Button label={'Submit'} disabled={false} className={ExitButton} onPress={toggleEditMode} />
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
        backgroundColor: Colors.primary
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
        color: Colors.white,
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
    label: {
        fontSize: 16,
        fontWeight: '400',
    },
    input: {
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        height: 50, // Set the height as needed
        marginBottom: 10,
    },
    picker: {
        borderBottomWidth: 2,
        borderColor: Colors.primary,
        backgroundColor: "#FFF",
        height: 40, // Set the height as needed
        marginBottom: 10,
    },
    btn: {
        display: 'flex',
        margin: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignSelf: 'center',
        width: '100%',
        // flex:1,
    },
    Editbtn: {
        // display: 'flex',
        margin: 50,
        // flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'center',
        // width: '100%',
        // flex:1,
    }
});
export default EditProfile;