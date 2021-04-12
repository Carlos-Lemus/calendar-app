import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { types } from "../../types/types";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import Swal from "sweetalert2";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);
Storage.prototype.setItem = jest.fn();

const initialState = {};

let store = mockStore(initialState);
jest.mock("sweetalert2", () => ({
    fire: jest.fn()
}));

// let token = "";

describe("startLogin correcto", () => {

    beforeEach(() => {
        store = mockStore(initialState)
        jest.clearAllMocks();
    });

    test('startLogin correcto', async () => {
        await store.dispatch(startLogin("pedro@gmail.com", "123456"));

        const actions = store.getActions();

        expect(actions[0]).toEqual({
            type: types.authLogin,
            payload: {
                name: expect.any(String),
                uid: expect.any(String)
            }
        });

        expect(localStorage.setItem).toBeCalledWith("token", expect.any(String));
        expect(localStorage.setItem).toBeCalledWith("token-init-date", expect.any(Number));

        // token = localStorage.setItem.mock.calls[0][1];
    });

    test('startLogin incorrecto', async () => {
        await store.dispatch(startLogin("pedro@gmail.com", "123456789"));
        let actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toBeCalledWith("Error", "El password es incorrecto", "error");

        await store.dispatch(startLogin("emailincorrect@gmail.com", "123456"));
        actions = store.getActions();

        expect(actions).toEqual([]);
        expect(Swal.fire).toBeCalledWith("Error", "El usuario no existe", "error");
    });

    test('starRegister correcto', async () => {
        fetchModule.fetchWithoutToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: "carlos",
                    token: "ABC123ABC123"
                }
            }
        }));

        await store.dispatch(startRegister("test", "test@gmail.com", "123456"));
        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: '[Auth] Login',
                payload: {
                    name: 'carlos',
                    uid: '123'
                }
            }
        );
    });

    test('startChecking correcto', async () => {

        fetchModule.fetchWithToken = jest.fn(() => ({
            json() {
                return {
                    ok: true,
                    uid: "123",
                    name: "carlos",
                    token: "ABC123ABC123"
                }
            }
        }));

        await store.dispatch(startChecking());

        const actions = store.getActions();

        expect(actions[0]).toEqual(
            {
                type: '[Auth] Login',
                payload: {
                    name: 'carlos',
                    uid: '123'
                }
            }
        );
    });


});