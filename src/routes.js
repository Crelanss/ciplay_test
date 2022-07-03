import ChangePasswordPage from './components/pages/changePassword/ChangePasswordPage'
import RegistrationPage from './components/pages/registration/RegistrationPage'
import LoginPage from './components/pages/login/LoginPage'
import {
    LOGIN_ROUTE,
    REGISTRATION_ROUTE,
    CHANGE_PASSWORD_ROUTE,
    WRONG_PAGE
} from './utils/consts'


export const noneAuthRoutes = [
    {
        path: LOGIN_ROUTE,
        Component: <LoginPage/>
    },
    {
        path: REGISTRATION_ROUTE,
        Component: <RegistrationPage/>
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
        Component: <ChangePasswordPage/>
    },
    {
        path: WRONG_PAGE,
        Component: <>Данная страница недоступна</>
    }
]
