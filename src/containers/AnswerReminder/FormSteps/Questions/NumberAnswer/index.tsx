import { Box } from '@material-ui/core';
import React, { useState } from 'react';
import NumberFormat from 'react-number-format';
import { StyledTextField } from '../../../../../components/shared/Inputs/StyledInput';
import { TQuestion } from '../../../../../types/reminder';

type Props = {
  answerQuestion: TQuestion;
  decimalSeparator: string;
  thousandSeparator: string;
  handleUpdateReminderAnswers: Function;
  reminderIsAccomplished: boolean;
};

const NumberAnswer: React.FC<Props> = ({
  answerQuestion,
  decimalSeparator,
  thousandSeparator,
  handleUpdateReminderAnswers,
  reminderIsAccomplished,
}) => {
  const [valueNumber, setValueNumber] = useState<number | null>(answerQuestion.answer?.custom_value ? Number(answerQuestion.answer.custom_value) : null);

  const setTextAnswer = () => {
    if (valueNumber && answerQuestion.answer?.custom_value != valueNumber) {
      const answerType = 'numeric';
      handleUpdateReminderAnswers({ answerQuestion, valueNumber, answerType });
    } else {
      setValueNumber(answerQuestion.answer.custom_value);
    };
  };

  return (
    <Box width="100%" pl={5} pr={5}>
      <NumberFormat
        customInput={StyledTextField}
        disabled={reminderIsAccomplished}
        value={valueNumber}
        displayType="input"
        thousandSeparator={thousandSeparator}
        decimalSeparator={decimalSeparator}
        onBlur={setTextAnswer}
        decimalScale={2}
        onValueChange={values => {
          const { value } = values;
          setValueNumber(Number(value));
        }}
      />
    </Box>
  );
};

export default NumberAnswer;
