const useConditionalHelpers = ({conditionalObject, stepKey, questionKey}) => {
    const currentStepTrigger = () => {
      return conditionalObject?.steps?.[stepKey]
    }
  
    const stepHasOwnTrigger = () => {
      if (!anyTriggerInStep()) return false
      return currentStepTrigger().inStep !== undefined
    }
    
    const stepDoesNotHaveAnyTrigger = () => {
      return !anyTriggerInStep() && !stepHasOwnTrigger()
    }
  
    const hasTriggerInQuestion = () => {
      if (stepDoesNotHaveAnyTrigger()) return false
    
      return currentQuestionTrigger() !== undefined
    }
  
    const currentQuestionTrigger = () => {
      return conditionalObject?.steps?.[stepKey]?.questions?.[questionKey]
    }
  
    const anyTriggerInStep = () => {
      return currentStepTrigger() !== undefined
    }
  
    return {
      hasTriggerInQuestion: hasTriggerInQuestion(),
      currentStepTrigger: currentStepTrigger(),
      currentQuestionTrigger: currentQuestionTrigger(),
      stepHasOwnTrigger: stepHasOwnTrigger(),
      anyTriggerInStep: anyTriggerInStep()
    }
  }
export default useConditionalHelpers;