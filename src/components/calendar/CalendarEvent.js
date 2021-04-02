import React from 'react'

export const CalendarEvent = ({event}) => {

    const {title, name} = event;
    
    return (
        <div>
            <strong>{title}</strong>
            <strong>{name}</strong>
        </div>
    )
}
