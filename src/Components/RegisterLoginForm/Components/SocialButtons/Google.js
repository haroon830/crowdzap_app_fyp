import React from 'react';
import GoogleLogin from 'react-google-login';
import axios from 'axios';


const Google = ({ informParent = f =>f , clientId, apiUrl}) => {
    
    const responseGoogle = response => {
        console.log(response);
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API_URL}/user/google-login`,
            data: { idToken: response.tokenId }
        })
            .then(response => {   
                console.log('GOOGLE SIGNIN SUCCESS', response);
                // inform parent component
                informParent(response);
            })
            .catch(error => {
                console.log('GOOGLE SIGNIN ERROR', error.response);
            });
    };

    return (
        <>
        <div className='p-grid p-justify-center p-m-2'>
            <GoogleLogin
                buttonText=""
                cssClass=""
                cookiePolicy={'single_host_origin'}
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                autoLoad={false}

            />
        </div>
        </>
    );
};


                // render={renderProps => (
                //     <button
                //         onClick={renderProps.onClick}
                //         disabled={renderProps.disabled}
                //         // className='w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-indigo-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline'
                //     >
                //         <div className=' p-2 rounded-full '>
                //             <i className='fab fa-google ' />
                //         </div>
                //         <span className='ml-4'>Sign In with Google</span>
                //     </button>
                // )}
                // cookiePolicy={'single_host_origin'}
export default Google;
