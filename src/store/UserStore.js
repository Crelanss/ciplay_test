import {makeAutoObservable} from 'mobx'

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._users = []
        this._isLoading = false
        this._userCredentials = {}
        makeAutoObservable(this)
    }

    get isAuth() {
        return this._isAuth
    }

    get isLoading() {
        return this._isLoading
    }

    get users() {
        return this._users
    }

    get userCredentials() {
        return this._userCredentials
    }

    setUserCredentials(email, password) {
        this._userCredentials = {
            email: email,
            password: password
        }
    }

    setNewUser(email, password) {
        this._users.push({
            email: email,
            password: password
        })
    }

    setIsLoading(value) {
        this._isLoading = value
    }

    setIsAuth(value) {
        this._isAuth = value
    }
}