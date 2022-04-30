import {makeAutoObservable} from 'mobx'

export default class InputStore {
    constructor() {
        this._registerEmail = ''
        this._registerPassword = ''
        this._registerRepeatPassword = ''
        this._loginEmail = ''
        this._loginPassword = ''
        this._changePasswordOldPassword = ''
        this._changePasswordNewPassword = ''
        this._changePasswordRepeatPassword = ''
        makeAutoObservable(this)
    }

    get registerEmail() {
        return this._registerEmail
    }

    get registerPassword() {
        return this._registerPassword
    }

    get registerRepeatPassword() {
        return this._registerRepeatPassword
    }

    get loginEmail() {
        return this._loginEmail
    }

    get loginPassword() {
        return this._loginPassword
    }

    get changePasswordOldPassword() {
        return this._changePasswordOldPassword
    }

    get changePasswordNewPassword() {
        return this._changePasswordNewPassword
    }

    get changePasswordRepeatPassword() {
        return this._changePasswordRepeatPassword
    }

    setRegisterEmail(email) {
        this._registerEmail = email
    }

    setRegisterPassword(password) {
        this._registerPassword = password
    }

    setRegisterRepeatPassword(password) {
        this._registerRepeatPassword = password
    }

    setLoginEmail(email) {
        this._loginEmail = email
    }

    setLoginPassword(password) {
        this._loginPassword = password
    }

    setChangePasswordOldPassword(password) {
        this._changePasswordOldPassword = password
    }

    setChangePasswordNewPassword(password) {
        this._changePasswordNewPassword = password
    }

    setChangePasswordRepeatPassword(password) {
        this._changePasswordRepeatPassword = password
    }
}