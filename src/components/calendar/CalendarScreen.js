import React, { useState } from 'react';
import { NavBar } from '../ui/NavBar';

import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';

import { messages } from '../../helpers/messages';

import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { startOpenModal } from '../../actions/ui';
import { startSetActiveEvent } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { DeleteEventFab } from '../ui/DeleteEventFab';

moment.locale("es");

const localizer = momentLocalizer(moment);

// const events = [{
//     title: "Cumpleaños del jefe",
//     start: moment().toDate(),
//     end: moment().add(2, "hour").toDate(),
//     bgcolor: "#fafafa",
//     notes: "Comprar el pastel",
//     user: {
//         _id: "123",
//         name: "Carlos"
//     }
// }];

export const CalendarScreen = () => {

    const {events, activeEvent} = useSelector(state => state.calendar)

    const dispatch = useDispatch();

    const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");

    const eventStyleGetter = ( event, start, end, isSelected ) => {
    
        const style = {
            backgroundColor: "#367CF7",
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

    const onSelectSlot = (event) => {
        console.log(event);
        dispatch(startOpenModal());
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
                onSelectSlot={ onSelectSlot }
                selectable={ true }
            />

            <AddNewFab />

            {
                activeEvent && <DeleteEventFab />
            }

            <CalendarModal />
        </div>
    )
}
