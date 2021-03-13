import React from 'react';
import FacebookLogin from 'react-facebook-login';
import axios from 'axios';

const Facebook = ({ informParent = f => f, clientId, apiUrl }) => {

  const sendFacebookToken = (userID, accessToken) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/facebook-login`, {
        userID,
        accessToken
      })
      .then(res => {
        console.log(res.data);
        informParent(res);
      })
      .catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
      });


  };

  const responseFacebook = response => {
    console.log(response);
    sendFacebookToken(response.userID, response.accessToken)
  };


  return (
      <FacebookLogin
        appId={`${process.env.REACT_APP_FACEBOOK_CLIENT}`}
        autoLoad={false}
        callback={responseFacebook}
        onSuccess={responseFacebook}
        fields="name,email,picture"
        cookiePolicy={'single_host_origin'}
      />
  );
};

export default Facebook;
