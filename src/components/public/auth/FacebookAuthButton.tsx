import React from 'react'
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';

export const FacebookAuthButton: React.FC = () => {

    const facebookResponse = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
        console.log(response);
    }
    
    return (
        <div className="App">
            <h1>LOGIN WITH FACEBOOK</h1>

            <FacebookLogin
            textButton="LOGIN WITH FACEBOOK"
            appId= "<FACEBOOK APP ID>"
            fields="name,email,picture"
            callback={facebookResponse}
            />
        </div>
    );
}
