import { Box } from '@mui/material';
import React from 'react';

import { SOption } from './styles';
import {
  TAnswer, TAnswerOptions, TQuestion, TStep,
} from '../../../../../types/reminder';
import { AnswerKnockedOutPayload } from '../../../../../redux/answerReminder/types';

type Props = {
  options: Array<TAnswerOptions>;
  idAnswers: Array<number>;
  step: TStep;
  answerQuestion: TQuestion;
  handleUpdateReminderAnswers: Function;
  selectionType: string;
  handleKnockoutStep: Function;
  handleRemoveKnockoutStep: Function;
  handleKnockoutForm: Function;
  reminderIsAccomplished: boolean;
};

const OnlyAnswer: React.FC<Props> = ({
  options,
  idAnswers,
  handleUpdateReminderAnswers,
  step,
  answerQuestion,
  selectionType,
  handleKnockoutStep,
  handleRemoveKnockoutStep,
  handleKnockoutForm,
  reminderIsAccomplished,
}) => {
  const hasNotAnyKnockoutAnswerOnStep = () => {
    const allSelectedOptions = step.questions
      .filter(question => ['multi', 'single'].includes(question.selection_type))
      .map(question => question.answer.selected_options)
      .flat();
    const allSelectedAnswerOptions = step.questions
      .map(question => question.answer_options
        .filter(answer_option => allSelectedOptions.includes(answer_option.id)
                                        && answer_option.is_knock_out_step === true))
      .flat();
    return allSelectedAnswerOptions.length <= 0;
  };

  const checkIfQuestionCanBeKnockedOut = (
    question,
    knockOutQuestion,
  ) => {
    if (question.step_number === null || question.order === null) {
      return false;
    }
    return (
      question.step_number > knockOutQuestion.step_number
      || (question.step_number === knockOutQuestion.step_number
        && question.order > knockOutQuestion.order)
    );
  };

  const knockOutStep = answerQuestion => {
    const updatedStep = step;
    updatedStep.hasKnockedOutQuestions = true;
    updatedStep.questions
      .filter(question => checkIfQuestionCanBeKnockedOut(question, answerQuestion))
      .map(question => question.answer = { ...AnswerKnockedOutPayload });
    return updatedStep;
  };

  const removeKnockOutStep = () => {
    const knockedstep = step;
    knockedstep.hasKnockedOutQuestions = false;
    knockedstep.questions.forEach(question => (question.answer = {} as TAnswer));
    return knockedstep;
  };

  const setAnswer = answerOption => {
    const answerType = 'select';
    let selectedOptions: number[] = [];
    let shouldDismiss = false;
    if (selectionType === 'multi') {
      if (isAnswer(answerOption.id)) {
        selectedOptions = idAnswers.filter(answer => answer !== answerOption.id);
      } else {
        selectedOptions = [answerOption.id, ...idAnswers];
      }
      shouldDismiss = options.filter(option => selectedOptions.includes(option.id) && option.should_dismiss).length > 0;
    } else {
      selectedOptions = [answerOption.id];
      shouldDismiss = answerOption.should_dismiss;
    }

    handleUpdateReminderAnswers({
      selectedOptions, answerQuestion, answerType, shouldDismiss,
    });

    if (step.hasKnockedOutQuestions && hasNotAnyKnockoutAnswerOnStep()) {
      handleRemoveKnockoutStep({ knockedStep: removeKnockOutStep() });
    }

    handleUpdateReminderAnswers({
      selectedOptions, answerQuestion, answerType, shouldDismiss,
    });

    if (selectedOptions.includes(answerOption.id)) {
      if (answerOption.is_knock_out_form) {
        handleKnockoutForm({ answerQuestion });
      } else if (answerOption.is_knock_out_step) {
        handleKnockoutStep({ knockedStep: knockOutStep(answerQuestion) });
      }
    };
  };

  const isAnswer = optionId => idAnswers.includes(optionId);

  return (
    <Box width="100%" pl={5} pr={5}>
      {options.map((option, key) => (
        <SOption
          reminderIsAccomplished={reminderIsAccomplished}
          disabled={reminderIsAccomplished}
          onClick={() => setAnswer(option)}
          key={key}
          isAnswer={isAnswer(option.id)}
        >
          {option.option_text}
        </SOption>
      ))}
    </Box>
  );
};

export default OnlyAnswer;
