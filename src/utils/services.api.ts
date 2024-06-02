import { httpClient } from "../services/HttpServices";

export const getSubjects = async (user: any) => {
  const reqObj = {
    service: "ml_service",
    // "endpoint":  `data/quizz/${board}/${className}/${subjects}`,
    endpoint: `/subjects?board_id=${user?.board}&class_name=${user?.class}&school_id=default`,
    requestMethod: "GET",
  };

  const res = await httpClient.post(`auth/c-auth`, reqObj);

  const subjectList = res.data.data;
  const subjects = subjectList.map((sub: any) => {
    return {
      subjectName: sub.subject,
    };
  });

  return subjects;
};
