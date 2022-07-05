import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {checkUser, authorizeUser, checkChangePassword} from '../../utils/userActions'

export const registerUser = createAsyncThunk(
    'app/registerUser',
    async ({email, password}, {getState}) => {
        const {users} = getState().app

        return await checkUser(email, password, users)
    }
)

export const loginUser = createAsyncThunk(
    'app/loginUser',
    async ({email, password}, {getState}) => {
        const {users} = getState().app

        return await authorizeUser(email, password, users)
    }
)

export const changePassword = createAsyncThunk(
    'app/changePassword',
    async ({oldPassword, newPassword}, {getState}) => {
        const {userCredentials} = getState().app

        return await checkChangePassword(oldPassword, newPassword, userCredentials)
    }
)


export const appSlice = createSlice({
    name: 'app',
    initialState: {
        isAuth: false,
        users: [],
        isLoading: false,
        userCredentials: {}
    },
    reducers: {
        setUserCredentials: (state, action) => {
            state.userCredentials = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    },
    extraReducers: {
        [registerUser.pending]: (state) => {
            state.isLoading = true
        },
        [registerUser.fulfilled]: (state, action) => {
            state.users.push(action.payload)
            state.isLoading = false
            alert('Пользователь добавлен')
        },
        [registerUser.rejected]: (state, action) => {
            state.isLoading = false
            alert(action.error.message)
        },

        [loginUser.pending]: (state) => {
            state.isLoading = true
        },
        [loginUser.fulfilled]: (state, action) => {
            state.userCredentials = action.payload
            state.isAuth = true
            state.isLoading = false
            alert('Успешная авторизация')
        },
        [loginUser.rejected]: (state, action) => {
            state.isLoading = false
            alert(action.error.message)
        },

        [changePassword.pending]: (state) => {
            state.isLoading = true
        },
        [changePassword.fulfilled]: (state, action) => {
            state.users = state.users.map(u => {
                if (u.email === state.userCredentials.email) {
                    return {
                        ...u,
                        password: action.payload
                    }
                } else return u
            })
            state.userCredentials = {
                email: '',
                password: ''
            }
            state.isAuth = false
            state.isLoading = false
            alert('Пароль сменен, войдите в систему')
        },
        [changePassword.rejected]: (state, action) => {
            state.isLoading = false
            alert(action.error.message)
        }
    }
})

export const {setUserCredentials, setIsAuth} = appSlice.actions

export default appSlice.reducer
