import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';
import { startClearActiveEvent } from '../../actions/events';

export const NavBar = () => {

    const dispatch = useDispatch();

    const { name } = useSelector(state => state.auth);

    const handleLogout = () => {
        dispatch(startClearActiveEvent());
        dispatch(startLogout());
    };

    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand ">
                {name}
            </span>

            <button
                onClick={handleLogout}
                className="btn btn-outline-danger"
            >
                <i className="fas fa-sign-out-alt"></i>
                <span className="ml-2">Salir</span>
            </button>

        </nav>
    )
}
