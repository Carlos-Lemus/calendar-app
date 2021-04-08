import React from 'react'
import { useDispatch } from 'react-redux';
import { startClearActiveEvent } from '../../actions/events';
import { startOpenModal } from '../../actions/ui';

export const AddNewFab = () => {

    const dispatch = useDispatch()

    const handleClick = () => {
        dispatch( startClearActiveEvent());
        dispatch(startOpenModal());
    }

    return (
        <button
            className="btn btn-primary fab"
            type="button"
            onClick={ handleClick }
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
