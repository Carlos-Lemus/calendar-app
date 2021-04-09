import Swal from "sweetalert2";
import { fetchWithToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const startLoadingEvents = () => {
    return async(dispatch) => {
        try {
            const res = await fetchWithToken("events/");
            const body = await res.json();
            
            const events = prepareEvents(body.events);

            dispatch(loadedEvents(events));
            
        } catch (error) {
            console.log(error)
        }
    }
};

const loadedEvents = (events) => ({
    type: types.eventLoaded,
    payload: events
});

export const startSetActiveEvent = (event) => ({
    type: types.eventSetActive,
    payload: event
});

export const startNewAddEvent = (event) => {
    return async (dispatch, getState) => {
        try {
            const res = await fetchWithToken("events", "POST", event);
            const body = await res.json();

            if (body.ok) {

                const { uid, name } = getState().auth;

                event.id = body.event.id;
                event.user = {
                    _id: uid,
                    name
                };

                dispatch(newAddEvent(event));
            } else {
                Swal.fire("Error", body.msg, "error");
            }
        } catch (error) {
            console.log(error)
        }
    };
};

const newAddEvent = (event) => ({
    type: types.eventAddNew,
    payload: event
});

export const startClearActiveEvent = () => ({
    type: types.eventClearActiveEvent
});

export const startUpdateEvent = (event) => {
    return async(dispatch) => {
        try {
            const res = await fetchWithToken(`events/${ event.id }`, "PUT", event);
            const body = await res.json();
            
            if(body.ok) {
                dispatch(updateEvent(event));
            } else {
                Swal.fire("Error", body.msg, "error");
            }

        } catch (error) {
            console.log(error);
        }
    };
};

const updateEvent = (event) => ({
    type: types.eventUpdate,
    payload: event
});

export const startDeleteEvent = () => {

    return async(dispatch, getState) => {

        try {
            const {id} = getState().calendar.activeEvent;

            const res = await fetchWithToken(`events/${id}`, "DELETE");
            const body = await res.json();

            if(body.ok) {

                dispatch(deleteEvent());       
                dispatch(startClearActiveEvent());

            } else {
                Swal.fire("Error", body.msg, "error");
            }

        } catch (error) {
            console.log(error)
        }
    };

};

const deleteEvent = () => ({
    type: types.eventDeleted
});