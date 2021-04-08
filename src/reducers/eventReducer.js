import moment from "moment";
import { types } from "../types/types";

const initialState = {
    events: [
        {
            id: Date.now(),
            title: "Cumpleaños del jefe",
            start: moment().toDate(),
            end: moment().add(2, "hour").toDate(),
            bgcolor: "#fafafa",
            notes: "Comprar el pastel",
            name: "Carlos"
        }
    ],
    activeEvent: null
}

export const eventReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return {
                ...state,
                events: [...state.events, action.payload]
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map(
                    event => (event.id === action.payload.id) ? action.payload : event
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    event => (event.id !== state.activeEvent.id)
                )
            }

        default:
            return state;
    }
}