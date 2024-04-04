import AsyncStorage from "@react-native-async-storage/async-storage";
import { CDN } from "./HttpServices";

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
      },
      checkIfCDNHasTheImage: async (subjectName: string) => {
        const firstPart = subjectName.split('-')[0].trim();

        // Remove "Part 1", "Part 2", etc. from the subject name
        const formattedPart = firstPart.replace(/Part \d+/i, '').trim();
    
        // Convert the formatted part to uppercase and replace spaces with underscores
        const formattedSubject = formattedPart.toUpperCase().replace(/\s+/g, '_');
    
        if(formattedSubject && formattedSubject.length > 0) {
          const cdnUrl = CDN;
          const imageName = `${formattedSubject}.png`;
          const imageUrl = `${cdnUrl}${imageName}`;
          return imageUrl;
        }
    },
    getRandomMessage: (score: number) => {
      const messages: any = {
        "100": [
          "Wow, perfect score! 🌟 You rock!",
          "You nailed it, superstar! 🌟",
          "Flawless! 🔥 You're on fire!",
          "Perfecto! High-five, genius! 🙌",
          "Full marks, you're unstoppable! 🚀"
        ],
        "80-99": [
          "Almost there, keep it up! 🌈",
          "Almost perfect, keep going! 🚀",
          "Bravo! Keep the momentum! 💫",
          "Fantastic effort, keep it up! 🌟",
          "Solid performance, you rock! 👍"
        ],
        "60-79": [
          "Good going, keep pushing! 👊",
          "Great effort, you've got it! 🌟",
          "Nice job, keep it up! 👏",
          "Making progress, you're awesome! 🌟",
          "Onward and upward, superstar! ✨",
          "Well done, keep progressing! 👍"
        ],
        "40-59": [
          "Keep at it, you're improving! 💪",
          "You're getting there, keep going! 🌟",
          "You're making strides, keep going! 🌟",
          "You're on the right track! 🚀",
          "Stay focused, you're improving! 👀",
          "Persistence pays off, keep going! 💪"
        ],
        "0-39": [
          "Each effort counts, keep striving! ⭐",
          "Keep at it, success awaits! 🏆",
          "Every setback is temporary, keep striving! 🌈",
          "Don't lose heart, keep pushing! ❤️",
          "Chin up, progress is near! 😊",
          "Stay resilient, triumph awaits! 💫"
        ]
      };
    
      let range;
      if (score >= 100) {
        range = "100";
      } else if (score >= 80) {
        range = "80-99";
      } else if (score >= 60) {
        range = "60-79";
      } else if (score >= 40) {
        range = "40-59";
      } else {
        range = "0-39";
      }
    
      const randomIndex = Math.floor(Math.random() * messages[range].length);
      return messages[range][randomIndex];
    }
};
