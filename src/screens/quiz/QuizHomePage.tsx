import React, { useEffect, useState } from 'react'
import { FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Colors } from '../../styles/colors';
import { ClockIcon, CrossIcon, NewBackButton, Pencil, StrongBackButton, TestIcon } from '../../components/common/SvgComponent/SvgComponent';
import Tabs from '../../components/common/Tabs/Tabs';
import { CardData } from '../../components/quiz/QuizCard';
import { ExamPrepQuizCard } from '../../components/quiz/ExamPrepQuizCard';
import { useNavigation } from '@react-navigation/native';
import { CDN, httpClient } from '../../services/HttpServices';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Student } from '../../components/StudentAiAssistant/subjectbuttons/Subject';
import { Button } from '../../components/common/ButttonComponent/Button';
import { EditButton, LoginButton, TakeTest } from '../../components/common/ButttonComponent/ButtonStyles';
import { useUser } from '../../context/UserContext';
import { styles } from './QuizHomePageStyle';
import { UtilService } from '../../services/UtilService';
import { ExamPrepAllChapter } from '../../components/quiz/ExamPrepAllChapter';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native';

interface Chapter {
    chapterName: string;
    totalQuestions: number;
    practicedQuestions: number;
    score: number | null;
}

export const QuizHomePage = () => {
    const [tab, setTab] = useState('Quizzes');
    const [data, setData] = useState<CardData[]>([]);
    const [options, setOptions] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [board, setBoard] = useState("CBSE");
    const [className, setClassName] = useState(10);
    const [multiSelect, setMultiSelect] = useState(false);
    const [totalQuestions, setTotalQuestions] = useState(0);
    const [selectedQuiz, setSelectedQuiz] = useState<any[]>();
    const [loading, setLoading] = useState(true);
    const {user} = useUser();
    const [loadingText, setLoadingText] = useState('');
    const [subjectUrl, setSubjectUrl] = useState('');
    const [tempSubject, setTempSubject] = useState('');

    const [subjects, setSubject] = useState([
        "Maths", "Science", "Hindi", "Physics", "Biology", "Civics"
    ]);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

    const [selectedSubject, setSelectedSubject] = useState<{
        subjectName: string;
    }>({subjectName:""});

    const [allChapterSelected, setAllChapterSelected] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        setOptions(false);
        resetSelection();
    },[multiSelect])

    useEffect(() => {
        setScreen();
        UtilService.checkIfCDNHasTheImage(selectedSubject.subjectName).then((item) => {
            console.log("here is URL => ", selectedSubject.subjectName);
            setSubjectUrl(item+ "?v="+ Date.now());
        }).catch((err) => {
            console.log("here is error => ", err, selectedSubject.subjectName);
        })

        fetchData();
        // const s = {
        //     "schoolId": "default",
        //     "boardId": user?.board,
        //     "className": user?.class,
        //     "studentId": user?.userId,
        //     "screenPage": (tab == 'Quizzes') ? "quizzes" : "examPreparation",
        //     // "subject": "Science"
        //     "subject": selectedSubject.subjectName
        // }

        // const reqObj = {
        //     "service": "ml_service",
        //     "endpoint": `/explore_quizzes/data`,
        //     "requestMethod": "POST",
        //     "requestBody": s
        // }
        // httpClient.post(`auth/c-auth`, reqObj)
        //     .then((res) => {
        //         let list = res.data.data.quizzes
        //         if(list && list.map) {
        //             list = list.map((item: any, index: number) => {
        //                 return {
        //                     id: index,
        //                     title: (tab == 'Quizzes') ? item.name : item.chapterName,
        //                     infoText: 'Info about Card 1',
        //                     imageUrl: 'https://placehold.co/400',
        //                     done: false,
        //                     noOfQuestions: item.totalQuestions,
        //                     timeRequired: item.time,
        //                     selected: false,
        //                     score: item.score,
        //                     practiceProgress: (item.practicedQuestions/item.totalQuestions)*100
        //                 }
        //             })
        //             setData(list);
        //         }
        //     });
    },[selectedSubject?.subjectName, tab]);

    // useEffect(() => {
    //     setOptions(false);
    //     setData([]);
    //     AsyncStorage.removeItem('quizType');
    //     fetchData();
    // }, [tab])

    useEffect(() => {
        // setAvailableSubject();
        getSubjectFromLocal();
        setLoading(false); 
    }, []);

    useEffect(() => {
        setOptions(false);
        resetSelection();
    },[multiSelect])

    useEffect(() => {
        if(allChapterSelected){
            setOptions(true);
            resetSelection();
        } else {
            setOptions(allChapterSelected);
        }
        setSelectedQuiz(() => []);
    },[allChapterSelected]);

    useEffect(() => {
        console.log("New Su",subjectUrl)
    }, [subjectUrl])

    const fetchData = async () => {
        setData([]);
        try {
            // You might want to set loading state here.
            setLoading(true);
            setLoadingText("Loading");
            const currentTab = await AsyncStorage.getItem('quizFlow');
            const s = {
                "schoolId": "default",
                "boardId": user?.board,
                "className": user?.class,
                "studentId": user?.userId,
                "screenPage": (currentTab == 'Quizzes') ? "quizzes" : "examPreparation",
                // "subject": "Science"
                "subject": selectedSubject.subjectName
            }

            const reqObj = {
                "service": "ml_service",
                "endpoint": `/explore_quizzes/data`,
                "requestMethod": "POST",
                "requestBody": s
            }
            
            if(selectedSubject.subjectName && selectedSubject.subjectName.length){
                const response = await httpClient.post(`auth/c-auth`, reqObj);
                
                // Handle successful response
                let list = response.data.data.quizzes;
                (tab !== 'Quizzes') && sortChapters(list)
                if(list && list.map) {
                    list = sortChapters(list)
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
                        // subject: "Science"
                        subject: selectedSubject.subjectName,
                        practiceProgress: (item.practicedQuestions/item.totalQuestions)*100
                    }));
                    // console.log(list);
                    // const newList = sortChapters(list)
                    // console.log(newList);
                    setData(list);
                }
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

    // const sortChapters = (chapters: Chapter[]) => {
    //     // Define a custom sorting function based on chapter number
    //     const customSort = (a: any, b: any) => {
    //         const chapterNumA = parseInt(a.title.match(/\d+/)[0]);
    //         const chapterNumB = parseInt(b.title.match(/\d+/)[0]);
    //         return chapterNumA - chapterNumB;
    //     };
    
    //     // Sort the chapters array using the custom sorting function
    //     chapters.sort(customSort);
        
    //     setData(chapters as any);
    //     return chapters;
    // };

    function sortChapters(data: any) {
        return data.sort((a, b) => {
          // Extract chapter numbers from chapter names
          const chapterNumberA = extractChapterNumber(a.chapterName);
          const chapterNumberB = extractChapterNumber(b.chapterName);
      
          // Handle chapters with numbers (sort numerically)
          if (chapterNumberA !== null && chapterNumberB !== null) {
            return chapterNumberA - chapterNumberB;
          }
      
          // Handle chapters without numbers (sort alphabetically)
          if (chapterNumberA === null && chapterNumberB === null) {
            return a.chapterName.localeCompare(b.chapterName);
          }
      
          // If one chapter has a number and the other doesn't, prioritize the one with a number
          return chapterNumberA !== null ? -1 : 1;
        });
      }
      
      // Helper function to extract chapter number from chapter name
      function extractChapterNumber(chapterName: any) {
        const match = chapterName.match(/\d+/);
        return match ? parseInt(match[0]) : null;
      }

    const setSubjectToLocal = async (item: {subjectName: string}) => {
        try {
          await AsyncStorage.setItem('quizSubject', item.subjectName);
        } catch (e) {
          console.log("Error => ", e);
        }
      }
    
    const getSubjectFromLocal = async () => {
        try {
            const subject = await AsyncStorage.getItem('quizSubject');
            if (subject && subject.length) {
                setSelectedSubject({subjectName : subject});
            } else {
                setAvailableSubject();
            }
        } catch (e) {
            console.log("Error => ", e);
        }
    }

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
        setOptions(false);
    }

    const updateList = (index: number) => {

        setData((prev) => {
            let tem = prev;
            tem  = tem.map((temp) => {
                if (temp.id != (index)) {
                    !multiSelect && (temp.selected = false);
                } 
                return temp;
            });
            if(tem[index].selected) tem[index].selected = false;
            else tem[index].selected = true;
            tem[index].subject = selectedSubject.subjectName;
            setOptions(true);
            return tem;
        })
        setAllChapterSelected(false)
        setSelectedQuiz(() => [data.filter((item) => item.selected)]);
        // setData(() => [...tempData]);
    }


    const getSelectedChapters = (data: CardData[]) => {
        // Filter the array to include only objects where selected is true
        const selectedChapters = data.filter(item => item.selected);
      
        // Map the filtered array to extract the chapter number from the title
        const chapters = selectedChapters.map(item => {
          // Extract the chapter number from the title
          const chapterNumber = (tab == 'Quizzes')? item?.title?.match: parseInt(item?.title?.match(/\d+/)[0]);
          return { chapterNo: chapterNumber };
        });
      
        return chapters;
      }

    const setSubjectAndCloseModal = () => {
        setBottomSheetVisible(false);
        setSelectedSubject(tempSubject as any);
        setSubjectToLocal(tempSubject as any);
        setTempSubject('');
      };

    const setTemporarySubject = (item: any) => {
        setTempSubject(item);
    }


    const startTheQuiz = async () => {
        await AsyncStorage.removeItem('quizType');
        await AsyncStorage.setItem('quizType', 'quiz');
        UtilService.setQuizType('quiz');
        setAllChapterSelected(false);
        resetSelection();
        if(!allChapterSelected) {
            navigation.navigate('QuizFirstPage' as never, selectedQuiz as never);
        } else {
            allChapterNavigate()
        }
    }

    const startThePractice = async () => {
        await AsyncStorage.removeItem('quizType');
        const item = data.filter((item) => item.selected == true)[0];
        await AsyncStorage.setItem('quizType', 'practice');
        UtilService.setQuizType('practice');
        setAllChapterSelected(false);
        resetSelection();
        if(!allChapterSelected) {
            navigation.navigate('QuizFirstPage' as never, selectedQuiz as never);
        } else {
            allChapterNavigate()
        }
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
    
    const setScreen = async () => {
        const screen = await AsyncStorage.getItem('quizFlow');
        if(screen == "Quizzes") {
            setTab('Quizzes');
        } else {
            setTab('Exam Preparation')
        }
    }

    const allChapterCardClick = async () => {
        setAllChapterSelected(prevState => !prevState);
        // allChapterNavigate();
    }

    const onBack = () => {
        navigation.navigate('DashboardNavigator' as never)
    }

    const allChapterNavigate = () => {
        const a = [[{
                    subject: selectedSubject.subjectName,
                    allChapter: true,
                    title: ["All Chapters: " + selectedSubject.subjectName]
                }]]
        navigation.navigate('QuizFirstPage' as never, a as never);       
    }

    const DynamicRenderingSubjectCardorAllChapterCard = () => {
        if(!multiSelect && selectedQuiz &&  selectedQuiz[0] && selectedQuiz[0].length > 0) {
            const selectedItem = selectedQuiz[0][0]; 
            return <>
            {data.map((item, key) => (
                    item.selected && <ExamPrepQuizCard
                    key={key}
                    score={item.score}
                    {...item}
                    onCardClick={(i) => {}}/>
            ))}
            </> 
        } else {
            return ( 
                <View style={styles.allChapterCard}>
                    <View style={{height: 180, borderRadius: 10, overflow: 'hidden',}}>
                        <Image 
                            source={{ uri: subjectUrl && subjectUrl.length ? subjectUrl: 'https://placehold.co/400' }} 
                            resizeMode="cover" 
                            style={{ height: 200, width: "100%" }} 
                            />
                    </View>
                    <Text style={styles.allChapterCardtext}>{selectedSubject.subjectName} - All Chapters</Text>
                </View>
                )
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <TouchableOpacity style={styles.backButton} onPress={onBack}>
                        <NewBackButton height={'18'} width={'25'} fill={'black'} />
                    </TouchableOpacity>
                    <Text style={styles.headingTitle}>Boost Your Knowledge</Text>
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
                    <Tabs activeTab={tab} tabs={['Quizzes', 'Exam Preparation']} onChangeTab={(i) => {
                        setTab(i)
                        UtilService.setQuizFlow(i);}} ></Tabs>
                </View>
                <ScrollView style={styles.tabs}>
                    {tab == "Quizzes" && <>
                    <Text style={styles.selectedOption}>{tab}</Text>
                    {data.map((item, key) => (
                            <ExamPrepQuizCard
                            practiceProgress={item.practiceProgress} key={key}
                            score={item.score}
                            {...item}
                            onCardClick={(i) => updateList(i)}                            />
                        ))}
                        {loading && <>
                            {/* <Text style={{fontSize: 100}}>{loadingText}</Text> */}
                            {/* <Image  style={{ height: 200, width: "50%", alignSelf: 'center' }}  source={{ uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/loading.gif' }} /> */}
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </>}
                        <>
                            {data && data.length == 0 && <>
                                <Image source={{ uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/loading.gif' }} />
                            </>}
                        </>
                    </>}
                    {tab == 'Exam Preparation' && <>
                        {/* <ExamPrepSubjects subjects={subjects} /> */}
                        <View>
                            {/* <TouchableOpacity >
                                <Text style={styles.examPreparation}>Exam Preparation</Text>
                            </TouchableOpacity> */}
                            {/* <Text>Selected Subject</Text> */}


                            <View style={styles.buttoncontainer}>
                            <Text style={styles.selectedSubject} numberOfLines={1} ellipsizeMode="tail" >
                                {selectedSubject?.subjectName}
                            </Text>
                            <TouchableOpacity onPress={() => setBottomSheetVisible(true)} style={styles.changebutton} >
                                <Text>Change</Text>
                                <View style={styles.pencil}>
                                    <NewBackButton height={'12'} width={'12'} fill={Colors.white} />
                                </View>
                            </TouchableOpacity>
                            </View>
                            <ExamPrepAllChapter selected={allChapterSelected} onCardClick={() => { allChapterCardClick ()}}
                            id={0} title={'All Chapters'} infoText={''} imageUrl={subjectUrl && subjectUrl.length ? subjectUrl: 'https://placehold.co/400'} noOfQuestions={0} done={false} practiceProgress={0} score={0} />
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10}}>
                            <Text style={styles.chapterWise}>Chapter Wise</Text>
                            <TouchableOpacity onPress={() => { setMultiSelect(!multiSelect) }}>
                                {multiSelect && <View style={styles.crossMultiSelect} >
                                    <CrossIcon height={12} width={12} fill={Colors.black_01} />
                                    <Text>
                                        {(selectedQuiz && selectedQuiz[0]?.length)? selectedQuiz[0]?.length: 0}
                                    </Text>
                                </View>}
                                {!multiSelect && <Text style={styles.crossMultiSelect}>Select</Text>}
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
                            {/* <Text style={{fontSize: 100}}>{loadingText}</Text> */}
                            {/* <Image  style={{ height: 200, width: "50%", alignSelf:  'center' }}  source={{ uri: 'https://d1n3r5qejwo9yi.cloudfront.net/assets/loading.gif' }} /> */}
                            <ActivityIndicator size="large" color={Colors.primary} />
                        </>
                        }
                        {!loading && data && data.length == 0 && <> 
                            <Text style={{fontSize: 100}}>No Data</Text>
                        </>}
                    </>
                    }
                </ScrollView>
                {
                (allChapterSelected || (!multiSelect && options && getSelectedChapters(data).length == 1)) &&
                    <Modal
                    animationType="fade"
                    transparent={true}
                    visible={(allChapterSelected || options && getSelectedChapters(data).length > 0)}
                    onRequestClose={() => setBottomSheetVisible(false)}>
                    <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}></View>   
                    <View style={styles.floatingButtonContainer}>
                        <DynamicRenderingSubjectCardorAllChapterCard />
                        <Text>
                            Which one do you want to explore?
                        </Text>
                        <TouchableOpacity style={styles.crossfloatingButton} onPress={() => { resetSelection(); setAllChapterSelected(false) }}>
                                <CrossIcon height={18} width={18} fill={Colors.black_01} />
                        </TouchableOpacity>
                        {/* {multiSelect &&  getSelectedChapters(data).length && <Text>Selected Chapters</Text> }
                        {multiSelect &&  getSelectedChapters(data).length && <View style={styles.selectedChapterContainer}>
                            {multiSelect && getSelectedChapters(data).map((item: any, index: number) => {
                                return (
                                    <View key={index} style={styles.selectedChapters}>
                                        <Text key={index}>{item.chapterNo}</Text>
                                    </View>    
                                )
                            })}
                        </View>    
                        } */}
                        <TouchableOpacity style={styles.floatingButton} onPress={startThePractice}>
                            {/* <TestIcon height={'20'} width={'20'} fill={'black'} /> */}
                            <Text style={styles.floatingButtonText}>Practice</Text>
                        </TouchableOpacity>
                        <Button className={TakeTest} label={"Take a Test"} disabled={false} onPress={startTheQuiz}></Button>
                        {/* <TouchableOpacity onPress={startTheQuiz} style={styles.floatingButton}>
                            <ClockIcon height={'20'} width={'20'} fill={'black'} />
                            <Text style={styles.floatingButtonText}>Take a Test</Text>
                        </TouchableOpacity> */}
                    </View>
                    </Modal>
                }

                {(multiSelect && options && getSelectedChapters(data).length > 0) &&
                    <View style={styles.floatingButtonContainer}>
                        <Text>
                            Which one do you want to explore?
                        </Text>
                        <TouchableOpacity style={styles.crossfloatingButton} onPress={() => { resetSelection(); setAllChapterSelected(false) }}>
                                <CrossIcon height={18} width={18} fill={Colors.black_01} />
                        </TouchableOpacity>
                        {multiSelect &&  getSelectedChapters(data).length && <Text>Selected Chapters</Text> }
                        {multiSelect &&  getSelectedChapters(data).length && <View style={styles.selectedChapterContainer}>
                            {multiSelect && getSelectedChapters(data).map((item: any, index: number) => {
                                return (
                                    <View key={index} style={styles.selectedChapters}>
                                        <Text key={index}>{item.chapterNo}</Text>
                                    </View>    
                                )
                            })}
                        </View>    
                        }
                        <TouchableOpacity style={styles.floatingButton} onPress={startThePractice}>
                            {/* <TestIcon height={'20'} width={'20'} fill={'black'} /> */}
                            <Text style={styles.floatingButtonText}>Practice</Text>
                        </TouchableOpacity>
                        <Button className={TakeTest} label={"Take a Test"} disabled={false} onPress={startTheQuiz}></Button>
                        {/* <TouchableOpacity onPress={startTheQuiz} style={styles.floatingButton}>
                            <ClockIcon height={'20'} width={'20'} fill={'black'} />
                            <Text style={styles.floatingButtonText}>Take a Test</Text>
                        </TouchableOpacity> */}
                    </View>
                }

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={bottomSheetVisible}
                    onRequestClose={() => setBottomSheetVisible(false)}
                >
                    <View style={{ backgroundColor: 'rgba(0, 0, 0,0.3)', flex: 1 }}>
                        <View style={styles.bottomSheetContainer}>
                            <Text style={styles.subjecttxt}>Subject</Text>
                            <ScrollView style={{ borderTopWidth: 1, borderColor: Colors.light_gray_05, height: "30%" }}>
                                <Student selectedSubject={(item: any) => setTempSubject(item)} themeColor={true} subject={selectedSubject.subjectName} />
                            </ScrollView>
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
                                    disabled={tempSubject.length == 0}
                                    className={EditButton}
                                    onPress={() => setSubjectAndCloseModal()}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>
    )
}