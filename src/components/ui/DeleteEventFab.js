import React from 'react'
import { useDispatch } from 'react-redux'
import { startDeleteEvent } from '../../actions/events'

export const DeleteEventFab = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch(startDeleteEvent());
    }

    return (
        <button 
            onClick={ handleClick }
            className="btn btn-danger fab-danger"
            type="button"
        >
            <i className="fas fa-trash"></i>
            <span>Borrar evento</span>
        </button>
    )
}
