import React,{useContext} from 'react';
import { deleteCookie, setCookie } from 'cookies-next';
import { AuthContext } from './authContext';

export const setTokenCookie = (data) => {
    return setCookie("userInfo",data)
}

export const LogOutCookie = () => {

    return deleteCookie("userInfo")
}

