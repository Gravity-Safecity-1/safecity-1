/* eslint-disable eqeqeq */
import api from "../api";


const tkey = '3acc703c-0bb3-483f-af93-4f1b057be191';
const ukey = 'd49db422-04d0-4501-9dc2-0a33ab64e1f9';

export const getToken = () => {
    const token = localStorage.getItem(tkey)
    return token
}
export const setToken = (value) => {
    const token = localStorage.setItem(tkey, value)
    return token
}
export const removeToken = () => {
    const token = localStorage.removeItem(tkey)
    return token
}

/* =====User+== */
export const getUser = () => {
    const token = localStorage.getItem(ukey)
    return token
}
export const setUser = (value) => {
    const token = localStorage.setItem(ukey, value)
    return token
}
export const removeUser = () => {
    const token = localStorage.removeItem(ukey)
    return token
}


export const checkAuth = () => {
    const tkn = getToken()
    const usr = getUser()

    /* console.log("tkn",tkn)
    console.log("usr",usr) */

    if (!Boolean(tkn)|| !Boolean(usr)) {
        return false;
    } else {
         /* try {
            const res = await api.get("/check-auth")
            if (res.data.code == 200) {
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }  */
        return true;
    }
}