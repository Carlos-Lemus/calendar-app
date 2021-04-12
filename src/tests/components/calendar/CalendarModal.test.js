import configMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { types } from "../../../types/types";
import { startNewAddEvent, startUpdateEvent, startClearActiveEvent, clearSelectSlotDay } from "../../../actions/events";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import moment from "moment";

const middlewares = [thunk];
const mockStore = configMockStore(middlewares);

jest.mock("../../../actions/events", () => ({
    startUpdateEvent: jest.fn(),
    startClearActiveEvent: jest.fn(),
    clearSelectSlotDay: jest.fn(),
    startNewAddEvent: jest.fn()
}));

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00
const nowPlus1 = now.clone().add(1, 'hours');

const initialState = {
    ui: {
        openModal: true
    },
    calendar: {
        events: [],
        activeEvent: {
            title: "Test Active Event",
            notes: "Test note",
            start: now.toDate(),
            end: nowPlus1.toDate()
        }
    },
    auth: {
        uid: "123",
        name: "Test"
    }
};

let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store={store}>
        <CalendarModal />
    </Provider>
);


describe("Pruebas en <CalendarModal />", () => {

    test('Debe mostrarse correctamente', () => {
        expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
    })

    test('debe de ejecutar startUpdateEvent al hacer submit', () => {
        wrapper.find("form").simulate("submit", {
            preventDefault() { }
        });
        expect(startUpdateEvent).toBeCalledWith(initialState.calendar.activeEvent);
        expect(startClearActiveEvent).toBeCalled();
    });

    test('debe de mostrar error en el input de titulo si esta vacion', () => {
        wrapper.find("button").simulate("submit", {
            preventDefault() { }
        });

        expect(wrapper.find("input[name='title']").hasClass("is-invalid")).toBe(true);
    });

    test('debe de agregar un nuevo evento', () => {
        const initialState = {
            ui: {
                openModal: true
            },
            calendar: {
                events: [],
                activeEvent: null
            },
            auth: {
                uid: "123",
                name: "Test"
            }
        };

        let store = mockStore(initialState);
        store.dispatch = jest.fn();
        
        const wrapper = mount(
            <Provider store={store}>
                <CalendarModal />
            </Provider>
        );


        wrapper.find("input[name='title']").simulate("change", ({
            target: {
                name: "title",
                value: "Test title"
            }
        }));

        wrapper.find("form").simulate("submit", ({
            preventDefault() { }
        }));

        expect(startNewAddEvent).toHaveBeenCalledWith({
            start: expect.anything(),
            end: expect.anything(),
            title: "Test title",
            notes: ""
        });
    })


});