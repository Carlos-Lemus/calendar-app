import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { startDeleteEvent } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);
Storage.prototype.setItem = jest.fn();

const initialState = {};

let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
    startDeleteEvent: jest.fn()
}));

const wrapper = mount(
    <Provider store={store}>
        <DeleteEventFab />
    </Provider>
);

describe("Pruebas en <DeleteEventFab />", () => {

    test('Haciendo snapshot de <DeleteEventFab />', () => {
        expect(wrapper).toMatchSnapshot();
    });
    
    test('debe ejecutar el evento handleClick al hacer click', () => {
        wrapper.find("button").prop("onClick")();

        expect(store.dispatch).toHaveBeenCalledTimes(1);
        expect(startDeleteEvent).toHaveBeenCalledTimes(1);
    })
    

});