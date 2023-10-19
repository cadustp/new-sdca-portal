const formatCurrentFormObject = steps => {
  let formattedQuestion = {};

  function formatSelectedQuestionOptions(question) {
    const formatedSelectedItems = {};
    const selectedOptions = question?.answer?.selected_options;

    if (!selectedOptions) return formatedSelectedItems;

    question.answer_options.forEach((optionItem, index) => {
      if (selectedOptions && selectedOptions.includes(optionItem.id)) {
        formatedSelectedItems[`${index}`] = optionItem.option_text;
      }
    });

    return formatedSelectedItems;
  }

  function hasQuestionsInStep(stepIndex) {
    return formattedQuestion?.steps?.[stepIndex]?.questions !== undefined;
  }

  function currentQuestions(stepIndex) {
    let currentQuestions = {};
    if (hasQuestionsInStep(stepIndex)) {
      currentQuestions = formattedQuestion.steps[stepIndex].questions;
    }
    return currentQuestions;
  }

  function defaultObjectStructure(valueToInsert, stepIndex, questionIndex) {
    return {
      steps: {
        ...formattedQuestion.steps,
        [stepIndex]: {
          questions: {
            ...currentQuestions(stepIndex),
            [questionIndex]: valueToInsert,
          },
        },
      },
    };
  }

  function selectObject(question, stepIndex, questionIndex) {
    const selectedOptionsFormatted = formatSelectedQuestionOptions(question);

    return defaultObjectStructure(selectedOptionsFormatted, stepIndex, questionIndex);
  }

  function freeTextObject(question, stepIndex, questionIndex) {
    return defaultObjectStructure(question?.answer?.free_text, stepIndex, questionIndex);
  }

  function numericObject(question, stepIndex, questionIndex) {
    return defaultObjectStructure(question?.answer?.custom_value, stepIndex, questionIndex);
  }

  function dateObject(question, stepIndex, questionIndex) {
    const formattedDate = question?.answer?.custom_date ? Date.parse(question.answer.custom_date) : undefined;
    return defaultObjectStructure(formattedDate, stepIndex, questionIndex);
  }

  function formatQuestion(question, stepIndex, questionIndex) {
    switch (question.selection_type) {
      case 'numeric':
        formattedQuestion = numericObject(question, stepIndex, questionIndex);
        break;
      case 'multi':
        formattedQuestion = selectObject(question, stepIndex, questionIndex);
        break;
      case 'date':
        formattedQuestion = dateObject(question, stepIndex, questionIndex);
        break;
      case 'free_text':
        formattedQuestion = freeTextObject(question, stepIndex, questionIndex);
        break;
      case 'single':
        formattedQuestion = selectObject(question, stepIndex, questionIndex);
      default:
      {}
    }
  }

  function formatStep(questions, stepIndex) {
    questions.forEach((question, questionIndex) => {
      formatQuestion(question, stepIndex, questionIndex);
    });
  }

  steps.forEach((step, stepIndex) => {
    formatStep(step.questions, stepIndex);
  });

  return formattedQuestion;
};

export default formatCurrentFormObject;
