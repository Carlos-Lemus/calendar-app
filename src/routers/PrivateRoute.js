import React from 'react'
import PropTypes from "prop-types";
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({ isAuthentication, component:Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={(props) => (
                (isAuthentication) ?
                    <Component {...props} />
                    :
                    <Redirect to="/login" />
            )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthentication: PropTypes.bool.isRequired
}