import {
  createGenerateClassName,
  jssPreset,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { create } from 'jss';
import React from 'react';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import ConnectedIntlProvider from './components/ConnectedIntlProvider';
import RouterSwitch from './routes';
import CustomSnackbar from './components/shared/CustomSnackbar';
import LoadingUserData from './containers/LoadingUserData';
import store from './redux/store';
import theme from './styles';
import GlobalStyle from './styles/GlobalStyle';
import materialTheme from './styles/material';

function App() {
  const generateClassName = createGenerateClassName();
  const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById('jss-insertion-point'),
  });
  return (
      <Provider store={store}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <>
            <MuiThemeProvider theme={materialTheme}>
              <ThemeProvider theme={theme}>
                <GlobalStyle />
                <CustomSnackbar />
                <ConnectedIntlProvider>
                  <>
                    <LoadingUserData />
                    <RouterSwitch />
                  </>
                </ConnectedIntlProvider>
              </ThemeProvider>
            </MuiThemeProvider>
          </>
        </JssProvider>
      </Provider>
  );
}

export default App;
