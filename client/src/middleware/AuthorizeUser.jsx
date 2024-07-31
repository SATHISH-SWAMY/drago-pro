import React from 'react'
import { Navigate } from 'react-router-dom';


export const UnAuthorizeUser = ({ children }) => {
   
    const token = localStorage.getItem("token");
  
    if (!token ) {
      return <Navigate to={'/signin'} replace={true}></Navigate>
    }
  
    return children;
  };

export const AuthorizeUser = ({ children }) => {
    const token = localStorage.getItem('token');
    if(token){
        return <Navigate to={'/dashbord'} replace={true}></Navigate>
    }

    return children;
}
