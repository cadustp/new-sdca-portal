import {
  createGenerateClassName,
  jssPreset,
  // ThemeProvider,
} from 'mui-styles';
import { create } from 'jss';
import React from 'react';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import ConnectedIntlProvider from './components/ConnectedIntlProvider';
import RouterSwitch from './routes';
import CustomSnackbar from './components/shared/CustomSnackbar';
import LoadingUserData from './containers/LoadingUserData';
import store from './redux/store';
import theme from './styles';
import GlobalStyle from './styles/GlobalStyle';
import { ClerkProvider } from '@clerk/clerk-react';
// import materialTheme from './styles/material';

if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) throw new Error("Missing Publishable Key");

function App() {
  const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
  const generateClassName = createGenerateClassName();
  const jss = create({
    ...jssPreset(),
    insertionPoint: document.getElementById('jss-insertion-point'),
  });
  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
      <Provider store={store}>
        <JssProvider jss={jss} generateClassName={generateClassName}>
          <>
            {/* <ThemeProvider theme={materialTheme}> */}
              <StyledThemeProvider theme={theme}>
                <GlobalStyle />
                <CustomSnackbar />
                <ConnectedIntlProvider>
                  <>
                    <LoadingUserData />
                    <RouterSwitch />
                  </>
                </ConnectedIntlProvider>
              </StyledThemeProvider>
            {/* </ThemeProvider> */}
          </>
        </JssProvider>
      </Provider>
    </ClerkProvider>
  );
}

export default App;
