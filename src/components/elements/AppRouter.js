import React from 'react'
import {useRoutes} from 'react-router-dom'
import {useSelector} from 'react-redux'

import {authRoutes, noneAuthRoutes} from '../../routes'


const AppRouter = () => {
    const isAuth = useSelector(state => state.app.isAuth)

    const auth_routes = useRoutes(authRoutes.map(({path, Component}) => {
        return {
            path: path,
            element: Component
        }
    }))

    const none_auth_routes = useRoutes(noneAuthRoutes.map(({path, Component}) => {
        return {
            path: path,
            element: Component
        }
    }))

    return (
        <>
            {isAuth ? auth_routes : none_auth_routes}
        </>
    );
};

export default AppRouter;
