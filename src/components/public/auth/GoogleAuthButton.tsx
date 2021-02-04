import React, {useContext,useEffect, useState} from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import api from '../../../auth';
import { AuthContext } from '../../../hooks/context';

export const GoogleAuthButton = () => {
  const auth = useContext(AuthContext)

  const googleResponse = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    // move this logic to the app.js file or update the context here.
    await api.auth.googleAuth(response)
    auth.login()
  }

  return (
    <div className="App">
      <h1>LOGIN WITH GOOGLE</h1>

      <GoogleLogin
        clientId="762148197853-jne57s4j8cpd8cuo9h06h66p5g7u90kq.apps.googleusercontent.com"
        buttonText="LOGIN WITH GOOGLE"
        onSuccess={googleResponse}
        onFailure={googleResponse}
      />
    </div>
  );
}
