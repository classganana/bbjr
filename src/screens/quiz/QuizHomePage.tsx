import React, { useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ClockIcon, CrossIcon, Pencil, StrongBackButton, TestIcon } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { CardData } from '../../components/quiz/QuizCard';
import { ExamPrepQuizCard } from '../../components/quiz/ExamPrepQuizCard';
import { useNavigation } from '@react-navigation/native';
import { httpClient } from '../../services/HttpServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../../components/StudentAiAssistant/subjectbuttons/Subject';
import { Button } from '../../components/common/ButttonComponent/Button';
import { EditButton } from '../../components/common/ButttonComponent/ButtonStyles';
import { useUser } from '../../context/UserContext';
import { styles } from './QuizHomePageStyle';
import { UtilService } from '../../services/UtilService';

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Quizzes');
    const [data, setData] = useState<CardData[]>([]);
    const [options, setOptions] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [board, setBoard] = useState("CBSE");
    const [className, setClassName] = useState(10);
    const [multiSelect, setMultiSelect] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    // const [subject, setSubject] = useState()
    const [selectedQuiz, setSelectedQuiz] = useState<any[]>();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [loadingText, setLoadingText] = useState('');

    const [subjects, setSubject] = useState([
        "Maths", "Science", "Hindi", "Physics", "Biology", "Civics"
    ]);

    const navigation = useNavigation();

    useEffect(() => {
        AsyncStorage.removeItem('quizType');
        setOptions(false);
        resetSelection();
        setMultiSelect(false);
    }, [tab, searchTerm])
     
    useEffect(() => {
        setOptions(false);
        resetSelection();
    },[multiSelect])

    const resetSelection = () => {
        let tempData = data;
        if(tempData && tempData.length) {
            tempData = tempData.map((temp) => {
                temp.selected = false;
                return temp;
            });
            setData(() => [...tempData]);
        }
        setSelectedQuiz([]);
    }

    const updateList = (index: number) => {
        setOptions(true);
        let tempData = data;
        if(tempData && tempData.length) {
            tempData  = tempData.map((temp) => {
                if (temp.id != (index)) {
                    !multiSelect && (temp.selected = false);
                }
                return temp;
            });
    
            tempData[index].selected = true;
            tempData[index].subject = selectedSubject.subjectName;
            setSelectedQuiz(() => [tempData.filter((item) => item.selected)]);
            setData(() => [...tempData]);
        }
    }

    const setSubjectAndCloseModal = (item: any) => {
        setBottomSheetVisible(false);
        setSelectedSubject(item);
      };

    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [selectedSubject, setSelectedSubject] = useState<{
        subjectName: string;
    }>({subjectName:"Science"});

    const startTheQuiz = async () => {
        await AsyncStorage.removeItem('quizType');
        await AsyncStorage.setItem('quizType', 'quiz');
        UtilService.setQuizType('quiz');

        navigation.navigate('QuizFirstPage' as never, selectedQuiz  as never);
    }

    const startThePractice = async () => {
        await AsyncStorage.removeItem('quizType');
        const item = data.filter((item) => item.selected == true)[0];
        await AsyncStorage.setItem('quizType', 'practice');
        UtilService.setQuizType('practice');
        navigation.navigate('QuizFirstPage' as never, selectedQuiz as never);
    }

    const setAvailableSubject = () => {
        const reqObj = {
          "service": "ml_service",
          // "endpoint":  `data/quizz/${board}/${className}/${subjects}`,
          "endpoint": `/subjects?board_id=${user?.board}&class_name=${user?.class}&school_id=default`,
          "requestMethod": "GET"
      }
    
      httpClient.post(`auth/c-auth`, reqObj).then((res) => {
        const subjectList = res.data.data;
        const result = subjectList.map((sub: any) => {
          return {
            subjectName: sub.subject
          }
        })
        setSelectedSubject(result[0]);
      })
      
    };
    

    useEffect(() => {
        setAvailableSubject();
        const fetchData = async () => {
            try {
                // You might want to set loading state here.
                setLoading(true);
                setLoadingText("Loading");
                const s = {
                    "schoolId": "default",
                    "boardId": user?.board,
                    "className": user?.class,
                    "studentId": user?.userId,
                    "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
                    "subject": selectedSubject.subjectName
                }

                const reqObj = {
                    "service": "ml_service",
                    "endpoint": `/explore_quizzes/data`,
                    "requestMethod": "POST",
                    "requestBody": s
                }
                
                const response = await httpClient.post(`auth/c-auth`, reqObj);
                
                // Handle successful response
                let list = response.data.data.quizzes;
                if(list && list.map) {
                    list = list.map((item: any, index: number) => ({
                        id: index,
                        title: (tab === 'Quizzes') ? item.name : item.chapterName,
                        infoText: 'Info about Card 1',
                        imageUrl: 'https://placehold.co/400',
                        done: false,
                        noOfQuestions: item.totalQuestions,
                        timeRequired: item.time,
                        selected: false,
                        score: item.score,
                        subject: selectedSubject.subjectName
                    }));
                    
                    setData(list);
                }
            } catch (error) {
                // Handle errors here. You can display a message to the user.
                console.error("Error fetching data:", error);
                setLoadingText("Something Went Wrong");
            } finally {
                setLoadingText("Data");
                // Make sure to unset loading state.
                setLoading(false);
            }
        };
        
        fetchData();
    }, []);

    useEffect(() => {
        setData([]);
        const s = {
            "schoolId": "default",
            "boardId": user.board,
            "className": user.class,
            "studentId": user.userId,
            "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
            "subject": selectedSubject.subjectName
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
                if(list && list.map) {
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
                    setData(list);
                }
            });
    },[selectedSubject?.subjectName])

    useEffect(() => {
        setData([]);
        const req = {
            "schoolId": "default",
            "boardId": user?.board,
            "className": user?.class,
            "studentId": user?.userId,
            "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
            "subject": selectedSubject.subjectName
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
                if(list && list.map) {
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
                }
            })
    }, [tab])

    const onBack = () => {
        navigation.navigate('DashboardNavigator' as never)
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
                {/* <View style={styles.infoContainer}>
                    <SearchIcon height={'20'} width={'20'} fill={'#787878'} />
                    <TextInput style={styles.searchBox}
                        onChangeText={(text) => { setSearchTerm(text) }}
                        placeholderTextColor={"#808080"} placeholder='Seach Quizzes'></TextInput>
                </View> */}
            </View>
            <View style={styles.body}>
                <View style={styles.tabs}>
                    <Tabs activeTab={tab} tabs={['Quizzes', 'Exam Prep']} onChangeTab={(i) => {
                        setTab(i)
                        UtilService.setQuizFlow(i);}} ></Tabs>
                </View>
                <ScrollView style={styles.tabs}>
                    {tab == "Quizzes" && <>
                    <Text style={styles.selectedOption}>{tab}</Text>
                    {data.map((item) => (
                            <ExamPrepQuizCard
                            key={item.id}
                            score={item.score}
                            {...item}
                            onCardClick={(i) => updateList(i)}
                            />
                        ))}
                        <>
                            {data && data.length == 0 && <>
                                <Text style={{fontSize: 100}}>Loading</Text>
                            </>}
                        </>
                    </>}
                    {tab == 'Exam Prep' && <>
                        {/* <ExamPrepSubjects subjects={subjects} /> */}
                        <View>
                            <TouchableOpacity >
                                <Text style={styles.examPreparation}>Exam Preparation</Text>
                            </TouchableOpacity>
                            <Text>Selected Subject</Text>
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
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text>All Chapter Wise</Text>
                            <TouchableOpacity onPress={() => { setMultiSelect(!multiSelect) }}>
                                {multiSelect && <View style={styles.crossMultiSelect} >
                                    <CrossIcon height={12} width={12} fill={Colors.black_01} />
                                    <Text>
                                        {(selectedQuiz && selectedQuiz[0]?.length)? selectedQuiz[0]?.length: 0}
                                    </Text>
                                </View>}
                                {!multiSelect && <Text>Select</Text>}
                            </TouchableOpacity>
                        </View>

                        {data && data.map((item) => (
                            <ExamPrepQuizCard
                            key={item.id}
                            score={item.score}
                            {...item}
                            onCardClick={(i) => updateList(i)}
                            />
                        ))}
                        {loading && <>
                            <Text style={{fontSize: 100}}>{loadingText}</Text>
                        </>
                        }
                        {!loading && data && data.length == 0 && <> 
                            <Text style={{fontSize: 100}}>No Data</Text>
                        </>}
                    </>
                    }
                </ScrollView>
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
        </View>
    )
}