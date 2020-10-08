import { getCookie } from '../components/cookies';

export const getFormCookie = () => getCookie('formCookie');

export const getUserName = () => getCookie('user-name');

export const getUserPhone = () => getCookie('user-phone');

export const getUserEmail = () => getCookie('user-email');
