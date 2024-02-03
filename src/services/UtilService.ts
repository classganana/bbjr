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
            if (matchingQuizzes && matchingQuizzes.length) return matchingQuizzes[0];
          }
        } catch (error) {
          console.error('Error retrieving or parsing quizzes:', error);
        }
      },

      updateLocalPracticeMcqs: async (chapters: string[], mcqs: any) => {
        try {
          const quizListString = await AsyncStorage.getItem('localQuizzes');
          const localQuizzes = await UtilService.getMatchingQuizzes(chapters);
          if(quizListString && quizListString.length) {
            const quizList = JSON.parse(quizListString);
            if (localQuizzes) {
              localQuizzes.mcqs = mcqs;
              const updatedLocalQuiz: any = quizList.map((quiz: any) => {
                // Ensure both chapterName and chapters are arrays
                if (!Array.isArray(quiz.chapterName) || !Array.isArray(chapters)) {
                  return false;
                }
        
                // Use sets for efficient comparison
                const setA = new Set(quiz.chapterName);
                const setB = new Set(chapters);
        
                if(setA.size === setB.size && [...setA].every((item: any) => setB.has(item))) {
                  quiz.mcqs = mcqs;
                  return quiz;
                } else {
                  return quiz;
                }
              });
              await AsyncStorage.setItem('localQuizzes', JSON.stringify(updatedLocalQuiz));
            }
          }
        } catch(err){
            console.log(err)
        }
      }
};
