import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {LOGIN_ROUTE} from '../../../utils/consts'
import {setUserCredentials, setIsLoading, setIsAuth, changePassword} from '../../../reduxStore/slices/appSlice'


const Input = styled.input`
  width: 90%;
  height: 30px;
  margin-top: 10px;
`

const ChangePasswordButton = styled.div`
  width: 90%;
  height: 30px;
  background: darkslategray;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  
  span {
    color: white;
    font-size: 16px;
  }
`

const ChangePasswordForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isLoading = useSelector(state => state.app.isLoading)
    const userCredentials = useSelector(state => state.app.userCredentials)
    const users = useSelector(state => state.app.users)
    const [oldPasswordValid, setOldPasswordValid] = useState('')
    const [newPasswordValid, setNewPasswordValid] = useState('')
    const [repeatPasswordValid, setRepeatPasswordValid] = useState('')
    const [inputs, setInputs] = useState({
        oldPassword: '',
        newPassword: '',
        repeatPassword: ''
    })

    const validate = () => {
        let oldPasswordCheck
        let newPasswordCheck
        let repeatPasswordCheck
        let passwordsEqual

        dispatch(setIsLoading(true))

        setTimeout(() => {
            passwordsEqual = userCredentials.password === inputs.oldPassword

            oldPasswordCheck = inputs.oldPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setOldPasswordValid(oldPasswordCheck ? passwordsEqual ? '' : 'Пароли не совпадают' : 'Неверный формат пароля')

            newPasswordCheck = inputs.newPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setNewPasswordValid(newPasswordCheck ? '' : 'Неверный формат пароля')

            repeatPasswordCheck = inputs.newPassword === inputs.repeatPassword
            setRepeatPasswordValid(repeatPasswordCheck ? '' : 'Пароли не совпадают')

            if(newPasswordCheck && repeatPasswordCheck && passwordsEqual) {
                users.forEach(u => {
                    if(u.email === userCredentials.email) {
                        dispatch(changePassword({
                            email: u.email,
                            password: inputs.newPassword
                        }))
                        dispatch(setIsAuth(false))
                        dispatch(setUserCredentials({
                            email: '',
                            password: ''
                        }))
                        navigate(LOGIN_ROUTE)
                        alert('Пароль сменен, войдите в систему заново')
                    }
                })
            }

            dispatch(setIsLoading(false))
        }, 1000)

    }

    return (
        <>
            <Input
                placeholder='Old password'
                value={inputs.oldPassword}
                type='password'
                onChange={e => {
                    setInputs({
                        ...inputs,
                        oldPassword: e.target.value
                    })
                    setOldPasswordValid('')
                }}
            />
            <span>{oldPasswordValid}</span>
            <Input
                placeholder='New password'
                type='password'
                value={inputs.newPassword}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        newPassword: e.target.value
                    })
                    setNewPasswordValid('')
                }}
            />
            <span>{newPasswordValid}</span>
            <Input
                placeholder='Repeat password'
                type='password'
                value={inputs.repeatPassword}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        repeatPassword: e.target.value
                    })
                    setRepeatPasswordValid('')
                }}
            />
            <span>{repeatPasswordValid}</span>
            <ChangePasswordButton onClick={() => {validate()}}>Сменить пароль!</ChangePasswordButton>
            {isLoading && <>Загрузка...</>}
        </>
    )
}

export default ChangePasswordForm;
