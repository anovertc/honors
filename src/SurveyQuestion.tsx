// components/SurveyQuestion.tsx

import React from "react";

type SurveyQuestionProps = {
  label: string;
  children: React.ReactNode;
};

const SurveyQuestion: React.FC<SurveyQuestionProps> = ({ label, children }) => {
  return (
    <div className="mb-6">
      <label className="block mb-2 font-semibold">{label}</label>
      {children}
    </div>
  );
};

export default SurveyQuestion;


