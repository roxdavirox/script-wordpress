import { getCookie, setCookie } from '../components/cookies';

export const getFormCookie = () => getCookie('form-cookie');
export const setFormCookie = value => setCookie('form-cookie', true);

export const getUserName = () => getCookie('user-name');
export const setUserName = name => setCookie('user-name', name);

export const getUserPhone = () => getCookie('user-phone');
export const setUserPhone = phone => setCookie('user-phone', phone);

export const getUserEmail = () => getCookie('user-email');
export const setUserEmail = email => setCookie('user-email', email);
