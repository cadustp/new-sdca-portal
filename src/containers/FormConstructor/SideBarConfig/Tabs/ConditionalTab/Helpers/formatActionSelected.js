function formatActionSelected({
  stepSelected,
  questionSelected,
  conditionToEdit,
  conditionalObject,
  condition,
  actionOption
}){
  let tmpConditionalObject = {}
  let currentConditionalObject = conditionalObject;

  const formatQuestionTrigger = (value, action) => {
    let parsedValue = JSON.parse(value)

    return {
      steps: {
        ...currentConditionalObject?.steps,
        [parsedValue.stepIndex]: {
          ...currentConditionalObject?.steps?.[parsedValue.stepIndex],
          questions: {
            ...currentConditionalObject?.steps?.[parsedValue.stepIndex]?.questions,
            ...questionTriggerObject(parsedValue.questionIndex)
          }
        }
      }
    }
  }

  const questionTriggerObject = (questionIndex) => {
    return {
      [questionIndex]: {
        condition,
        conditionToEdit,
        action: actionOption
      }
    }
  }
    
  const formatStepTrigger = (stepIndex, action) => {
    return {
      steps: {
        ...currentConditionalObject?.steps,
        [stepIndex]: {
          ...currentConditionalObject?.steps?.[stepIndex],
          inStep: {
            condition,
            conditionToEdit,
            action,
          },
        }
      }
    }
  }

  if(stepSelected !== ""){
    tmpConditionalObject = formatStepTrigger(stepSelected, actionOption)
  }else if(questionSelected !== ""){
    tmpConditionalObject = formatQuestionTrigger(questionSelected, actionOption)
  }
  
  return tmpConditionalObject;
}


export default formatActionSelected;