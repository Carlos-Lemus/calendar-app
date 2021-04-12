import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import  "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/messages";
import { types } from "../../../types/types";
import { startLoadingEvents, startSetActiveEvent } from "../../../actions/events";
import { act } from "@testing-library/react";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);

const initialState = { 
    ui: {
        openModal: false
    },
    calendar: {
        events: []
    },
    auth: {
        uid: "123",
        name: "Test"
    }
 };

let store = mockStore(initialState);

store.dispatch = jest.fn();

Storage.prototype.setItem = jest.fn();

jest.mock("../../../actions/events", () => ({
    startSetActiveEvent: jest.fn(),
    startLoadingEvents: jest.fn()
}));


const wrapper = mount(
    <Provider store={store}>
        <CalendarScreen />
    </Provider>
);

describe("Pruebas en <CalendarScreen />", () => {
    test('<CalendarScreen /> debe mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
    });

    test('Pruebas con las interacciones con el calendario', () => {
        const calendar = wrapper.find("Calendar");

        expect(calendar.exists()).toBe(true);

        const calendarMessages = calendar.prop("messages");

        expect(calendarMessages).toEqual(messages);

        calendar.prop("onDoubleClickEvent")();

        expect(store.dispatch).toHaveBeenCalledWith({ type: types.uiOpenModal });
        
        calendar.prop("onSelectEvent")({start: 0});

        expect(startSetActiveEvent).toHaveBeenCalledWith({start: 0});

        act(() => {
            calendar.prop("onView")("week");
            expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
        });
    })
    
    
});
