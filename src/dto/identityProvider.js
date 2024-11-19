class IdentityProviderDTO {
    constructor(idp) {
        this.name = idp.NAME;
        this.issuer = idp.ISSUER;
        this.authorizationURL = idp.AUTHORIZATION_URL;
        this.tokenURL = idp.TOKEN_URL;
        this.clientId = idp.CLIENT_ID;
        this.callbackURL = idp.CALLBACK_URL;
        this.scope = idp.SCOPE;
        this.logoutURL = idp.LOGOUT_URL;
        this.logoutRedirectURI = idp.LOGOUT_REDIRECT_URL;
        if (idp.USER_INFOR_URL) {
            this.userInfoURL = idp.USER_INFOR_URL;
        }
        if (idp.SIGNUP_URL) {
            this.signUpURL = idp.SIGNUP_URL
        }

    }

    setResponseData(data) {
        this.data = data;
    }

    getResponseData() {
        return this.data;
    }
}

module.exports = IdentityProviderDTO;