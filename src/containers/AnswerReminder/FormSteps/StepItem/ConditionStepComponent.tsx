import React, { useEffect } from "react";
import useStepRenderVerifier from "../../../../services/conditional/useStepRenderVerifier";
import QuestionItem from "./QuestionItem";

const ConditionStepComponent = (props) => {
  const {
    stepKey,
    handleClearQuestionAnswer,
    steps,
    conditionalObject,
  } = props;
  const { hideStep, questions } = useStepRenderVerifier({ conditionalObject, stepKey, steps })
  const validQuestions = questions.filter(question => !question.shouldHide)


  useEffect(() => {
    if(hideStep){
      handleClearQuestionAnswer({
        clearStep: steps[stepKey]
      })
    }
  }, [hideStep])

  if (hideStep) {
    return (
      <></>
    )
  }

  return (
    <QuestionItem
      questions={questions}
      validQuestions={validQuestions}
      {...props}
    />
  )
}

export default ConditionStepComponent;