import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from "react-router-dom";
import { startChecking } from '../actions/auth';
import { LoginScreen } from '../components/auth/LoginScreen';
import { CalendarScreen } from '../components/calendar/CalendarScreen';
import { Spinner } from '../components/ui/Spinner';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {

    const dispatch = useDispatch();
    const { checking, uid } = useSelector(state => state.auth);
    
    useEffect(() => {
        dispatch(startChecking());

    }, [dispatch]);
    
    if(checking) {
        return <Spinner />
    }


    return (
        <Router>
            <div>
                <Switch>
                    <PublicRoute
                        exact
                        path="/login"
                        component={LoginScreen}
                        isAuthentication={!!uid}
                    />

                    <PrivateRoute
                        exact
                        path="/"
                        component={CalendarScreen}
                        isAuthentication={!!uid}
                    />

                    <Redirect to="/" />
                </Switch>
            </div>

        </Router>
    )
}
