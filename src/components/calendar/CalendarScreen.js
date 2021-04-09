import React, { useEffect, useState } from 'react';
import { NavBar } from '../ui/NavBar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { messages } from '../../helpers/messages';

// import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { startOpenModal } from '../../actions/ui';
import { startLoadingEvents, startSetActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale("es");

const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)
    const {uid} = useSelector(state => state.auth)

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    useEffect(() => {
        
        dispatch(startLoadingEvents());

    }, [dispatch])

    const eventStyleGetter = ( event, start, end, isSelected ) => {
    
        const style = {
            backgroundColor: (event.user._id === uid)? "#367CF7" : "#465660",
            borderRadius: "0px",
            opacity: 0.8,
            display: "block",
            color: "white"
        };

        return {
            style
        }
        
    }

    const onDoubleClickEvent = (event) => {
        dispatch(startOpenModal());
    };
    
    const onSelectEvent = (event) => {
        dispatch(startSetActiveEvent(event));
    };
    
    const onViewChange = (event) => {
        setLastView(event);
        localStorage.setItem("lastView", event);
    };

    const onSelectSlot = (slotInfo) => {

    }

    return (
        <div className="calendar-screen">
            <NavBar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClickEvent }
                onView={ onViewChange }
                onSelectEvent={ onSelectEvent }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
                selectable={ true }
                onSelectSlot={ onSelectSlot }
            />

            <AddNewFab />

            {
                activeEvent && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
