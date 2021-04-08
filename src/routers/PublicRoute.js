import React from 'react'
import PropTypes from "prop-types";
import { Redirect, Route } from 'react-router';

export const PublicRoute = ({ isAuthentication, component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                (isAuthentication) ?
                    <Redirect to="/" />
                    :
                    <Component {...props} />
            )}
        />
    )
}

PublicRoute.propTypes = {
    isAuthentication: PropTypes.bool.isRequired
}
