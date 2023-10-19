import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Grow from '@mui/material/Grow';
import { TStep, TQuestion } from '../../../types/reminder';
import StepItem from './StepItem';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
  };
  isAccomplished: boolean;
  form: any;
  setPlan: Function;
  isPublic: boolean;
  hasAuth: boolean;
};

type DispatchProps = {
  handleUpdateReminderAnswers: Function;
  handleClearQuestionAnswer?: Function;
  handleKnockoutStep: Function;
  handleRemoveKnockoutStep: Function;
  handleKnockoutForm: Function;
};

const FormSteps: React.FC<Props & DispatchProps> = ({
  intl,
  form,
  isAccomplished,
  handleUpdateReminderAnswers,
  handleClearQuestionAnswer,
  handleKnockoutStep,
  handleRemoveKnockoutStep,
  handleKnockoutForm,
  isPublic,
  hasAuth,
  setPlan,
}) => {
  const { steps, condition_triggers_object: conditionTriggersObject } = form;

  return (
    <>
      {steps.map((step: TStep, stepKey) => (
        <Grow key={stepKey} in {...(stepKey > 0 ? { timeout: 2000 } : {})}>
          <Box key={stepKey} width="100%" display="flex" flexDirection="column" alignItems="center">
            <StepItem
              stepKey={stepKey}
              handleClearQuestionAnswer={handleClearQuestionAnswer}
              handleKnockoutForm={handleKnockoutForm}
              handleUpdateReminderAnswers={handleUpdateReminderAnswers}
              handleRemoveKnockoutStep={handleRemoveKnockoutStep}
              handleKnockoutStep={handleKnockoutStep}
              setPlan={setPlan}
              steps={steps}
              isPublic={isPublic}
              hasAuth={hasAuth}
              isAccomplished={isAccomplished}
              conditionalObject={conditionTriggersObject}
              intl={intl}
              step={step}
            />
          </Box>
        </Grow>
      ))}
    </>
  );
};

export default FormSteps;
