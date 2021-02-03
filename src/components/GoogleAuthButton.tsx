import React from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

import api from '../auth';

export const GoogleAuthButton = () => {

    const googleResponse = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const result = await api.auth.googleAuth(response)
        console.log({result})
        
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
