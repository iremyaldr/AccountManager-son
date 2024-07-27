// src\App.js
import React, { useEffect, useCallback, useState } from 'react';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal, MsalProvider } from '@azure/msal-react';
import { msalInstance, loginRequest } from './authConfig';
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import { AppBar, Tabs, Tab, Box, Typography, Container, Button } from '@mui/material';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import store from './actions/store';
import AccountInfo from './components/accountInfo';
import './App.css';

import SharedAccountInfo from './components/SharedAccountInfo';

// TabNavigation bileşenini import etmeyi kaldırdık
// import TabNavigation from './components/TabNavigation';

const PersonalPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Personal Account Information</Typography>
      <AccountInfo />
    </Box>
  );
};

const SharedPage = () => {
  return (
    <Box p={3}>
      <Typography variant="h6">Shared Account Information</Typography>
      <SharedAccountInfo />
    </Box>
  );
};
const WrappedView = () => {
  const { instance, inProgress } = useMsal();
  const activeAccount = instance.getActiveAccount();
  const [tabValue, setTabValue] = useState('/personal');
  const [redirecting, setRedirecting] = useState(false);

  const handleRedirect = useCallback(() => {
    setRedirecting(true);
    instance
      .loginRedirect(loginRequest)
      .catch((error) => console.log('Login Redirect Error:', error));
  }, [instance]);

  const handleLogout = () => {
    instance.logoutRedirect().catch((error) => console.log('Logout Redirect Error:', error));
  };

  useEffect(() => {
    const handleRedirectResponse = async () => {
      try {
        const response = await instance.handleRedirectPromise();
        if (response) {
          console.log('handleRedirectPromise response:', response);
        }
      } catch (error) {
        console.log('Error in handleRedirectPromise:', error);
      }
    };

    handleRedirectResponse();

    if (!activeAccount && inProgress === 'none' && !redirecting) {
      console.log('Showing welcome screen.');
    } else if (activeAccount) {
      console.log('Already logged in:', activeAccount);
    }
  }, [activeAccount, handleRedirect, inProgress, instance, redirecting]);

  if (!activeAccount && inProgress === 'none' && !redirecting) {
    return (
      <UnauthenticatedTemplate>
        <div className="welcome-container">
          <Typography variant="h4" gutterBottom>
           NDAccountManager
          </Typography>
          <Typography variant="body1" gutterBottom>
            Hoşgeldiniz,Uygulamayı kullanmaya hemen başlayın. Hesap bilgilerinizi güvenli bir şekilde yönetin.
          </Typography>
          <Button variant="contained" color="primary" onClick={handleRedirect}>
            Microsoft ile Giriş Yap
          </Button>
        </div>
      </UnauthenticatedTemplate>
    );
  }

  return (
    <AuthenticatedTemplate>
      <AppBar position="static">
        <Tabs value={tabValue} onChange={(event, newValue) => setTabValue(newValue)} aria-label="home tabs">
          <Tab label="Personal" component={Link} to="/personal" />
          <Tab label="Shared" component={Link} to="/shared" />
        </Tabs>
        <Button color="inherit" onClick={handleLogout} style={{ marginLeft: 'auto' }}>
          Logout
        </Button>
      </AppBar>
      <Container maxWidth="lg">
        <Box mt={2}>
          <Routes>
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="/shared" element={<SharedPage />} />
            <Route path="*" element={<Navigate to="/personal" />} />
          </Routes>
        </Box>
      </Container>
    </AuthenticatedTemplate>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <ToastProvider autoDismiss={true}>
        <MsalProvider instance={msalInstance}>
          <WrappedView />
        </MsalProvider>
      </ToastProvider>
    </Provider>
  );
};

export default App;
