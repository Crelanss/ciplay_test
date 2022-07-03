import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {LOGIN_ROUTE} from '../../../utils/consts'
import {createUser, setIsLoading} from '../../../reduxStore/slices/appSlice'


const Input = styled.input`
  width: 90%;
  height: 30px;
  margin-top: 10px;
`

const RegisterButton = styled.div`
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

const RegistrationForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(state => state.app.users)
    const isLoading = useSelector(state => state.app.isLoading)
    const [emailValid, setEmailValid] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [repeatPasswordValid, setRepeatPasswordValid] = useState('')
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        repeatPassword: ''
    })

    const validate = () => {
        let emailCheck
        let passwordCheck
        let repeatPasswordCheck
        let isEmailExists = false

        dispatch(setIsLoading(true))

        setTimeout(() => {
            emailCheck = inputs.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            users.forEach(u => {
                if (u.email === inputs.registerEmail) {
                    isEmailExists = true
                }
            })
            setEmailValid(emailCheck ? isEmailExists ? 'Эта почта занята' : '' : 'Неверно введена почта')

            passwordCheck = inputs.password.match(/^(?=.*[A-Z])(.{4,10})$/)
            setPasswordValid(passwordCheck ? '' : 'Неверный формат пароля')

            repeatPasswordCheck = inputs.password === inputs.repeatPassword
            setRepeatPasswordValid(repeatPasswordCheck ? '' : 'Пароли не совпадают')

            if (emailCheck && passwordCheck && repeatPasswordCheck && !isEmailExists) {
                dispatch(createUser({
                    email: inputs.email,
                    password: inputs.password
                }))
                alert('Пользователь зарегистрирован')
                navigate(LOGIN_ROUTE)
            }

            dispatch(setIsLoading(false))
        }, 1000)
    }

    return (
        <>
            <Input
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        email: e.target.value
                    })
                    setEmailValid('')
                }}
            />
            <span>{emailValid}</span>
            <Input
                placeholder="Password"
                name="password"
                type="password"
                value={inputs.password}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        password: e.target.value,
                    })
                    setPasswordValid('')
                }}
            />
            <span>{passwordValid}</span>
            <Input
                placeholder="Repeat password"
                name="repeat_password"
                type="password"
                value={inputs.repeatPassword}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        repeatPassword: e.target.value,
                    })
                    setRepeatPasswordValid('')
                }}
            />
            <span>{repeatPasswordValid}</span>
            <RegisterButton onClick={() => validate()}>
                <span>Зарегистрироваться!</span>
            </RegisterButton>
            {isLoading && <>Загрузка....</>}
        </>
    )
}

export default RegistrationForm
