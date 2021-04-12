import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initalState = {
    checking: true
};

describe("Pruebas en authReducer", () => {

    test('debe de retornar el estado inicial', () => {
       
        const state = authReducer(initalState, {});
        
        expect(state).toEqual(initalState);
    });
    
    test('debe de autenticar el usuario', () => {
       
        const action ={
            type: types.authLogin,
            payload: {
                uid: "123",
                name: "Pedro"
            }
        };

        const state = authReducer(initalState, action);
        
        expect(state).toEqual({
            checking: false,
            uid: "123",
            name: "Pedro"
        });
    });
    

});