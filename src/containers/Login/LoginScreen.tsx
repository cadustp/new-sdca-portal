import React, { useEffect, useState } from 'react';
import {
  Button,
  Input,
  InputAdornment,
  IconButton
} from '@mui/material';
import { makeStyles } from 'mui-styles';
import { withRouter } from '../../helpers/withRouter';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../../assets/branding/new_logo.svg';
import Loading from '../../components/Loading';
import CustomSnackbar from '../../components/shared/CustomSnackbar/CustomSnackbar';
import useCurrentUser from '../../hooks/useCurrentUser';

import { LOGIN_STAGE, RESPONSE_STATUS, SNACKBAR_VARIANTS } from '../../helpers/consts';
import './styles.css';
import { isValidEmail, isValidPassword } from '../../helpers/utils';
import { useNavigate, useParams } from 'react-router';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  isLoading: boolean,
  authError: boolean,
  status: string,
};

type DispatchProps = {
  doLoginRequest: Function,
  clearStatus: Function,
  resetInstructionsRequest: Function,
  updatePasswordRequest: Function,
};

const useStyles = makeStyles({
  root: {
    borderRadius: '9px',
    padding: '22px 20px',
  },
});

const LoginScreen: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  isLoading,
  authError,
  doLoginRequest,
  status,
  clearStatus,
  resetInstructionsRequest,
  updatePasswordRequest,
}) => {
  const [user] = useCurrentUser();
  const params = useParams();
  const navigate = useNavigate();

  const classes = useStyles();
  const [loginStage, setLoginStage] = useState(params.token ? LOGIN_STAGE.RECOVER : LOGIN_STAGE.LOGIN);
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const responseSuccess = status === RESPONSE_STATUS.SUCCESS;
  const passwordMatches = loginInfo.password === loginInfo.confirmPassword;

  const loginDisabled = isLoading || !!(!loginInfo.email || !isValidEmail(loginInfo.email) || !loginInfo.password);
  const forgotDisabled = isLoading || !!(!loginInfo.email || !isValidEmail(loginInfo.email));
  const recoverDisabled = isLoading || !!(!loginInfo.password || !loginInfo.confirmPassword || !isValidPassword(loginInfo.password) || !passwordMatches);

  useEffect(() => {
    if (user?.id) {
      navigate('/dashboard');
    }
  }, []);

  const handleStage = stage => {
    setLoginStage(stage);
    setLoginInfo({
      email: '',
      password: '',
      confirmPassword: '',
    });
  };

  const handleLogin = () => {
    doLoginRequest({ login: loginInfo });
  };

  const handleForgot = () => {
    resetInstructionsRequest({ email: loginInfo.email });
  };

  const handleUpdate = () => {
    updatePasswordRequest({
      token: params.token,
      password: loginInfo.password,
      password_confirmation: loginInfo.confirmPassword,
    });
  };

  const loginRedirect = () => {
    handleStage(LOGIN_STAGE.LOGIN);
    navigate('/login');
  };

  const inputField = ({
    onKeyPress,
    onChange,
    value,
    placeholder,
    type,
    check = '',
    autoComplete = '',
    endAdornment = <></>,
  }) => (
    <>
      <div className="login-field">
        <Input
          onKeyDown={onKeyPress}
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          type={type}
          endAdornment={endAdornment}
          fullWidth
          autoComplete={autoComplete}
        />
        <div className="login-email-error">
          {(check === 'email' && type === 'email') && <InvalidEmailComponent />}
          {(check === 'password' && type === 'password') && <InvalidPasswordComponent />}
          {(check === 'confirmation' && type === 'password') && <InvalidMatchComponent />}
        </div>
      </div>
    </>
  );

  const renderFooter = ({
    mainButton,
    mainText,
    disabled,
    secondaryButton,
    secondaryText,
  }) => (
    <div className="login-footer">
      <Button
        className={classes.root}
        variant="contained"
        disabled={disabled}
        onClick={mainButton}
      >
        {mainText}
      </Button>
      <Button
        variant="text"
        onClick={secondaryButton}
      >
        {secondaryText}
      </Button>
    </div>
  );

  const renderLogin = () => (
    <>
      <form className="login-form" noValidate autoComplete="off">
        {inputField({
          onKeyPress: e => { if (e.key === 'Enter') { handleLogin(); } },
          onChange: e => setLoginInfo({ ...loginInfo, email: e.target.value }),
          value: loginInfo.email,
          placeholder: intl.messages['login.email'],
          type: 'email',
          check: 'email',
        })}
        {inputField({
          onKeyPress: e => { if (e.key === 'Enter') { handleLogin(); } },
          onChange: e => setLoginInfo({ ...loginInfo, password: e.target.value }),
          value: loginInfo.password,
          placeholder: intl.messages['login.password'],
          type: showPassword ? 'text' : 'password',
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShowPassword(!showPassword)}
                onMouseDown={e => e.preventDefault()}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        })}
      </form>
      {renderFooter({
        mainButton: () => handleLogin(),
        mainText: intl.messages['login.enter'],
        disabled: loginDisabled,
        secondaryButton: () => handleStage(LOGIN_STAGE.FORGOT),
        secondaryText: intl.messages['login.forgot'],
      })}
    </>
  );

  const renderForgot = () => (
    <>
      <h1 className="login-forgot-title">{intl.messages['login.forgot']}</h1>
      <form className="login-form" noValidate autoComplete="off">
        {inputField({
          onKeyPress: e => { if (e.key === 'Enter') { handleForgot(); } },
          onChange: e => setLoginInfo({ ...loginInfo, email: e.target.value }),
          value: loginInfo.email,
          placeholder: intl.messages['login.email'],
          type: 'email',
          check: 'email',
        })}
      </form>
      {renderFooter({
        mainButton: () => handleForgot(),
        mainText: intl.messages['login.sendInstructions'],
        disabled: forgotDisabled,
        secondaryButton: () => handleStage(LOGIN_STAGE.LOGIN),
        secondaryText: intl.messages['login.doLogin'],
      })}
    </>
  );

  const renderRecover = () => (
    <>
      <form className="recover-form" noValidate autoComplete="off">
        {inputField({
          onKeyPress: () => {},
          onChange: e => setLoginInfo({ ...loginInfo, password: e.target.value }),
          value: loginInfo.password,
          placeholder: intl.messages['login.password'],
          type: 'password',
          autoComplete: 'new-password',
          check: 'password',
        })}
        {inputField({
          onKeyPress: () => {},
          onChange: e => setLoginInfo({ ...loginInfo, confirmPassword: e.target.value }),
          value: loginInfo.confirmPassword,
          placeholder: intl.messages['login.confirmPassword'],
          type: 'password',
          autoComplete: 'new-password',
          check: 'confirmation',
        })}
      </form>
      {renderFooter({
        mainButton: () => handleUpdate(),
        mainText: intl.messages['login.resetPassword'],
        disabled: recoverDisabled,
        secondaryButton: () => loginRedirect(),
        secondaryText: intl.messages['login.doLogin'],
      })}
    </>
  );

  const handleSnackMessage = () => {
    switch (true) {
      case !responseSuccess && loginStage === LOGIN_STAGE.LOGIN:
        return intl.messages['login.connect.error'];
      case responseSuccess && loginStage === LOGIN_STAGE.FORGOT:
        return intl.messages['login.forgot.success'];
      case !responseSuccess && loginStage === LOGIN_STAGE.FORGOT:
        return intl.messages['login.forgot.error'];
      case responseSuccess && loginStage === LOGIN_STAGE.RECOVER:
        return intl.messages['login.recover.success'];
      case !responseSuccess && loginStage === LOGIN_STAGE.RECOVER:
        return intl.messages['login.recover.error'];
      default:
        return '';
    }
  };

  const handleClose = () => {
    if (loginStage === LOGIN_STAGE.RECOVER && responseSuccess) {
      loginRedirect();
    }
    clearStatus();
  };

  const Header = () => (
    <div className="login-header">
      <img src={Logo} width={180} alt="Dayway Logo" />
    </div>
  );

  const StatusSnackBar = () => (
    <CustomSnackbar
      data={{
        message: handleSnackMessage(),
        type: responseSuccess ? SNACKBAR_VARIANTS.SUCCESS : SNACKBAR_VARIANTS.ERROR,
        open: status.length,
      }}
      handleClose={handleClose}
    />
  );

  const TokenErrorSnackBar = () => (
    <CustomSnackbar
      data={{
        message: intl.messages['login.token.logout'],
        type: 'error',
        open: authError,
      }}
      handleClose={clearStatus}
    />
  );

  const LoadingState = () => (isLoading ? <Loading size="small" /> : <></>);

  const InvalidEmailComponent = () => (
    <small style={{ color: 'red', padding: 5 }}>{ !isValidEmail(loginInfo.email) ? intl.messages['login.email.error'] : ''}</small>
  );

  const InvalidPasswordComponent = () => (
    <small style={{ color: 'red', padding: 5 }}>{ !isValidPassword(loginInfo.password) ? intl.messages['login.recover.instruction'] : ''}</small>
  );

  const InvalidMatchComponent = () => (
    <small style={{ color: 'red', padding: 5 }}>{ (loginInfo.confirmPassword.length && !passwordMatches) ? intl.messages['login.password.match'] : ''}</small>
  );

  return (
    <>
      <div className="login-screen">
        {loginStage !== LOGIN_STAGE.LOGIN && <LoadingState />}
        <div className="login-container">
          <Header />
          {loginStage === LOGIN_STAGE.LOGIN && renderLogin()}
          {loginStage === LOGIN_STAGE.FORGOT && renderForgot()}
          {loginStage === LOGIN_STAGE.RECOVER && renderRecover()}
        </div>
        <StatusSnackBar />
        <TokenErrorSnackBar />
      </div>
    </>
  );
};

export default withRouter(LoginScreen);
