import React from 'react'
import FacebookLogin, { ReactFacebookFailureResponse, ReactFacebookLoginInfo } from 'react-facebook-login';

const FacebookAuthButton: React.FC = () => {

    const facebookResponse = (response: ReactFacebookLoginInfo | ReactFacebookFailureResponse) => {
        console.log(response);
    }
    
    return (
            <FacebookLogin
                buttonStyle={{ width: "100%" }}
                textButton="LOGIN WITH FACEBOOK"
                appId= "<FACEBOOK APP ID>"
                fields="name,email,picture"
                callback={facebookResponse}
            />
    );
}
export default FacebookAuthButton;