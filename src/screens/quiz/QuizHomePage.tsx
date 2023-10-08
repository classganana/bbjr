import React, { useEffect, useState } from 'react'
import { FlatList, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ClockIcon, CrossIcon, Pencil, StrongBackButton, TestIcon } from '../../components/common/SvgComponent/SvgComponent';
import { SearchIcon } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { Card, CardData } from '../../components/quiz/QuizCard';
import { ExamPrepSubjects } from '../../components/quiz/ExamPrepSubjects';
import { ExamPrepQuizCard } from '../../components/quiz/ExamPrepQuizCard';
import { useNavigation } from '@react-navigation/native';
import { httpClient } from '../../services/HttpServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../../components/StudentAiAssistant/subjectbuttons/Subject';
import { Button } from '../../components/common/ButttonComponent/Button';
import { CancelButton, EditButton, ExitButton } from '../../components/common/ButttonComponent/ButtonStyles';

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Exam Prep');
    const [data, setData] = useState<CardData[]>([
        {
            id: 0,
            title: 'Test Your Knowledge on',
            infoText: 'Info about Card 1',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 1,
            title: 'Card 2',
            infoText: 'Info about Card 2',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 30,
            timeRequired: 30,
            selected: false
        },
        {
            id: 2,
            title: 'Card Cmapis',
            infoText: 'Info about Card 2',
            imageUrl: 'https://placehold.co/400',
            done: false,
            noOfQuestions: 10,
            timeRequired: 20,
        },
    ]);
    const [options, setOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [board, setBoard] = useState("CBSE");
    const [className, setClassName] = useState(10);
    const [multiSelect, setMultiSelect] = useState(false);
    // const [subject, setSubject] = useState()

    const [subjects, setSubject] = useState([
        "Maths", "Science", "Hindi", "Physics", "Biology", "Civics"
    ]);

    const selectSpecificSubject = () => {
    }

    const navigation = useNavigation();

    useEffect(() => {
        setOptions(false);
        resetSelection();
    }, [tab, searchTerm])

    const resetSelection = () => {
        let tempData = data;
        tempData = tempData.map((temp) => {
            temp.selected = false;
            return temp;
        });
        setData(() => [...tempData]);
    }

    const updateList = (index: number) => {
        setOptions(true);
        let tempData = data;
        debugger
        tempData = tempData.map((temp) => {
            if (temp.id != (index)) {
                !multiSelect && (temp.selected = false);
            }
            return temp;
        });

        (tempData[index].selected = true);
        setData(() => [...tempData]);
    }

    const startTheQuiz = () => {
        navigation.navigate('ExploreQuiz' as never);
        AsyncStorage.setItem('', '')
    }

    const setSubjectAndCloseModal = (item: any) => {
        setBottomSheetVisible(false);
        setSelectedSubject(item);
      };

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<{
        subjectName: string;
    }>({subjectName:"wakshe"});

    // useEffect(() => {
    //     const reqObj = {
    //         "service": "ml_service",
    //         // "endpoint":  `data/quizz/${board}/${className}/${subjects}`,
    //         "endpoint":  `/data/quizz/${board}/${className}/Science`,
    //         "requestMethod": "GET",
    //         "requestBody": {
    //             "chapterName": "Chapter1 Chemical Reactions and Equations",
    //             "questions": 346,
    //             "time": 1038
    //         }
    //       }


    //     httpClient.post(`auth/c-auth`, reqObj)
    //     .then(() => {});
    // },[])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <StrongBackButton height={'25'} width={'25'} fill={'black'} />
                    </View>
                    <Text style={styles.headingTitle}>Explore Quiz</Text>
                </View>
                <View style={styles.infoContainer}>
                    <SearchIcon height={'20'} width={'20'} fill={'#787878'} />
                    <TextInput style={styles.searchBox}
                        onChangeText={(text) => { setSearchTerm(text) }}
                        placeholderTextColor={"#808080"} placeholder='Seach Quizzes'></TextInput>
                </View>
            </View>
            <View style={styles.tabs}>
                <Tabs activeTab={tab} tabs={['Quizzes', 'Exam Prep']} onChangeTab={(i) => setTab(i)} ></Tabs>
            </View>
            <View style={styles.tabs}>
                {tab == "Quizzes" && <>
                    <Text style={styles.selectedOption}>{tab}</Text>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => (
                            <ExamPrepQuizCard {...item} onCardClick={(i) => updateList(i)} />
                        )}
                    />
                </>}
                {tab == 'Exam Prep' && <>
                    {/* <ExamPrepSubjects subjects={subjects} /> */}
                    <View>
                        <TouchableOpacity >
                            <Text>Exam Preparation</Text>
                        </TouchableOpacity>
                        <View style={styles.buttoncontainer}>
                        <Text style={styles.selectedSubject}>
                            {selectedSubject?.subjectName}
                        </Text>
                        <TouchableOpacity onPress={() => setBottomSheetVisible(true)} style={styles.changebutton} >
                            <Text>Change</Text>
                            <View style={styles.pencil}>
                                <Pencil height={'20'} width={'20'} fill={Colors.white} />
                            </View>
                        </TouchableOpacity>
                        </View>
                    </View>
                    <ExamPrepQuizCard title={'Science'} onCardClick={(i) => updateList(i)} id={10000} infoText={''} imageUrl={'https://placehold.co/400'} noOfQuestions={0} done={false} />
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text>All Chapter Wise</Text>
                        <TouchableOpacity onPress={() => { setMultiSelect(!multiSelect) }}>
                            {multiSelect && <View style={styles.crossMultiSelect} >
                                <CrossIcon height={12} width={12} fill={Colors.black_01} />
                                <Text>
                                    12
                                </Text>
                            </View>}
                            {!multiSelect && <Text>Select</Text>}
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={data}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => (
                            <ExamPrepQuizCard {...item} multiSelect={multiSelect} onCardClick={(i) => updateList(i)} />
                            // <ExamPrepSubjects {...item}  />
                        )}
                    />
                </>
                }
            </View>
            {options && <View style={styles.floatingButtonContainer}>
                <TouchableOpacity style={styles.floatingButton}>
                    <TestIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Practice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startTheQuiz} style={styles.floatingButton}>
                    <ClockIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Take a Test</Text>
                </TouchableOpacity>
            </View>}

            <Modal
                animationType="fade"
                transparent={true}
                visible={bottomSheetVisible}
                onRequestClose={() => setBottomSheetVisible(false)}
            >
                <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                    <View style={styles.bottomSheetContainer}>
                        <Text style={styles.subjecttxt}>Subject</Text>
                        <View style={{ borderTopWidth: 1, borderColor: Colors.light_gray_05 }}>
                            <Student selectedSubject={(item: any) => setSubjectAndCloseModal(item)} themeColor={true} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: 5,
                                position: "absolute",
                                bottom: 0,
                                paddingHorizontal: 20,
                                paddingVertical: 20,
                                width: '100%',

                            }}

                        >
                            <Button
                                label={'Continue'}
                                disabled={false}
                                className={EditButton}
                                onPress={() => setBottomSheetVisible(false)}
                            />
                        </View>
                    </View>
                </View>
            </Modal>

        </View>
    )
}

const styles = StyleSheet.create({
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
        paddingHorizontal: 24,
        paddingVertical: 20,
        height: 150,
        flexShrink: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: Colors.primary,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 2,
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
        position: 'absolute',
        height: 46,
        width: "80%",
        bottom: 24,
        alignSelf: 'center',
        borderRadius: 25,
        borderWidth: 0.5,
        borderColor: '#B1B1B1',
        backgroundColor: '#FFF',
        shadowColor: 'rgba(0, 0, 0, 0.15)',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 1,
        flexDirection: 'row',
        overflow: 'hidden'
    },
    floatingButton: {
        flex: 1,
        borderWidth: 1 / 4,
        borderColor: "#C5C5C5",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
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

    },
    subjecttxt: {
        alignSelf: 'center',
        paddingTop: 30,
        paddingBottom: 10,
        fontFamily: 'Inter-Bold',
        fontSize: 18,
        fontWeight: '500',
        color: Colors.black_01,
        borderTopWidth: 5,
        marginTop: 5
    },
    selectedSubject: {
        width:'40%',
        textAlign:'center',
        borderRadius: 25,
        borderWidth:0.5,
        backgroundColor:Colors.light_gray_05,
        borderColor:Colors.primary,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,

    },
    changebutton:{ 
        borderRadius: 25, 
        backgroundColor: 'rgba(0, 107, 127, 0.08)',
         width: '40%', 
         justifyContent: 'center', 
         alignItems: 'center', 
         flexDirection: 'row', 
         position: 'relative' 
        },
        pencil:{ 
            width: 26.35, 
            height: 26.35, 
            borderRadius: 26.35, 
            backgroundColor: Colors.primary, 
            alignItems: 'center', 
            position: 'absolute', 
            right: 0, 
        },
        buttoncontainer:{
            flexDirection:'row',
            justifyContent:'space-between',
            paddingHorizontal:20,
            paddingVertical:20,
            
        }
});