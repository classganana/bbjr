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
    },

    getMatchingQuizzes: async (chapters: string[]) => {
        debugger
        try {
          const quizListString = await AsyncStorage.getItem('localQuizzes');
          if (quizListString) {
            const quizList = JSON.parse(quizListString);
            const matchingQuizzes: any = quizList.filter((quiz: any) => {
              // Ensure both chapterName and chapters are arrays
              if (!Array.isArray(quiz.chapterName) || !Array.isArray(chapters)) {
                return false;
              }
      
              // Use sets for efficient comparison
              const setA = new Set(quiz.chapterName);
              const setB = new Set(chapters);
      
              return setA.size === setB.size && [...setA].every((item: any) => setB.has(item));
            });
            return matchingQuizzes;
          }
        } catch (error) {
          console.error('Error retrieving or parsing quizzes:', error);
        }
      }
};
