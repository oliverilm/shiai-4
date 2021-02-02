import axios from "axios";

import apiConstants from "./apiConstants";

/**
 * perform the facebook authentication.
 * @param accesstoken 
 */
export const fbLogin = async (accesstoken: string) => {
  const res = await axios.post(
    apiConstants.FACEBOOK_AUTH_URL,
    {
      access_token : accesstoken,
    }
  );
  console.log(res);
  return res.status;
};


/**
 * perform the google authentication.
 * @param accesstoken 
 */
export const googleLogin = async (accesstoken: string) => {
    const res = await axios.post(
        apiConstants.GOOGLE_AUTH_URL,
        {
        access_token: accesstoken,
        }
    );
    console.log(res);
    return res.status;
};

/**
 * get the stored token from localstorage
 */
export const token = (): string => {

  return ""
}

