import {
  Answer,
  Question,
  Step,
  StepErrors,
  QuestionErrors,
  AnswerOptionErrors,
  ValidationErrors,
} from '../redux/forms/types';
import { SELECTION_TYPES } from './consts';

export const stepValidator = (step: Step, validateWeight: boolean) => ({
  title: step.title.length < 1,
  questions: reduceErrors(step.questions, validateWeight, questionsValidator)
    .errors,
} as StepErrors);

export const questionsValidator = (
  question: Question,
  validateWeight: boolean,
) => {
  const hasPoints = validateWeight
    && question.selectionType !== SELECTION_TYPES.IMAGE
    && question.selectionType !== SELECTION_TYPES.DATE
    && question.selectionType !== SELECTION_TYPES.FREE_TEXT
    && question.selectionType !== SELECTION_TYPES.NUMERIC;

  return {
    question: question.question.length < 1,
    points:
      hasPoints && (question.points === '' || Number(question.points) < 0),
    selectionType: question.selectionType === SELECTION_TYPES.NONE,
    answerOptionsTotal: hasPoints && answerOptionsTotalValidator(question),
    answerOptions: reduceErrors(
      question.answerOptions,
      hasPoints,
      answerOptionValidator,
    ).errors,
  } as QuestionErrors;
};

const answerOptionsTotalValidator = (question: Question) => {
  const multipleSelectionType = question.selectionType === SELECTION_TYPES.MULTI;

  const totalWeight = question.answerOptions.reduce(
    (total: number, option: Answer) => total + Number(option.weight),
    0,
  );

  const totalWeightInvalid = totalWeight !== 100;

  return multipleSelectionType && totalWeightInvalid;
};

export const answerOptionValidator = (
  answerOption: Answer,
  validateWeight: boolean,
) => ({
  answer: answerOption.answer.length < 1,
  weight:
      validateWeight
      && (answerOption.weight === '' || Number(answerOption.weight) < 0),
} as AnswerOptionErrors);

export const reduceErrors = (list, validateWeight, validator) => list.reduce(
  (errors, data) => {
    const validation = validator(data, validateWeight);
    return aggregateErrors(errors, validation);
  },
  {
    errors: [],
    errorCount: 0,
  },
);

const aggregateErrors = (
  reduce: { errors: []; errorCount },
  errors: ValidationErrors,
) => ({
  errors: [...reduce.errors, errors],
  errorCount: reduce.errorCount + sumErrors(errors),
});

const sumArrayErrors = error => error.reduce((total: number, err) => total + sumErrors(err), 0);

const sumErrors = errors => Object.values(errors).reduce(
  (total: number, error) => total + (Array.isArray(error) ? sumArrayErrors(error) : Number(error)),
  0,
);

export const validatesStepError = (
  data: Step,
  validateWeight: boolean,
  property: string,
) => stepValidator(data, validateWeight)[property];

export const validatesQuestionError = (
  data: Question,
  validateWeight: boolean,
  property: string,
) => questionsValidator(data, validateWeight)[property];

export const validatesAnswerError = (
  data: Answer,
  validateWeight: boolean,
  property: string,
) => answerOptionValidator(data, validateWeight)[property];
