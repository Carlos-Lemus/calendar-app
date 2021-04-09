import Swal from "sweetalert2";
import { fetchWithoutToken, fetchWithToken } from "../helpers/fetch";
import { types } from "../types/types";

export const startLogin = (email, password) => {
    return async(dispatch) => {
        
        const req = await fetchWithoutToken("auth", "POST", {email, password});
        const body = await req.json();

        if(body.ok) {

            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());

            dispatch(login({
                uid: body.uid,
                name: body.name
            }));
        } else {
            Swal.fire("Error", body.msg, "error");
        }

    };
};

export const startRegister = (name, email, password) => {
    return async(dispatch) => {
        const resp = await fetchWithoutToken("auth/new", "POST", {name, email, password});
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            
            dispatch(login( { name: body.name, uid: body.uid } ) );
            
        } else {
            Swal.fire("Error", body.msg, "error");
        }
    };
};

export const startChecking = () => {
    return async(dispatch) => {
        const resp = await fetchWithToken("auth/renew");
        const body = await resp.json();
        
        if(body.ok) {
            localStorage.setItem("token", body.token);
            localStorage.setItem("token-init-date", new Date().getTime());
            
            dispatch(login( { name: body.name, uid: body.uid } ) );
            
        } else {
            dispatch(finishChecking());
        }
    };
};

export const startLogout = () => {
    return async(dispatch) => {

        localStorage.clear();

        dispatch(logout());
    }
};

const logout = () => ({ type: types.authLogout });

const login = ( user ) => ({
    type: types.authLogin,
    payload: user
});

export const finishChecking = () => ({
    type: types.authCheckingFinish
});

