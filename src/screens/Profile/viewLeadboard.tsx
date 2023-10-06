import React, { useState } from 'react';
import { View, ScrollView, Platform, Image, Text, StyleSheet } from 'react-native';
import { Colors } from '../../styles/colors';
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { ExitButton } from '../../components/common/ButttonComponent/ButtonStyles';



const viewLeadboard = () => {
    //     const [name, setName] = useState('');
    //     const [classValue, setClassValue] = useState(''); // No default class selected
    //     const [school, setSchool] = useState('');
    //     const [board, setBoard] = useState(''); // No default board selected
    //     const [phoneNumber, setPhoneNumber] = useState('');
    //     const [GuardianName, setGuardianName] = useState('');
    //     const [GuardianEmail, setGuardianEmail] = useState('');

    //     const [isEditMode, setIsEditMode] = useState(false);

    //     const toggleEditMode = () => {
    //         setIsEditMode(!isEditMode);
    //     };
    return (

        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.heading}>
                        <View style={styles.backButton}>
                            <ArrowLeft height={'25'} width={'25'} fill={'black'} />
                        </View>
                        <Text style={styles.headingTitle}>view leadboard</Text>
                    </View>
                </View>
                <View style={styles.DetailContainer}>
                    <Text style={styles.BodyTitle}>Leadboard</Text>
                    <View style={styles.BodyContainer}>
                        <Text style={styles.BodyText}>Congratulations! You're ahead of 60% of our users. Let's aim even higher!</Text>
                        <Button label={'Explore'} className={ExitButton} disabled={false} onPress={function (): void { }} />
                    </View>
                    <View style={styles.subContainer}>
                        <Text>High Score</Text>
                        <Text>score</Text>
                    </View>
                    <View style={styles.subContainer}>
                    <Text>Rank</Text>
                        <Text>score</Text>
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
    BodyTitle: {
        color: Colors.black_01,
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 0.3,
        paddingHorizontal: 15,
        paddingVertical: 13,
    },
    DetailContainer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: Colors.white,
        paddingHorizontal: 19,
    },
    BodyContainer: {
        display: 'flex',
        backgroundColor: Colors.lemon_yellow,
        borderRadius: 8,
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 13,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 6,
    },
    BodyText: {
        fontSize: 13,
        fontStyle: 'normal',
        fontWeight: '500',
        lineHeight: 15,
        color: Colors.primary,
    },
    subContainer:{
        borderRadius: 10       
    },

});
export default viewLeadboard;