import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {CHANGE_PASSWORD_ROUTE} from '../../../utils/consts'
import {setUserCredentials, setIsLoading, setIsAuth} from '../../../reduxStore/slices/appSlice'


const Input = styled.input`
  width: 90%;
  height: 30px;
  margin-top: 10px;
`

const LoginButton = styled.div`
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

const LoginForm = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const users = useSelector(state => state.app.users)
    const isAuth = useSelector(state => state.app.isAuth)
    const isLoading = useSelector(state => state.app.isLoading)
    const [emailValid, setEmailValid] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const validate = () => {
        console.log(users)
        let emailCheck
        let passwordCheck
        let passwordCorrect = false
        let isEmailExists = false

        dispatch(setIsLoading(true))

        setTimeout(() => {
            emailCheck = inputs.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            users.forEach(u => {
                if (u.email === inputs.email) {
                    isEmailExists = true
                    console.log(isEmailExists)
                    if(u.password === inputs.password) {
                        passwordCorrect = true
                    }
                }
            })
            setEmailValid(emailCheck ? isEmailExists ? '' : 'Пользователя с такой почтой не существует' : 'Неверно введена почта')

            passwordCheck = inputs.password.match(/^(?=.*[A-Z])(.{4,10})$/)
            setPasswordValid(passwordCheck ? passwordCorrect ? '' : 'Неверно введен пароль' : 'Неверный формат пароля')

            if(passwordCorrect) {
                dispatch(setUserCredentials({
                    email: inputs.email,
                    password: inputs.password
                }))
                dispatch(setIsAuth(true))
                alert('Успешная авторизация')
                navigate(CHANGE_PASSWORD_ROUTE)
                console.log(isAuth)
            }

            dispatch(setIsLoading(false))
        }, 1000)

    }

    return (
        <>
            <Input
                placeholder='Email'
                value={inputs.email}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        email: e.target.value
                    })
                    setPasswordValid('')
                }}
            />
            <span>{emailValid}</span>
            <Input
                placeholder='Password'
                type='password'
                value={inputs.password}
                onChange={e => {
                    setInputs({
                        ...inputs,
                        password: e.target.value
                    })
                    setPasswordValid('')
                }}
            />
            <span>{passwordValid}</span>
            <LoginButton onClick={() => {validate()}}>Войти</LoginButton>
            {isLoading && <>Загрузка...</>}
        </>
    )
}

export default LoginForm;
