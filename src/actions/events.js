import { types } from "../types/types";

export const startSetActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const startNewAddEvent = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const startClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const startUpdateEvent = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const startDeleteEvent = () => ({
    type: types.eventDeleted
});