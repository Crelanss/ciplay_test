import {createSlice} from '@reduxjs/toolkit'

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
        createUser: (state, action) => {
            state.users.push(action.payload)
        },
        setIsLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        },
        changePassword: (state, action) => {
            state.users = state.users.map(u => {
                if(u.email === action.payload.email) {
                    return {
                        ...u,
                        password: action.payload.password
                    }
                } else return u
            })
        }
    }
})

export const {setUserCredentials, createUser, setIsLoading, setIsAuth, changePassword} = appSlice.actions

export default appSlice.reducer
