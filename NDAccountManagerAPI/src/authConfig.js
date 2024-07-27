//  src/authConfig.js
import { PublicClientApplication, LogLevel } from '@azure/msal-browser';

export const msalConfig = {
  auth: {
    clientId: 'client_id',
    authority: 'https://login.microsoftonline.com/tenant_id',
    redirectUri: 'url', // or your production URL
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: 'localStorage', // This configures where your cache will be stored
    storeAuthStateInCookie: true, // Set to true if you are having issues on IE11 or Edge
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Verbose, // More detailed logs
      loggerCallback: (level, message, containsPii) => {
        if (containsPii) {
          // Log sensitive information only in development
          console.log(`MSAL ${LogLevel[level]}: ${message}`);
        } else {
          console.log(`MSAL ${LogLevel[level]}: ${message}`);
        }
      },
    }
  },
};

export const loginRequest = {
  scopes: ['User.Read']
};

export const msalInstance = new PublicClientApplication(msalConfig);
