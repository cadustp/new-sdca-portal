import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router';
import { Prompt } from 'react-router-dom';
import NavBar from './NavBar';
import FormSteps from './FormSteps';
import { answerReminderState } from '../../redux/answerReminder/types';
import { ReminderAnswersProvider } from '../../context/ContextReminderAnswers';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import Loading from '../../components/Loading';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
  };
  history: {
    push: Function;
  };

  valuatedUsers: [];
  match: {
    isExact: boolean
    params:{
      id: string
      app_user_id: string
      path: string
      url: string
    }
  },
};

type DispatchProps = {
  requestReminderForAnswer: Function;
  setEmployee: Function;
  handleUpdateReminderAnswers: Function;
  setPlan: Function;
  handleKnockoutStep: Function;
  handleRemoveKnockoutStep: Function;
  handleClearQuestionAnswer: Function;
  handleKnockoutForm: Function;
  handleSetObservation: Function;
  handleSetLocation: Function;
  sendReminder: Function;
  generatePdf: Function;
  startFilling: Function;
  closeSnackbar: Function;
  listsDataRequest: Function;
  planUsersRequest: Function;
};
type StateProps = {
  answerReminder: answerReminderState;
  showLoading: boolean;
  appLoading: boolean;
  actionPlanUsers: any;
  loadingLists: boolean;
};

const AnswerReminder: React.FC<Props & DispatchProps & StateProps> = ({
  history,
  requestReminderForAnswer,
  answerReminder,
  setEmployee,
  handleRemoveKnockoutStep,
  handleClearQuestionAnswer,
  handleKnockoutForm,
  handleKnockoutStep,
  handleUpdateReminderAnswers,
  setPlan,
  handleSetObservation,
  handleSetLocation,
  intl,
  sendReminder,
  startFilling,
  generatePdf,
  closeSnackbar,
  showLoading,
  appLoading,
  match,
  actionPlanUsers,
  listsDataRequest,
  planUsersRequest,
  loadingLists,
}) => {
  const { params } = match;

  useEffect(() => {
    async function request() {
      await requestReminderForAnswer(params);
    }

    request();
  }, [params.id, requestReminderForAnswer]);

  useEffect(() => {
    listsDataRequest({ evaluateds: true });
    planUsersRequest();
    startFilling();
  }, []);

  return (
    <ReminderAnswersProvider
      value={{
        requestReminderForAnswer,
        answerReminder,
        setEmployee,
        handleRemoveKnockoutStep,
        handleKnockoutForm,
        handleKnockoutStep,
        handleUpdateReminderAnswers,
        setPlan,
        handleSetObservation,
        handleSetLocation,
        intl,
        sendReminder,
        generatePdf,
        actionPlanUsers,
      }}
    >
      <Box width="100vw">
        { (!appLoading && (showLoading || loadingLists)) && <Loading size="large" />}
        {answerReminder.reminder.id && (
          <>
            { answerReminder.reminder.status !== 'accomplished'
              && (
              <Prompt
                message={() => intl.messages['reminders.answer.alert']}
              />
              )}
            <NavBar
              history={history}
              intl={intl}
              disableSaveButton={
                answerReminder.reminder.status === 'accomplished'
              }
              status={answerReminder.reminder.status !== 'accomplished'}
              appUserId={params.app_user_id}
            />
            <Box mt={20}>
              <FormSteps
                intl={intl}
                handleClearQuestionAnswer={handleClearQuestionAnswer}
                handleUpdateReminderAnswers={handleUpdateReminderAnswers}
                setPlan={setPlan}
                handleKnockoutStep={handleKnockoutStep}
                handleRemoveKnockoutStep={handleRemoveKnockoutStep}
                handleKnockoutForm={handleKnockoutForm}
                isAccomplished={answerReminder.reminder.status === 'accomplished'}
                form={answerReminder.reminder.form}
                isPublic={false}
                hasAuth
              />
            </Box>
            {answerReminder.snackbar && (
              <CustomSnackbar
                data={{
                  message:
                    answerReminder.sendReminderResponseMessage
                    !== 'emptyQuestions'
                      ? answerReminder.sendReminderResponseMessage
                      : intl.messages['reminders.answer.missing'],
                  type: answerReminder.snackbarVariant,
                  open: answerReminder.snackbar,
                }}
                handleClose={closeSnackbar}
              />
            )}
          </>
        )}
      </Box>
    </ReminderAnswersProvider>
  );
};

export default withRouter(AnswerReminder);
