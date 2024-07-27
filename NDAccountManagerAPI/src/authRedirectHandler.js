import { msalInstance } from "./authConfig";

msalInstance.handleRedirectPromise().then((response) => {
    if (response) {
        const account = response.account;
        msalInstance.setActiveAccount(account);
    }
}).catch((error) => {
    console.error(error);
});
