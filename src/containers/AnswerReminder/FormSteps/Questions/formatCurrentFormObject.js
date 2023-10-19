const formatCurrentFormObject = (steps) => {
    let formattedQuestion = {}

    function formatSelectedQuestionOptions(question) {
      let formatedSelectedItems = {}
      let selectedOptions = question?.answer?.selected_options

      if(selectedOptions) {

      question["answer_options"].forEach((optionItem, index) => {
        
        if(selectedOptions && selectedOptions.includes(optionItem.id)){
          formatedSelectedItems[index] = optionItem.option_text
        }
      })
      }


      return formatedSelectedItems;
    }

    function defaultObjectStructure(valueToInsert, stepIndex, questionIndex){
      return {
        "steps": {
          ...formattedQuestion["steps"],
          [stepIndex]: {
            "questions": {
              [questionIndex]: valueToInsert 
            }
          }
        }
      } 
    }

    function selectObject(question,stepIndex,questionIndex) {
      const selectedOptionsFormatted = formatSelectedQuestionOptions(question)

      return defaultObjectStructure(selectedOptionsFormatted, stepIndex, questionIndex)
    }

    function freeTextObject(question, stepIndex){
      return defaultObjectStructure(question.answer.free_text, stepIndex, 0)
    }

    function formatQuestion(question, stepIndex, questionIndex){
      switch(question.selection_type){
        case "multi":
          formattedQuestion = selectObject(question, stepIndex, questionIndex)
          break;
        case "free_text":
          formattedQuestion = freeTextObject(question, stepIndex)
          break;
        case "single":
          formattedQuestion = selectObject(question, stepIndex, questionIndex)
          break;
        default:
          {}
      }
    }

    function formatStep(questions, stepIndex) {
      questions.forEach((question, questionIndex) => {
        formatQuestion(question,stepIndex, questionIndex)
      })
    }

    steps.forEach((step,stepIndex ) => {
      formatStep(step.questions, stepIndex)
    })


    return formattedQuestion;
}

export default formatCurrentFormObject;