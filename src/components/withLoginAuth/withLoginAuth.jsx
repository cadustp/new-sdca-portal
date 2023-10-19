import React from 'react';
import { Redirect } from 'react-router-dom';
import {
  setLogoutResponseInterceptor,
} from '../../services/apiService';
import Header from '../Header';

const withLogInAuth = Component => props => {
  const {
    doLogout,
    saveLoggedUser,
    addUserCompany,
    setLanguage,
    user,
  } = props;
  const isLoggedIn = () => {
    const localUser = JSON.parse(localStorage.getItem('user'));

    if (localUser?.id) {
      if (!user?.id) {
        const { dashboardSettings } = localUser;
        if (dashboardSettings) {
          delete localUser.dashboardSettings;
          addUserCompany(dashboardSettings);
        }
        saveLoggedUser(localUser);
        setLanguage(localUser.language);
      }
      setLogoutResponseInterceptor(doLogout);
      return true;
    }
    window.localStorage.clear();
    return false;
  };

  return (
    isLoggedIn() ? (
      <Header>
        <Component {...props} />
      </Header>
    ) : (
      <Redirect to="/login" />
    )
  );
};

export default withLogInAuth;
