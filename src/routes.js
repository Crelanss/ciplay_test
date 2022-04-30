import Login from './pages/Login'
import Registration from './pages/Registration'
import ChangePassword from './pages/ChangePassword'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CHANGE_PASSWORD_ROUTE,
    WRONG_PAGE
} from './utils/consts'

export const noneAuthRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <Login/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <Registration/>
    }
    ,
    {
        path: WRONG_PAGE,
        Component: <>Данная страница недоступна</>
    }
]

export const authRoutes = [
    {
        path: CHANGE_PASSWORD_ROUTE,
        Component: <ChangePassword/>
    },
    {
        path: WRONG_PAGE,
        Component: <>Данная страница недоступна</>
    }
]
