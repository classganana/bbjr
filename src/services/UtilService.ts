import AsyncStorage from "@react-native-async-storage/async-storage";

export const UtilService = {
    setQuizFlow: async (flow: string) => {
        await AsyncStorage.setItem('quizFlow', flow);
    },
    
    getQuizFlow: async () => {
        return await AsyncStorage.getItem('quizFlow');
    },

    setQuizType: async (type: string) => {
        await AsyncStorage.setItem('quizType', type);
    },

    getQuizType: async () => {
        return await AsyncStorage.getItem('quizType');
    }
};
