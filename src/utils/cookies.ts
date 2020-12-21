import {document} from 'global';

interface Cookie {
  key: string;
  value: string;
}

const COOKIE_PREFIX = '@GET:';

const getRawKey = (cookieKey: string): string => cookieKey.replace(COOKIE_PREFIX, '').trim();

const getCookieKey = (rawKey: string): string => `${COOKIE_PREFIX}${rawKey}`;

const getCookiesList = (): string[] => document.cookie.split(';');

const getGETCookiesList = (): string[] => {
  return getCookiesList().filter(cookie => cookie.includes(COOKIE_PREFIX));
}

// @TODO: Add expire date param, take number of days for it to last (expire = today + number of days)
const createCookie = (rawKey: string, value: any): void => {
  const today = new Date();

  document.cookie= `${getCookieKey(rawKey)}=${value}`;
}

const deleteCookie = (cookie: Cookie) => {
  document.cookie= `${cookie.key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

const getCookies = (): Cookie[] => 
  getGETCookiesList()
    .map(cookie => {
      const splitCookie = cookie.split("=");
      const key = splitCookie[0];
      const value = splitCookie[1];
      return {
        key,
        value
      }
    });

const deleteCookies = (): void => {
  getCookies().forEach(deleteCookie);
}

const getCookie = (rawKey: string): Cookie | undefined => 
  getCookies().find(cookie => cookie.key === ` ${getCookieKey(rawKey)}`);



export const CookieService = {
  createCookie,
  getCookies,
  deleteCookies,
  deleteCookie,
  getCookie,
  getCookieKey,
  getRawKey,
};