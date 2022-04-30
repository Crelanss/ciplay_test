import React, {useContext} from 'react'
import {useRoutes} from 'react-router-dom'

import {Context} from '../index'
import {authRoutes, noneAuthRoutes} from '../routes'


const AppRouter = () => {
    const {user} = useContext(Context)

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
            {user.isAuth ? auth_routes : none_auth_routes}
        </>
    );
};

export default AppRouter;