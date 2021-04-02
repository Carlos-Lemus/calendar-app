import React from 'react'

export const NavBar = () => {
    return (
        <nav className="navbar navbar-dark bg-dark mb-4">
            <span className="navbar-brand ">
                Carlos
            </span>

            <button className="btn btn-outline-danger">
                <i className="fas fa-sign-out-alt"></i>
                <span className="ml-2">Salir</span>
            </button>
            
        </nav>
    )
}
