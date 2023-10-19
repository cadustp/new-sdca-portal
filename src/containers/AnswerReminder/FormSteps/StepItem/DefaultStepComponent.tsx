import React from 'react';
import QuestionItem from './QuestionItem';

const DefaultStepComponent = props => {
  const { step } = props;

  return (
    <QuestionItem
      questions={step.questions}
      validQuestions={step.questions}
      {...props}
    />
  );
};

export default DefaultStepComponent;
