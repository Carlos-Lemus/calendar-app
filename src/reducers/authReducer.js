import { types } from "../types/types";

const initState = {
    checking:  true,
    // uid: null,
    // name: null
};

export const authReducer = (state = initState, action ) => {

    switch (action.type) {

        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }

        case types.authCheckingFinish:
            return {
                ...state,
                checking: false
            }

        case types.authLogout:
            
            return {
                checking: false
            }
    
        default:
            return state;
    }

};