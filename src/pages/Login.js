import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react'
import {useNavigate} from 'react-router-dom'

import {Context} from '../index'
import {CHANGE_PASSWORD_ROUTE} from '../utils/consts'


const Container = styled.div`
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  height: 400px;
  width: 300px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  span {
    color: red;
    font-size: 10px;
  }
`

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

const Login = observer(() => {
    const {user, inputs} = useContext(Context)
    const [emailValid, setEmailValid] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const navigate = useNavigate()

    const validate = () => {
        let emailCheck
        let passwordCheck
        let passwordCorrect = false
        let isEmailExists = false

        user.setIsLoading(true)

        setTimeout(() => {
            emailCheck = inputs.registerEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            user.users.forEach(u => {
                if (u.email === inputs.loginEmail) {
                    isEmailExists = true
                    if(u.password === inputs.loginPassword) {
                        passwordCorrect = true
                    }
                }
            })
            setEmailValid(emailCheck ? isEmailExists ? '' : 'Пользователя с такой почтой не существует' : 'Неверно введена почта')

            passwordCheck = inputs.registerPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setPasswordValid(passwordCheck ? passwordCorrect ? '' : 'Неверно введен пароль' : 'Неверный формат пароля')

            if(passwordCorrect) {
                user.setUserCredentials(inputs.loginEmail, inputs.loginPassword)
                user.setIsAuth(true)
                alert('Успешная авторизация')
                navigate(CHANGE_PASSWORD_ROUTE)
            }

            user.setIsLoading(false)
        }, 1000)

    }

    return (
        <Container>
            <Input
                placeholder='Email'
                value={inputs.loginEmail}
                onChange={e => {
                    inputs.setLoginEmail(e.target.value)
                    setPasswordValid('')
                }}
            />
            <span>{emailValid}</span>
            <Input
                placeholder='Password'
                type='password'
                value={inputs.loginPassword}
                onChange={e => {
                    inputs.setLoginPassword(e.target.value)
                    setPasswordValid('')
                }}
            />
            <span>{passwordValid}</span>
            <LoginButton onClick={() => {validate()}}>Войти</LoginButton>
            {user.isLoading && <>Загрузка...</>}
        </Container>
    )
})

export default Login;