import { Form, Step, Question, Answer } from "src/redux/forms/types";

export interface QuestionSelectOption {
  label: string;
  value: string | number;
  step: Step;
  answerOptions: Array<Answer>,
  locationInHash: string,
  questionIndex: number,
  stepIndex: number,
  selectionType: string | number | null
}

function useSelectQuestions(form: Form, translatedName: string): Array<QuestionSelectOption> {
  let questionsToReturn: Array<QuestionSelectOption> = [];
  let totalQuestions = 0;

  const formatLabel = (questionTitle, stepIndex) => `${translatedName} ${stepIndex} - ${questionTitle}`

  function retrieveQuestionsFromStep(step: Step, stepIndex: number){
    const stepOrder = stepIndex+1
    
    step.questions.map((question: Question, index: number) => {
      totalQuestions += 1;
      questionsToReturn.push({
        questionIndex: index,
        stepIndex,
        label: formatLabel(question.question, stepOrder),
        value: totalQuestions,
        answerOptions: question.answerOptions,
        locationInHash: `steps.${stepIndex}.questions.${index}`,
        selectionType: question.selectionType,
        step: step
      }) 
    })
  }

  form.steps.map((step: Step,stepIndex: number): void => {
    retrieveQuestionsFromStep(step, stepIndex)
  });

  return questionsToReturn
}


export default useSelectQuestions;