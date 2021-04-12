import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { AppRouter } from "../../../routers/AppRouter";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);


describe("Pruebas en <AppRouter />", () => {

    test('Debe mostrarse de forma correcta <AppRouter />', () => {

        const initialState = {
            auth: {
                checking: true
            }
        };

        let store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".spinner-content").exists()).toBe(true);
    });

    test('Debe mostrar la ruta publica', () => {

        const initialState = {
            auth: {
                checking: false,
                uid: null
            }
        };

        let store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".login-container").exists()).toBe(true);
    });

    test('Debe mostrar la ruta privada', () => {

        const initialState = {
            ui: {
                openModal: false
            },
            calendar: {
                events: []
            },
            auth: {
                checking: false,
                uid: "123",
                name: "Test"
            }
        };
        let store = mockStore(initialState);
        const wrapper = mount(
            <Provider store={store}>
                <AppRouter />
            </Provider>
        );

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(".calendar-screen").exists()).toBe(true);
    });


});