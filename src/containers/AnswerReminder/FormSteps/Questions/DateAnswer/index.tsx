import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import moment from '../../../../../timezones/moment';
import SingleDate from '../../../../../components/DatePicker/SingleDate';
import { TQuestion } from '../../../../../types/reminder';

type Props = {
  answerQuestion: TQuestion;
  handleUpdateReminderAnswers: Function;
  reminderIsAccomplished: boolean;
};

const DateAnswer: React.FC<Props> = ({
  answerQuestion,
  handleUpdateReminderAnswers,
  reminderIsAccomplished,
}) => {
  const [valueDate, setValueDate] = useState<string | moment.Moment>(
    answerQuestion.answer.custom_date ? moment(answerQuestion.answer.custom_date) : '',
  );
  const setAnswer = () => {
    const answerType = 'date';
    handleUpdateReminderAnswers({ answerQuestion, valueDate, answerType });
  };

  useEffect(() => {
    setAnswer();
  }, [valueDate]);

  return (
    <Box width="100%" pl={5} pr={5}>
      <SingleDate valueDate={valueDate} setValueDate={setValueDate} disabled={reminderIsAccomplished || false} />
    </Box>
  );
};

export default DateAnswer;
