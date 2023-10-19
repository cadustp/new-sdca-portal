import React, { useEffect } from 'react';
import { withRouter } from '../../helpers/withRouter'; 
import { Box } from '@mui/material';
import { PublicAnswersProvider } from '../../context/ContextPublicAnswers';
import Header from './Header';
import AuthModal from './AuthModal';
import SuccessModal from './SuccessModal';
import ExpansionDescription from './ExpansionDescription';
import FormSteps from '../AnswerReminder/FormSteps';
import Loading from '../../components/Loading';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';

import './styles.css';
import { TForm } from '../../types/reminder';
import { RESPONSE_STATUS } from '../../helpers/consts';

type Props = {
  intl: {
    messages: [];
    formatMessage: Function;
  };
  match: {
    params:{
      id: string
      url: string
    }
  },
};

type DispatchProps = {
  loadFormRequest: Function;
  updateFormAnswers: Function;
  loadAuthenticationRequiredRequest: Function;
  setPlan: Function;
  knockoutStep: Function;
  publicLinkPlanUsersRequest: Function;
  removeKnockoutStep: Function;
  knockoutForm: Function;
  sendPublicAnswer: Function;
  setQuestionObservation: Function;
  handleRemoveKnockoutStep: Function;
  clearStatus: Function;
  clearLoadingErrors: Function;
};

type StateProps = {
  form: TForm,
  formActive: boolean,
  isLoading: boolean,
  status: string,
  message: string,
  afterMessage: string,
  afterImageLink: string,
  afterImageRedirect: string,
  isAccomplished: boolean,
  isAuthenticated: boolean,
  requireAuth: boolean,
  customPasswordRequired: boolean,
  loadingError: boolean,
};

const PublicAnswer: React.FC<Props & DispatchProps & StateProps> = ({
  match,
  intl,
  form,
  formActive,
  isLoading,
  status,
  message,
  afterMessage,
  afterImageLink,
  afterImageRedirect,
  isAccomplished,
  clearStatus,
  clearLoadingErrors,
  loadFormRequest,
  loadAuthenticationRequiredRequest,
  updateFormAnswers,
  knockoutStep,
  removeKnockoutStep,
  knockoutForm,
  setQuestionObservation,
  sendPublicAnswer,
  setPlan,
  isAuthenticated,
  requireAuth,
  publicLinkPlanUsersRequest,
  customPasswordRequired,
  loadingError,
}) => {
  const { params } = match;
  const formHasAnyTypeOfAuth = (customPasswordRequired || requireAuth);
  const formIsAuthenticatedWithPassword = (isAuthenticated && requireAuth);

  useEffect(() => {
    loadAuthenticationRequiredRequest({ id: params?.id });
  }, []);

  useEffect(() => {
    if (isAuthenticated && !formHasAnyTypeOfAuth) {
      loadFormRequest({ id: params?.id });
    }
    if (formIsAuthenticatedWithPassword) publicLinkPlanUsersRequest({ id: params?.id });
  }, [isAuthenticated]);

  const handleSendAnswers = () => {
    const send = window.confirm(`${intl.messages['reminders.answer.send']}`);
    if (send) {
      sendPublicAnswer({ form, publicId: params?.id });
    }
  };

  const handleSnackMessage = error => {
    if (error === 'emptyQuestions') return intl.messages['public.answer.missing'];
    if (status === RESPONSE_STATUS.SUCCESS) return intl.messages['public.answer.success'];

    return intl.messages[error] || error;
  };

  const handleLogin = login => {
    loadFormRequest({
      id: params?.id,
      login,
    });
  };

  const loadComponents = () => {
    if (!formActive && !isLoading && !loadingError) {
      return (
        <div className="public-auth">
          <Box className="public-auth-container">
            <div>{intl.messages['public.form.inactive']}</div>
          </Box>
        </div>
      );
    };
    if (status === RESPONSE_STATUS.SUCCESS) return (<SuccessModal afterMessage={afterMessage} afterImageLink={afterImageLink} afterImageRedirect={afterImageRedirect} />);
    if (formHasAnyTypeOfAuth && !isAuthenticated) {
      return (
        <AuthModal
          customPasswordRequired={customPasswordRequired}
          handleLogin={handleLogin}
        />
      );
    };
    return (
      <Box>
        { form?.id
        && (
        <>
          <Header
            name={form?.name}
            handleSendAnswers={handleSendAnswers}
            isAccomplished={isAccomplished}
          />
          <Box>
            <div className="public-steps">
              {form?.description && (
              <ExpansionDescription
                description={form.description}
              />
              )}
              <FormSteps
                intl={intl}
                isAccomplished={isAccomplished}
                form={form}
                setPlan={setPlan}
                handleUpdateReminderAnswers={updateFormAnswers}
                handleKnockoutStep={knockoutStep}
                handleRemoveKnockoutStep={removeKnockoutStep}
                handleKnockoutForm={knockoutForm}
                isPublic
                hasAuth={formIsAuthenticatedWithPassword}
              />
            </div>
          </Box>
        </>
        )}
      </Box>
    );
  };

  return (
    <>
      { isLoading && <Loading size="large" />}
      <PublicAnswersProvider
        value={{
          intl,
          loadFormRequest,
          updateFormAnswers,
          knockoutStep,
          removeKnockoutStep,
          knockoutForm,
          setQuestionObservation,
          sendPublicAnswer,
        }}
      >
        {loadComponents()}
        {(status === RESPONSE_STATUS.FAILURE) && (
        <CustomSnackbar
          data={{
            message: handleSnackMessage(message),
            type: 'error',
            open: status === RESPONSE_STATUS.FAILURE,
          }}
          handleClose={clearStatus}
        />
        )}
        {!!loadingError && (
        <CustomSnackbar
          data={{
            message: handleSnackMessage(loadingError),
            type: 'error',
            open: !!loadingError,
          }}
          handleClose={clearLoadingErrors}
        />
        )}
      </PublicAnswersProvider>
    </>
  );
};

export default withRouter(PublicAnswer);
