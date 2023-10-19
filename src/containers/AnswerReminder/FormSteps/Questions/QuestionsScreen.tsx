import { Box } from '@mui/material';
import { injectIntl } from 'react-intl';
import React, { useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import OnlyAnswer from './OnlyAnswer';
import FreeTextAnswer from './FreeTextAnswer';
import {
  S_Title, S_Warn_Title, S_SubTitle, useStyles,
} from './styles';
import { TQuestion, TStep } from '../../../../types/reminder';
import KnockoutOutQuestion from './KnockoutOutQuestion';
import NumberAnswer from './NumberAnswer';
import ImageAnswer from './ImageAnswer';
import DateAnswer from './DateAnswer';
import ModalsContainer from '../../ModalsContainer/index';
import { captureEvent } from '../../../../analytics';

type Props = {
  question: TQuestion;
  number: number;
  step: TStep;
  setPlan: Function;
  actionPlanUsers: Array<any>;
  handleUpdateReminderAnswers: Function;
  handleKnockoutStep: Function;
  handleClearQuestionAnswer: Function;
  handleRemoveKnockoutStep: Function;
  handleKnockoutForm: Function;
  shouldHide: boolean;
  isAccomplished: boolean;
  intl: {
    messages: [];
    formatMessage: Function;
  };
  isExpanded: boolean;
  isPublic: boolean;
  hasAuth: boolean;
};

const QuestionsScreen: React.FC<Props> = ({
  question,
  number,
  handleKnockoutStep,
  handleUpdateReminderAnswers,
  step,
  setPlan,
  handleRemoveKnockoutStep,
  handleClearQuestionAnswer,
  handleKnockoutForm,
  shouldHide,
  isAccomplished,
  intl,
  isExpanded,
  actionPlanUsers,
  isPublic,
  hasAuth,
}) => {
  const classes = useStyles();
  const { answer, selection_type } = question;
  const [expanded, setExpanded] = React.useState<boolean>(isExpanded);

  useEffect(() => {
    if (shouldHide) {
      handleClearQuestionAnswer({ answerQuestion: question });
    }
  }, [shouldHide]);

  if (shouldHide) {
    return (
      <></>
    );
  }

  return (
    <Box width="100%" mt={0} p={2}>
      <Accordion
        className={classes.accordion}
        expanded={expanded}
        onChange={() => {
          setExpanded(!expanded);
          captureEvent('expandQuestion', { isExpanded: !expanded });
        }}
      >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box width="100%" display="flex" flexDirection="column">
            <S_Title missingAnswer={question.missing_answer}>{`${intl.messages['action_plan.create.question.label']} ${number + 1}`}</S_Title>
            { question.missing_association
              && (
              <>
                <S_Warn_Title>{intl.messages['reminders.answers.required_field']}</S_Warn_Title>
              </>
              )}
            <S_SubTitle>{question.question}</S_SubTitle>
          </Box>
        </AccordionSummary>
        <AccordionDetails style={{ padding: '0px' }}>
          <Box width="100%" pb={0} display="flex" flexDirection="column">

            {answer && answer.knocked_out && <KnockoutOutQuestion />}
            {answer && !answer.knocked_out && (
              <>
                {(selection_type === 'single'
                || selection_type === 'multi') && (
                  <OnlyAnswer
                    handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                    handleKnockoutStep={handleKnockoutStep}
                    handleRemoveKnockoutStep={handleRemoveKnockoutStep}
                    handleKnockoutForm={handleKnockoutForm}
                    options={question.answer_options}
                    answerQuestion={question}
                    selectionType={selection_type}
                    step={step}
                    idAnswers={answer.selected_options ?? []}
                    reminderIsAccomplished={isAccomplished}
                  />
                )}
                {selection_type === 'free_text' && (
                  <FreeTextAnswer
                    handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                    answerQuestion={question}
                    reminderIsAccomplished={isAccomplished}
                  />
                )}
                {selection_type === 'numeric' && (
                  <NumberAnswer
                    answerQuestion={question}
                    handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                    reminderIsAccomplished={isAccomplished}
                    thousandSeparator={intl.messages['reminders.answer.thousandSeparator']}
                    decimalSeparator={intl.messages['reminders.answer.decimalSeparator']}
                  />
                )}
                {selection_type === 'date' && (
                  <DateAnswer
                    answerQuestion={question}
                    handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                    reminderIsAccomplished={isAccomplished}
                  />
                )}
                {selection_type === 'image' && (
                  <ImageAnswer
                    answerQuestion={question}
                    handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                    reminderIsAccomplished={isAccomplished}
                  />
                )}
                <ModalsContainer
                  question={question}
                  intl={intl}
                  isPublic={isPublic}
                  hasAuth={hasAuth}
                  setPlan={setPlan}
                  handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                  actionPlanUsers={actionPlanUsers}
                  reminderIsAccomplished={isAccomplished}
                />
              </>
            )}
          </Box>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default injectIntl(QuestionsScreen);
