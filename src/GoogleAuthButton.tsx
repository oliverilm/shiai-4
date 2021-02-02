import React from 'react'
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';

export const GoogleAuthButton = () => {

    const googleResponse = (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        console.log(response);
      }

      return (
        <div className="App">
          <h1>LOGIN WITH GOOGLE</h1>
        
          <GoogleLogin
            clientId="<Google Client ID>"
            buttonText="LOGIN WITH GOOGLE"
            onSuccess={googleResponse}
            onFailure={googleResponse}
          />
        </div>
      );
}
