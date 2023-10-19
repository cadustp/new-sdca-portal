import jsonLogic from "json-logic-js";
import formatCurrentFormObject from "./conditionalObjectFormater";
import useConditionalHelpers from "./useConditionalHelpers";

function useQuestionTrigger({conditionalObject, steps, stepKey, questionKey}){
  const { hasTriggerInQuestion, currentQuestionTrigger} = useConditionalHelpers({conditionalObject,stepKey, questionKey})

  const currentObjectToCompare = formatCurrentFormObject(steps)

  const applyJsonLogic = () => {
    return jsonLogic.apply(currentQuestionTrigger.condition, currentObjectToCompare);
  }

  const validateQuestionTriggerJsonLogic = () => {
    if (!hasTriggerInQuestion) return { result: false, action: "" }
    
    let result = applyJsonLogic()
    return { result: result, action: currentQuestionTrigger.action };
  
  }

  const questionTriggers = () => {
    let validation = validateQuestionTriggerJsonLogic();
    let shouldHide = validation?.result && validation?.action === "hidde"
    let doesntShowComponent = !validation?.result && validation?.action === "show"
  
    return {
      doesntShowComponent,
      shouldHide
    }
  }

  const questionShouldBeHided = () => {
    const { doesntShowComponent, shouldHide } = questionTriggers()
  
    return doesntShowComponent || shouldHide
  }

  return questionShouldBeHided();
}


export {
  useQuestionTrigger
}