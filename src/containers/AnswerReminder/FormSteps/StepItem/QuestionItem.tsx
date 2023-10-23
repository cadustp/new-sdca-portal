import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import AccordionStep from '../../../../components/AccordionStep';
import { TQuestion } from '../../../../types/reminder';
import QuestionsScreen from '../Questions/index';

const countAnswer = (questions: Array<TQuestion>) => questions.filter(q => q.answer && Object.keys(q.answer)?.length)?.length;

const QuestionItem = ({
  stepKey,
  handleKnockoutForm,
  handleUpdateReminderAnswers,
  handleRemoveKnockoutStep,
  handleClearQuestionAnswer,
  handleKnockoutStep,
  setPlan,
  validQuestions,
  questions,
  steps,
  isPublic,
  hasAuth,
  isAccomplished,
  conditionalObject,
  intl,
  step,
}: any) => (
  <>
    <AccordionStep
      conditionalObject={conditionalObject}
      steps={steps}
      stepKey={stepKey}
      isExpanded={isAccomplished || isPublic}
      title={step.name}
      total={validQuestions.length}
      completed={
          countAnswer(validQuestions)
        }
      intl={intl}
      loading={false}
    >
      <Box display="flex" flexDirection="column" width="100%">
        {questions.map((question, key) => (
          <QuestionsScreen
            isExpanded={isAccomplished || isPublic}
            isAccomplished={isAccomplished}
            handleClearQuestionAnswer={handleClearQuestionAnswer}
            question={question}
            shouldHide={question.shouldHide}
            step={step}
            key={key}
            number={key}
            setPlan={setPlan}
            handleUpdateReminderAnswers={handleUpdateReminderAnswers}
            handleKnockoutStep={handleKnockoutStep}
            handleRemoveKnockoutStep={handleRemoveKnockoutStep}
            handleKnockoutForm={handleKnockoutForm}
            isPublic={isPublic}
            hasAuth={hasAuth}
          />
        ))}
      </Box>
    </AccordionStep>
  </>
);

export default QuestionItem;
