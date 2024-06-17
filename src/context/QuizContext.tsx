import React, { createContext, useContext, useReducer, useEffect, ReactNode, Dispatch } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { debounce } from 'lodash';

// Define state type
type State = {
    quizSubject: string,
    quizType: 'quiz' | 'practice',
    quizFlow: 'Quizzes' | 'Exam Preparation'
};

// Define action types
export enum Eaction {
    SET_QUIZ_SUBJECT = 'SET_QUIZ_SUBJECT',
    SET_QUIZ_TYPE = 'SET_QUIZ_TYPE',
    SET_QUIZ_FLOW = 'SET_QUIZ_FLOW'
}

// Define action type union
type Action =
    | { type: Eaction.SET_QUIZ_TYPE, payload: 'quiz' | 'practice' }
    | { type: Eaction.SET_QUIZ_FLOW, payload: 'Quizzes' | 'Exam Preparation' }
    | { type: Eaction.SET_QUIZ_SUBJECT, payload: string };
    

// Initial state
const initialState: State = {
    quizType: 'quiz',
    quizFlow: 'Quizzes',
    quizSubject: '',
};

// Reducer function
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case Eaction.SET_QUIZ_TYPE:
            return { ...state, quizType: action.payload };
        case Eaction.SET_QUIZ_FLOW:
            return { ...state, quizFlow: action.payload };
        case Eaction.SET_QUIZ_SUBJECT:
            return { ...state, quizSubject: action.payload };
        default:
            return state;
    }
};

// Context setup
type QuizContextType = {
    state: State;
    dispatch: Dispatch<Action>;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const QuizProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    // Debounce saveState function to delay execution
    const saveState = debounce(async (newState: State) => {
        try {
            await AsyncStorage.setItem('quizState', JSON.stringify(newState));
        } catch (error) {
            console.error('Failed to save quiz state:', error);
        }
    }, 1000); // Adjust debounce delay as needed

    // Effect to save state in AsyncStorage on state change
    useEffect(() => {
        saveState(state);
    }, [state, saveState]);

    // Effect to load state from AsyncStorage on mount
    useEffect(() => {
        const loadState = async () => {
            try {
                const storedState = await AsyncStorage.getItem('quizState');
                if (storedState !== null) {
                    const parsedState = JSON.parse(storedState);
                    dispatch({ type: Eaction.SET_QUIZ_TYPE, payload: parsedState.quizType });
                    dispatch({ type: Eaction.SET_QUIZ_FLOW, payload: parsedState.quizFlow });
                    dispatch({ type: Eaction.SET_QUIZ_SUBJECT, payload: parsedState.quizSubject });
                }
            } catch (error) {
                console.error('Failed to load quiz state:', error);
            }
        };
        loadState();
    }, []); // Empty dependency array ensures this effect runs only once on mount

    return (
        <QuizContext.Provider value={{ state, dispatch }}>
            {children}
        </QuizContext.Provider>
    );
};

const useQuizContext = () => {
    const context = useContext(QuizContext);
    if (context === undefined) {
        throw new Error('useQuizContext must be used within a QuizProvider');
    }
    return context;
};

export { QuizProvider, useQuizContext };
