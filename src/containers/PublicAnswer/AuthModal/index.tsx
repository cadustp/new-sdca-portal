import React, { useState } from 'react';
import { injectIntl } from 'react-intl';
import { Box, Button, Input } from '@mui/material';
import Logo from '../../../assets/branding/new_logo.svg';

type Props = {
  intl: {
    messages: [];
  };
};

type StateProps = {
  isLoading: boolean,
  customPasswordRequired: boolean
};

type DispatchProps = {
  handleLogin: Function,
};

const AuthModal: React.FC<Props & StateProps & DispatchProps> = ({
  intl,
  isLoading,
  handleLogin,
  customPasswordRequired
}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const handlePublicLogin = () => {
    handleLogin(loginInfo);
  };

  const handleDisable = () => {
    if (isLoading) { return true; }
    if (customPasswordRequired) return !!(!loginInfo.password)
    return !!((!loginInfo.email || !loginInfo.password));
  };

  return (
    <>
      <div className="public-auth">
        <Box className="public-auth-container">
          <img src={Logo} width={180} alt="Dayway Logo" className="public-auth-logo" />
          <form className="public-auth-form" noValidate autoComplete="off">
            {(!customPasswordRequired &&
              <div className="public-auth-field">
                <Input
                  onKeyDown={e => { if (e.key === 'Enter') { handlePublicLogin(); } }}
                  onChange={event => setLoginInfo({ ...loginInfo, email: event.target.value })}
                  value={loginInfo.email}
                  placeholder={intl.messages['app_login.email']}
                  type="email"
                  fullWidth
                  style={{
                    fontSize: '14px',
                    color: '#333333',
                  }}
                />
              </div>)
            }
            <div className="public-auth-field">
              <Input
                onKeyDown={e => { if (e.key === 'Enter') { handlePublicLogin(); } }}
                onChange={event => setLoginInfo({ ...loginInfo, password: event.target.value })}
                value={loginInfo.password}
                placeholder={intl.messages['app_login.password']}
                type="password"
                fullWidth
                style={{
                  fontSize: '14px',
                  color: '#333333',
                }}
              />
            </div>
          </form>
          <div className="public-auth-btn">
            <Button
              variant="contained"
              disabled={handleDisable()}
              onClick={handlePublicLogin}
            >
              {intl.messages['app_login.login']}
            </Button>
          </div>
        </Box>
      </div>
    </>
  );
};

export default injectIntl(AuthModal);
