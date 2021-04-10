import { types } from "../types/types";

const initialState = {
    events: [],
    activeEvent: null,
    daySlotCalendar: null
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

        case types.eventLoaded:
            return {
                ...state,
                events: action.payload
            }

        case types.eventSelectSlot:
            return {
                ...state,
                daySlotCalendar: action.payload
            }
        case types.eventClearSelectSlot:
            return {
                ...state,
                daySlotCalendar: null
            }

        default:
            return state;
    }
}