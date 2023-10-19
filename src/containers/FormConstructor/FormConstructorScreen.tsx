import React, { useEffect } from 'react';
import { unstable_usePrompt as usePrompt } from 'react-router-dom';
import { withRouter } from '../../helpers/withRouter';
import { AnimatePresence } from 'framer-motion';
import Loading from '../../components/Loading';
import FailureState from '../FailureState';
import { Step } from '../../redux/forms/types';
import { RESPONSE_STATUS } from '../../helpers/consts';
import Menu from './Menu';
import StepSection from './StepSection';
import './styles.css';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import { Box, Paper, Container } from '@mui/material';
import SideBarConfig from "./SideBarConfig"

const FlexContainer = ({children}: any) => (
  <div style={{display: "flex", justifyContent: "space-between"}}>
    {children}
  </div>
)

type Props = {
  intl: {
    messages: [];
    formatMessage: Function,
  };
  history: {
    push: Function;
  };
  match: {
    params:{
      id: string
      url: string
    }
  },
};

type DispatchProps = {
  loadForm: Function;
  startNewForm: Function;
  clearFormSettings: Function;
  clearCloneWarning: Function;
};

type StateProps = {
  loading: boolean,
  showSideBar: boolean,
  error: boolean,
  steps: Step[],
  deleteStatus: string,
  saveStatus: string,
  isAClone: boolean,
};

const FormConstructorScreen: React.FC<Props & DispatchProps & StateProps> = ({
  match,
  intl,
  history,
  loading,
  showSideBar,
  error,
  steps,
  deleteStatus,
  saveStatus,
  loadForm,
  startNewForm,
  clearFormSettings,
  isAClone,
  clearCloneWarning,
}) => {
  const { params } = match;

  useEffect(() => {
    if (!isAClone) {
      if (params?.id) { loadForm(params?.id); } else { startNewForm(); };
    }
    window.scrollTo(0, 0);
    window.onbeforeunload = () => true;
    return () => {
      window.onbeforeunload = null;
      clearFormSettings();
    };
  }, []);

  const CloneWarningSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['forms.clone.message'],
        type: 'warning',
        open: isAClone,
      }}
      handleClose={clearCloneWarning}
    />
  );

  const notReady = !(saveStatus === RESPONSE_STATUS.SUCCESS || deleteStatus === RESPONSE_STATUS.SUCCESS);

  useEffect(() => {
    if (notReady) return;
    window.onbeforeunload = null;
    history.push('/forms');
  }, [saveStatus, deleteStatus]);

  const renderSteps = () => steps.map((step, index) => (
    <StepSection key={step.key} stepOrder={index} stepErrors={step.errors} step={step} />
  ));

  const renderScreen = () => {
    if (loading) { return <Loading size="small" />; }
    if (error) { return <FailureState />; }
    return <AnimatePresence>{renderSteps()}</AnimatePresence>;
  };

  // const ExitPrompt = () => (
  //   <Prompt
  //     when={notReady}
  //     message={`${intl.messages['forms.edit.leaving.warning1']} ${intl.messages['forms.edit.leaving.warning2']} ${intl.messages['utils.confirm_proceed']}`}
  //   />
  // );

  return (
    <>
      {(!loading && notReady) && usePrompt(`${intl.messages['forms.edit.leaving.warning1']} ${intl.messages['forms.edit.leaving.warning2']} ${intl.messages['utils.confirm_proceed']}`)}
      <article style={{ width: '100%' }}>
        <Menu />
        <FlexContainer>
          <Box style={{width: showSideBar ? "60%" : "100%"}}>
            {renderScreen()} 
          </Box>
          <SideBarConfig /> 
        </FlexContainer>
      </article>
      <CloneWarningSnackBar />
    </>
  );
};

export default withRouter(FormConstructorScreen);
