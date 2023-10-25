import React from 'react';
import { Navigate } from 'react-router-dom';
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
    // window.localStorage.clear();
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    return false;
  };

  return (
    isLoggedIn() ? (
      <Header>
        <Component {...props} />
      </Header>
    ) : (
      <Navigate to="/login" />
    )
  );
};

export default withLogInAuth;
