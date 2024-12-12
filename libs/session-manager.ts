import { tokenName } from "./constant";

export function setSessionToken(token:string) {
    localStorage.setItem(tokenName,token);
}
export function getSessionToken() {
    return localStorage.getItem(tokenName);
}
export function removeSessionToken(token:string) {
    localStorage.removeItem(tokenName);
}