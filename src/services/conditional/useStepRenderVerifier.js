import jsonLogic from "json-logic-js"
import useConditionalHelpers from "./useConditionalHelpers";
import formatCurrentFormObject from "./conditionalObjectFormater";

function useStepRenderVerifier({ conditionalObject, steps, stepKey }) {
  const { 
    stepHasOwnTrigger,
    anyTriggerInStep,    
    currentStepTrigger 
  } = useConditionalHelpers({ conditionalObject, stepKey })

  const inStep = currentStepTrigger?.inStep ?? {condition: "", action: ""}
  const { condition, action } = inStep
  const currentObjectToCompare = formatCurrentFormObject(steps)
  
  const applyJsonLogicQuestion = (question) => {
    return jsonLogic.apply(question.condition, currentObjectToCompare);
  }

  const validateQuestionTriggerJsonLogic = (question, questionKey) => {
    const hasTriggerInQuestion = currentStepTrigger?.questions?.[questionKey]
    if (hasTriggerInQuestion) {
      const currentQuestionTrigger = currentStepTrigger.questions[questionKey]

      let result = applyJsonLogicQuestion(currentQuestionTrigger)
      return { result: result, action: currentQuestionTrigger.action };
    }

    return { result: false, action: "" }
  }

  const questionTriggers = (question, questionKey) => {
    let validation = validateQuestionTriggerJsonLogic(question, questionKey);
    let shouldHide = validation?.result && validation?.action === "hide"
    let doesntShowComponent = !validation?.result && validation?.action === "show"
  
    return {
      doesntShowComponent,
      shouldHide
    }
  }

  const questionShouldBeHided = (question, questionKey) => {
    const { doesntShowComponent, shouldHide } = questionTriggers(question, questionKey)
  
    return doesntShowComponent || shouldHide
  }

  const questionsFormated = () => {
    let questions = []

    steps[stepKey].questions.forEach((question, questionKey) => {
      questions.push({
        ...question,
        shouldHide: questionShouldBeHided(question, questionKey)
      })
    })

    return questions
  }

  const applyJsonLogic = () => {
    return jsonLogic.apply(condition, currentObjectToCompare);
  }

  const validateStepTriggerJsonLogic = () => {
    if (!anyTriggerInStep || !stepHasOwnTrigger) return { result: false, action: "" }

    let result = applyJsonLogic()

    return { result, action };
  }

  const stepTriggers = () => {
    let validation = validateStepTriggerJsonLogic()
    let shouldHide = validation?.result && validation?.action === "hide"
    let doesntShowComponent = !validation?.result && validation?.action === "show"

    return {
      doesntShowComponent,
      shouldHide
    }
  }

  const stepShouldBeHided = (steps, stepKey) => {
    const { doesntShowComponent, shouldHide } = stepTriggers(steps, stepKey)

    return doesntShowComponent || shouldHide
  }

  return {
    hideStep: stepShouldBeHided(),
    questions: questionsFormated()
  }
}

export default useStepRenderVerifier;