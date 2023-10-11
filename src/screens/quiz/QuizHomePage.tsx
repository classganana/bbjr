import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
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

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Exam Prep');
    const [data, setData] = useState<CardData[]>([]);
    const [options, setOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [board, setBoard] = useState("CBSE");
    const [className, setClassName] = useState(10);
    const [multiSelect, setMultiSelect] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    // const [subject, setSubject] = useState()
    const [selectedQuiz, setSelectedQuiz] = useState<any[]>();

    const [subjects, setSubject] = useState([
        "Maths", "Science", "Hindi", "Physics", "Biology", "Civics"
    ]);

    const selectSpecificSubject = () => { }

    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.removeItem('quizType');
        setOptions(false);
        resetSelection();
        setMultiSelect(false);
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
        tempData  = tempData.map((temp) => {
            if (temp.id != (index)) {
                !multiSelect && (temp.selected = false);
            }
            return temp;
        });

        (tempData[index].selected = true);
        setSelectedQuiz(() => [tempData.filter((item) => item.selected)]);
        setData(() => [...tempData]);
    }

    const startTheQuiz = async () => {
        await AsyncStorage.removeItem('quizType');
        await AsyncStorage.setItem('quizType', 'quiz');
        navigation.navigate('QuizFirstPage' as never, selectedQuiz  as never);
    }

    const startThePractice = async () => {
        await AsyncStorage.removeItem('quizType');
        const item = data.filter((item) => item.selected == true)[0];
        await AsyncStorage.setItem('quizType', 'practice');
        navigation.navigate('QuizFirstPage' as never, selectedQuiz as never);
    }

    useEffect(() => {
        const s = {
            "schoolId": "default",
            "boardId": "CBSE",
            "className": 10,
            "studentId": 10,
            "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
            "subject": "Science"
        }

        const reqObj = {
            "service": "ml_service",
            "endpoint": `/explore_quizzes/data`,
            "requestMethod": "POST",
            "requestBody": s
        }
        httpClient.post(`auth/c-auth`, reqObj)
            .then((res) => {
                let list = res.data.data.quizzes
                list = list.map((item: any, index: number) => {
                    return {
                        id: index,
                        title: (tab == 'Quizzes') ? item.name : item.chapterName,
                        infoText: 'Info about Card 1',
                        imageUrl: 'https://placehold.co/400',
                        done: false,
                        noOfQuestions: item.totalQuestions,
                        timeRequired: item.time,
                        selected: false,
                        score: item.score
                    }
                })
                console.log(list)
                setData(list);
            });
    }, [])

    useEffect(() => {
        const req = {
            "schoolId": "default",
            "boardId": "CBSE",
            "className": 10,
            "studentId": 10,
            "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
            "subject": "Science"
        }

        const reqObj = {
            "service": "ml_service",
            "endpoint": `/explore_quizzes/data`,
            "requestMethod": "POST",
            "requestBody": req
        }

        httpClient.post(`auth/c-auth`, reqObj)
            .then((res) => {
                let list = res.data.data.quizzes
                list = list.map((item: any, index: number) => {
                    return {
                        id: index,
                        title: (tab == "Exam Prep") ? item.chapterName: item.name,
                        infoText: 'Info about Card 1',
                        imageUrl: 'https://placehold.co/400',
                        done: false,
                        noOfQuestions: item.totalQuestions,
                        timeRequired: item.time,
                        selected: false,
                        score: item.score,
                        quizType: tab
                    }
                })
                setData(list);
            })
    }, [tab])

    const onBack = () => {
        navigation.navigate('QuizHomepage' as never)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <StrongBackButton height={'25'} width={'25'} fill={'black'} />
                    </TouchableOpacity>
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
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                        <ExamPrepQuizCard title={'Science'} onCardClick={(i) => updateList(i)} id={10000} infoText={''} imageUrl={''} noOfQuestions={0} done={false} score={10} />
                        )}
                    />
                </>}
                {tab == 'Exam Prep' && <>
                    {/* <ExamPrepSubjects subjects={subjects} /> */}
                    <View>
                        <TouchableOpacity >
                            <Text>Exam Preparation</Text>
                        </TouchableOpacity>
                        <TouchableOpacity  >
                            <Text>Change</Text>
                            <View >
                                <Pencil height={'20'} width={'20'} fill={Colors.black_01} />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <ExamPrepQuizCard title={'Science'} onCardClick={(i) => updateList(i)} id={10000} infoText={''} imageUrl={''} noOfQuestions={0} done={false} score={10} />
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
                        keyExtractor={(item) => item.id.toString()} // Assuming `id` is unique and of string type
                        renderItem={({ item }) => (
                            <ExamPrepQuizCard score={item.score} key={item.id} {...item} onCardClick={(i) => updateList(i)} />
                        )}
                    />
                </>
                }
            </View>
            {options && <View style={styles.floatingButtonContainer}>
                <TouchableOpacity style={styles.floatingButton} onPress={startThePractice}>
                    <TestIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Practice</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={startTheQuiz} style={styles.floatingButton}>
                    <ClockIcon height={'20'} width={'20'} fill={'black'} />
                    <Text style={styles.floatingButtonText}>Take a Test</Text>
                </TouchableOpacity>
            </View>}
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
        backgroundColor: Colors.white
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
    }
});