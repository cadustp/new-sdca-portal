import SelectInput from "../../../../../../components/v2/SelectInput";
import React from "react";
import {QuestionSelectOption} from "../Helpers/useSelectQuestions";

type Props = {
  questions: Array<QuestionSelectOption>,
  onSelectChange: Function,
  value: any
}

const QuestionOptions: React.FC<Props> = ({
  questions,
  onSelectChange,
  value
}) => {

  function formatQuestionObjectByType(question: any){
    return JSON.stringify({
      value: question.locationInHash,
      stepIndex: question.stepIndex,
      questionIndex: question.questionIndex,
      answerOptions: question?.answerOptions.map((_: any,index: any) => index),
      selectionType: question.selectionType,
    })
  }

  const questionsFormatted = questions.map(question => (
    { label: question.label, value: formatQuestionObjectByType(question) }
  ))

  return (
    <SelectInput
      items={questionsFormatted}
      setSelectedItems={onSelectChange}
      selectedItems={questionsFormatted.filter(item => item.value === value )}
    />
  )
};


export default QuestionOptions;



