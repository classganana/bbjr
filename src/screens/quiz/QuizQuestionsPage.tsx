// import React, { useEffect, useRef, useState } from 'react';
// import { Colors } from '../../styles/colors';
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
// import quizQuestions from '../../utils/responses/quizquestions';
// import QuestionComponent from '../../components/quiz/QuestionComponent';
// import { Button } from '../../components/common/ButttonComponent/Button';
// import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';

// export const QuizQuestionsPage = () => {
//     const [timer, setTimer] = useState(10); // Initial timer value in seconds

//     const questionScrollViewRef = useRef(null);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (timer > 0) {
//                 setTimer(timer - 1);
//             } else {
//                 clearInterval(interval);
//                 // Handle timer completion, e.g., show a message or trigger an action
//             }
//         }, 1000); // Update the timer every second

//         if(timer == 0) console.log("Ended");


//         return () => {
//             clearInterval(interval); // Clear the interval on component unmount
//         };
//     }, [timer]);

//     const formatTime = (seconds: number) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };


//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//     const handleSelectOption = (selectedOption: string) => {
//         // Handle the selected option if needed
//         console.log('Selected:', selectedOption);
//     };

//     const navigateToQuestion = (index: number) => {
//         setCurrentQuestionIndex(index);
//     };

//     const navigateToNextQuestion = () => {
//         if (currentQuestionIndex < quizQuestions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             scrollToNextQuestion();
//         } else {
//             console.log("Ended")
//         }
//     };

//     const scrollToNextQuestion = () => {
//         const nextQuestionIndex = currentQuestionIndex + 1;
//         const scrollX = nextQuestionIndex * 40; // Adjust this value based on your layout
//         if (questionScrollViewRef.current) {
//             questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
//         }
//     };

//     const currentQuestion = quizQuestions[currentQuestionIndex];


//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <View style={styles.heading}>
//                     <View style={styles.backButton}>
//                         <ArrowLeft height={'25'} width={'25'} fill={'black'} />
//                     </View>
//                     <View>
//                         <Text style={styles.headingTitle}>Quiz Details</Text>
//                         <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
//                     </View>
//                     <View style={{ position: "absolute", right: 10 }}>
//                         <Text style={styles.timer}>{formatTime(timer)}</Text>
//                         <Text style={styles.timerText}>mins left</Text>
//                     </View>
//                 </View>
//             </View>
//                 <ScrollView  ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
//                     <View style={styles.questionNumbers}>
//                         {quizQuestions.map((_, index) => (
//                             <TouchableOpacity
//                                 key={index}
//                                 style={[
//                                     styles.questionNumber,
//                                     currentQuestionIndex === index && styles.activeQuestion,
//                                 ]}
//                                 onPress={() => navigateToQuestion(index)}
//                             >
//                                 <Text style={styles.questionNumberText}>{index + 1}</Text>
//                             </TouchableOpacity>
//                         ))}
//                     </View>
//                 </ScrollView>
//                 <ScrollView contentContainerStyle={styles.scrollContainer}>
//                     <QuestionComponent
//                         question={currentQuestion.question}
//                         options={currentQuestion.options}
//                         onSelectOption={handleSelectOption}
//                     />
//                 </ScrollView>
//             <View style={styles.nextQuizButton}>
//                 <Button
//                     label={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next Question'}
//                     className={LoginButton}
//                     disabled={false}
//                     onPress={navigateToNextQuestion}
//                 />
//             </View>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white,
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         paddingBottom: 60,
//     },
//     questionNumbersScroll: {
//         marginTop: 10,
//         marginBottom: 16,
//         maxHeight: 50,
//     },
//     header: {
//         paddingHorizontal: 24,
//         paddingVertical: 26,
//         height: 96,
//         borderTopLeftRadius: 0,
//         borderTopRightRadius: 0,
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//         backgroundColor: '#F0F0F0',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.15,
//         shadowRadius: 4,
//         elevation: 2,
//     },
//     heading: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 28,
//     },
//     headingTitle: {
//         color: "#7A7A7A",
//         fontWeight: "500",
//         fontSize: 14,
//     },
//     headingInfo: {
//         fontWeight: '500',
//     },
//     backButton: {
//         height: 45,
//         width: 45,
//         borderRadius: 45,
//         backgroundColor: "#D9D9D9",
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     timer: {
//         textAlign: 'center',
//         borderRadius: 10,
//         padding: 2,
//         backgroundColor: '#FFF',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         shadowOpacity: 0.15,
//         shadowRadius: 8,
//         elevation: 2,
//         overflow: 'hidden',
//     },
//     timerText: {
//         marginTop: 4,
//         textAlign: 'center',
//         color: "#525252",
//         fontSize: 12,
//     },
//     questionNumbers: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         // marginBottom: 10,
//         padding:10,
//     },
//     questionNumber: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: '#D4D4D4',
//         marginHorizontal: 5,
//     },
//     questionNumberText: {
//         color: Colors.white,
//         fontSize: 16,
//         fontWeight: '700',
//     },
//     activeQuestion: {
//         backgroundColor: Colors.primary, // Change to your active question color
//         color: Colors.white,
//     },
//     nextQuizButton: {
//         width: "90%",
//         position: 'absolute',
//         bottom: 20,
//         alignSelf: 'center',
//         paddingHorizontal: 16,
//     },
// });

// export default QuizQuestionsPage;


// import React, { useEffect, useRef, useState } from 'react';
// import { Colors } from '../../styles/colors';
// import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
// import quizQuestions from '../../utils/responses/quizquestions';
// import QuestionComponent from '../../components/quiz/QuestionComponent';
// import { Button } from '../../components/common/ButttonComponent/Button';
// import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
// import Modal from 'react-native-modal';

// export const QuizQuestionsPage = () => {
//     const [timer, setTimer] = useState(10); // Initial timer value in seconds
//     const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

//     const questionScrollViewRef = useRef(null);

//     useEffect(() => {
//         const interval = setInterval(() => {
//             if (timer > 0) {
//                 setTimer(timer - 1);
//             } else {
//                 clearInterval(interval);
//                 // Handle timer completion, e.g., show a message or trigger an action
//             }
//         }, 1000); // Update the timer every second

//         if (timer === 0) console.log("Ended");

//         return () => {
//             clearInterval(interval); // Clear the interval on component unmount
//         };
//     }, [timer]);

//     const formatTime = (seconds) => {
//         const minutes = Math.floor(seconds / 60);
//         const remainingSeconds = seconds % 60;
//         return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
//     };

//     const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

//     const handleSelectOption = (selectedOption) => {
//         // Handle the selected option if needed
//         console.log('Selected:', selectedOption);
//     };

//     const navigateToQuestion = (index) => {
//         setCurrentQuestionIndex(index);
//     };

//     const navigateToNextQuestion = () => {
//         if (currentQuestionIndex < quizQuestions.length - 1) {
//             setCurrentQuestionIndex(currentQuestionIndex + 1);
//             scrollToNextQuestion();
//         } else {
//             console.log("Ended")
//         }
//     };

//     const scrollToNextQuestion = () => {
//         const nextQuestionIndex = currentQuestionIndex + 1;
//         const scrollX = nextQuestionIndex * 40; // Adjust this value based on your layout
//         if (questionScrollViewRef.current) {
//             questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
//         }
//     };

//     const currentQuestion = quizQuestions[currentQuestionIndex];

//     const toggleBottomSheet = () => {
//         setBottomSheetVisible(!isBottomSheetVisible);
//     };

//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <View style={styles.heading}>
//                     <View style={styles.backButton}>
//                         <ArrowLeft height={25} width={25} fill="black" />
//                     </View>
//                     <View>
//                         <Text style={styles.headingTitle}>Quiz Details</Text>
//                         <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
//                     </View>
//                     <View style={{ position: "absolute", right: 10 }}>
//                         <Text style={styles.timer}>{formatTime(timer)}</Text>
//                         <Text style={styles.timerText}>mins left</Text>
//                     </View>
//                 </View>
//             </View>
//             <ScrollView  ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
//                 <View style={styles.questionNumbers}>
//                     {quizQuestions.map((_, index) => (
//                         <TouchableOpacity
//                             key={index}
//                             style={[
//                                 styles.questionNumber,
//                                 currentQuestionIndex === index && styles.activeQuestion,
//                             ]}
//                             onPress={() => navigateToQuestion(index)}
//                         >
//                             <Text style={styles.questionNumberText}>{index + 1}</Text>
//                         </TouchableOpacity>
//                     ))}
//                 </View>
//             </ScrollView>
//             <ScrollView contentContainerStyle={styles.scrollContainer}>
//                 <QuestionComponent
//                     question={currentQuestion.question}
//                     options={currentQuestion.options}
//                     onSelectOption={handleSelectOption}
//                 />
//             </ScrollView>
//             <View style={styles.nextQuizButton}>
//                 <Button
//                     label={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next Question'}
//                     className={LoginButton}
//                     disabled={false}
//                     onPress={navigateToNextQuestion}
//                     // onPress={toggleBottomSheet}
//                 />
//                   <View style={styles.okButtonContainer}>
//                 <Button
//                     label="OK"
//                     className={LoginButton}
//                     disabled={false}
//                     onPress={toggleBottomSheet}
//                 />
//             </View>

            
          
//             </View>

            
//             <Modal
//                 isVisible={isBottomSheetVisible}
//                 onBackdropPress={toggleBottomSheet}
//                 style={styles.bottomSheet}
//             >
//                 <View style={styles.bottomSheetContent}>
//                     <Text>This is your bottom sheet content</Text>
//                     <Button
//                         label="Submit"
//                         className={LoginButton}
//                         disabled={false}
//                         onPress={toggleBottomSheet}
//                     />
//                 </View>
//             </Modal>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: Colors.white,
//     },
//     scrollContainer: {
//         flexGrow: 1,
//         paddingBottom: 60,
//     },
//     questionNumbersScroll: {
//         marginTop: 10,
//         marginBottom: 16,
//         maxHeight: 50,
//     },
//     header: {
//         paddingHorizontal: 24,
//         paddingVertical: 26,
//         height: 96,
//         borderTopLeftRadius: 0,
//         borderTopRightRadius: 0,
//         borderBottomLeftRadius: 25,
//         borderBottomRightRadius: 25,
//         backgroundColor: '#F0F0F0',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.15,
//         shadowRadius: 4,
//         elevation: 2,
//     },
//     heading: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         gap: 28,
//     },
//     headingTitle: {
//         color: "#7A7A7A",
//         fontWeight: "500",
//         fontSize: 14,
//     },
//     headingInfo: {
//         fontWeight: '500',
//     },
//     backButton: {
//         height: 45,
//         width: 45,
//         borderRadius: 45,
//         backgroundColor: "#D9D9D9",
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     timer: {
//         textAlign: 'center',
//         borderRadius: 10,
//         padding: 2,
//         backgroundColor: '#FFF',
//         shadowColor: '#000',
//         shadowOffset: {
//             width: 0,
//             height: 0,
//         },
//         shadowOpacity: 0.15,
//         shadowRadius: 8,
//         elevation: 2,
//         overflow: 'hidden',
//     },
//     timerText: {
//         marginTop: 4,
//         textAlign: 'center',
//         color: "#525252",
//         fontSize: 12,
//     },
//     questionNumbers: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         // marginBottom: 10,
//         padding:10,
//     },
//     questionNumber: {
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 30,
//         height: 30,
//         borderRadius: 15,
//         backgroundColor: '#D4D4D4',
//         marginHorizontal: 5,
//     },
//     questionNumberText: {
//         color: Colors.white,
//         fontSize: 16,
//         fontWeight: '700',
//     },
//     activeQuestion: {
//         backgroundColor: Colors.primary, // Change to your active question color
//         color: Colors.white,
//     },
//     nextQuizButton: {
//         width: "90%",
//         position: 'absolute',
//         bottom: 20,
//         alignSelf: 'center',
//         paddingHorizontal: 16,
//     },
//     okButtonContainer: {
//         alignSelf: 'center',
//         marginTop: 16,
//     },
//     bottomSheet: {
//         justifyContent: 'flex-end',
//         margin: 0,
//     },
//     bottomSheetContent: {
//         backgroundColor: 'white',
//         height: '60%', // Set the height to 60%
//         width: '100%',  // Set the width to 100%
//         borderTopLeftRadius: 10,
//         borderTopRightRadius: 10,
//     },
// });

// export default QuizQuestionsPage;












import React, { useEffect, useRef, useState } from 'react';
import { Colors } from '../../styles/colors';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ArrowLeft } from '../../components/common/SvgComponent/SvgComponent';
import quizQuestions from '../../utils/responses/quizquestions';
import QuestionComponent from '../../components/quiz/QuestionComponent';
import { Button } from '../../components/common/ButttonComponent/Button';
import { LoginButton } from '../../components/common/ButttonComponent/ButtonStyles';
import Modal from 'react-native-modal';

export const QuizQuestionsPage = () => {
    const [timer, setTimer] = useState(10); // Initial timer value in seconds
    const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
    const [activeTab, setActiveTab] = useState('Overview');

    const questionScrollViewRef = useRef(null);

    useEffect(() => {
        const interval = setInterval(() => {
            if (timer > 0) {
                setTimer(timer - 1);
            } else {
                clearInterval(interval);
                // Handle timer completion, e.g., show a message or trigger an action
            }
        }, 1000); // Update the timer every second

        if (timer === 0) console.log("Ended");

        return () => {
            clearInterval(interval); // Clear the interval on component unmount
        };
    }, [timer]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const handleSelectOption = (selectedOption) => {
        // Handle the selected option if needed
        console.log('Selected:', selectedOption);
    };

    const navigateToQuestion = (index) => {
        setCurrentQuestionIndex(index);
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            scrollToNextQuestion();
        } else {
            console.log("Ended")
        }
    };

    const scrollToNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1;
        const scrollX = nextQuestionIndex * 40; // Adjust this value based on your layout
        if (questionScrollViewRef.current) {
            questionScrollViewRef.current.scrollTo({ x: scrollX, animated: true });
        }
    };

    const currentQuestion = quizQuestions[currentQuestionIndex];

    const toggleBottomSheet = () => {
        setBottomSheetVisible(!isBottomSheetVisible);
    };

    const switchTab = (tabName) => {
        setActiveTab(tabName);
    };

    // Content for the "Overview" and "Instructions" tabs
    const tabContent = {
        Overview: <Text>Hello</Text>,
        Instructions: <Text>Welcome</Text>,
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.heading}>
                    <View style={styles.backButton}>
                        <ArrowLeft height={25} width={25} fill="black" />
                    </View>
                    <View>
                        <Text style={styles.headingTitle}>Quiz Details</Text>
                        <Text style={styles.headingInfo}>English Vocabulary Quiz</Text>
                    </View>
                    <View style={{ position: "absolute", right: 10 }}>
                        <Text style={styles.timer}>{formatTime(timer)}</Text>
                        <Text style={styles.timerText}>mins left</Text>
                    </View>
                </View>
            </View>
            <ScrollView  ref={questionScrollViewRef} horizontal style={styles.questionNumbersScroll}>
                <View style={styles.questionNumbers}>
                    {quizQuestions.map((_, index) => (
                        <TouchableOpacity
                            key={index}
                            style={[
                                styles.questionNumber,
                                currentQuestionIndex === index && styles.activeQuestion,
                            ]}
                            onPress={() => navigateToQuestion(index)}
                        >
                            <Text style={styles.questionNumberText}>{index + 1}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <QuestionComponent
                    question={currentQuestion.question}
                    options={currentQuestion.options}
                    onSelectOption={handleSelectOption}
                />
            </ScrollView>
            <View style={styles.nextQuizButton}>
                <Button
                    label={currentQuestionIndex === quizQuestions.length - 1 ? 'Submit' : 'Next Question'}
                    className={LoginButton}
                    disabled={false}
                    onPress={navigateToNextQuestion}
                />
                <View style={styles.okButtonContainer}>
                    <Button
                        label="OK"
                        className={LoginButton}
                        disabled={false}
                        onPress={toggleBottomSheet}
                    />
                </View>
            </View>

            <Modal
                isVisible={isBottomSheetVisible}
                onBackdropPress={toggleBottomSheet}
                style={styles.bottomSheet}
            >
                <View style={styles.bottomSheetContent}>
                    {/* Tab Navigation */}
                    <View style={styles.tabNavigation}>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Overview' && styles.activeTabButton,
                            ]}
                            onPress={() => switchTab('Overview')}
                        >
                            <Text style={styles.tabButtonText}>Overview</Text>
                            {/* {activeTab === 'Overview' && <View style={styles.tabIndicator} />} */}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.tabButton,
                                activeTab === 'Instructions' && styles.activeTabButton,
                            ]}
                            onPress={() => switchTab('Instructions')}
                        >
                            <Text style={styles.tabButtonText}>Instructions</Text>
                            {/* {activeTab === 'Instructions' && <View style={styles.tabIndicator} />} */}
                        </TouchableOpacity>
                    </View>

                    {/* Content based on the selected tab */}
                    {tabContent[activeTab]}

                    <Button
                        label="Close"
                        className={LoginButton}
                        disabled={false}
                        onPress={toggleBottomSheet}
                    />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 60,
    },
    questionNumbersScroll: {
        marginTop: 10,
        marginBottom: 16,
        maxHeight: 50,
    },
    header: {
        paddingHorizontal: 24,
        paddingVertical: 26,
        height: 96,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#F0F0F0',
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
        flexDirection: 'row',
        alignItems: 'center',
        gap: 28,
    },
    headingTitle: {
        color: "#7A7A7A",
        fontWeight: "500",
        fontSize: 14,
    },
    headingInfo: {
        fontWeight: '500',
    },
    backButton: {
        height: 45,
        width: 45,
        borderRadius: 45,
        backgroundColor: "#D9D9D9",
        justifyContent: 'center',
        alignItems: 'center',
    },
    timer: {
        textAlign: 'center',
        borderRadius: 10,
        padding: 2,
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.15,
        shadowRadius: 8,
        elevation: 2,
        overflow: 'hidden',
    },
    timerText: {
        marginTop: 4,
        textAlign: 'center',
        color: "#525252",
        fontSize: 12,
    },
    questionNumbers: {
        flexDirection: 'row',
        justifyContent: 'center',
        padding:10,
    },
    questionNumber: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#D4D4D4',
        marginHorizontal: 5,
    },
    questionNumberText: {
        color: Colors.white,
        fontSize: 16,
        fontWeight: '700',
    },
    activeQuestion: {
        backgroundColor: Colors.primary,
        color: Colors.white,
    },
    nextQuizButton: {
        width: "90%",
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        paddingHorizontal: 16,
    },
    okButtonContainer: {
        alignSelf: 'center',
        marginTop: 16,
    },
    bottomSheet: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    bottomSheetContent: {
        backgroundColor: 'white',
        height: '60%',
        width: '100%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    tabNavigation: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingTop: 20,
        width:'50%',
    },
    tabButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 1,
        widht:'50%',
    },
    activeTabButton: {
        backgroundColor: 'red',
        width:'50%',
    },
    tabButtonText: {
        color: Colors.white,
    },
    tabIndicator: {
        height: 2,
        backgroundColor: 'blue',
        marginTop: 2,
    },
});

export default QuizQuestionsPage;
