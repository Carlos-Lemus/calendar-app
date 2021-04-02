import React from 'react'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'
import { store } from './store/store'

export const CalendarApp = () => {
    try {
        return (
            <Provider store={store}>
                <AppRouter />
            </Provider>
        )
    } catch (error) {
        console.log(error);
    }
}
