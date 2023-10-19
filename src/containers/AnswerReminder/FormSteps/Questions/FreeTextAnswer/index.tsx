import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import { StyledTextField } from '../../../../../components/shared/Inputs/StyledInput';
import { SMaxLengthView } from './styles';
import { TQuestion } from '../../../../../types/reminder';

type Props = {
  answerQuestion: TQuestion;
  handleUpdateReminderAnswers: Function;
  reminderIsAccomplished: boolean;
};

const OnlyAnswer: React.FC<Props> = ({
  answerQuestion,
  handleUpdateReminderAnswers,
  reminderIsAccomplished,
}) => {
  const [valueTextArea, setValueTextArea] = useState<string>('');

  const setTextAnswer = () => {
    if (valueTextArea !== '') {
      const answerType = 'text';
      handleUpdateReminderAnswers({ answerQuestion, valueTextArea, answerType });
    } else {
      setValueTextArea(answerQuestion.answer.free_text || '');
    };
  };

  return (
    <Box width="100%" pl={5} pr={5}>
      <StyledTextField
        error={false}
        type="text"
        disabled={reminderIsAccomplished}
        onChange={e => setValueTextArea(e.target.value)}
        value={(reminderIsAccomplished ? answerQuestion.answer.free_text : valueTextArea)}
        placeholder=""
        onBlur={setTextAnswer}
        multiline
        rows={4}
      />
    </Box>
  );
};

export default OnlyAnswer;
