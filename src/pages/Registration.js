import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react'
import {useNavigate} from 'react-router-dom'
import {toJS} from 'mobx'

import {Context} from '../index'
import {LOGIN_ROUTE} from '../utils/consts'


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

const Registration = observer(() => {
    const navigate = useNavigate()
    const {inputs, user} = useContext(Context)
    const [emailValid, setEmailValid] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [repeatPasswordValid, setRepeatPasswordValid] = useState('')

    const validate = () => {
        let emailCheck
        let passwordCheck
        let repeatPasswordCheck
        let isEmailExists = false

        user.setIsLoading(true)

        setTimeout( () => {
            emailCheck = inputs.registerEmail.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
            user.users.forEach(u => {
                if (u.email === inputs.registerEmail) {
                    isEmailExists = true
                }
            })
            setEmailValid(emailCheck ? isEmailExists ? 'Эта почта занята' : '' : 'Неверно введена почта')

            passwordCheck = inputs.registerPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setPasswordValid(passwordCheck ? '' : 'Неверный формат пароля')

            repeatPasswordCheck = inputs.registerPassword === inputs.registerRepeatPassword
            setRepeatPasswordValid(repeatPasswordCheck ? '' : 'Пароли не совпадают')

            if (emailCheck && passwordCheck && repeatPasswordCheck && !isEmailExists) {
                user.setNewUser(toJS(inputs.registerEmail), toJS(inputs.registerPassword))
                alert('Пользователь зарегистрирован')
                navigate(LOGIN_ROUTE)
            }

            user.setIsLoading(false)
        }, 1000)
    }

    return (
        <Container>
            <Input
                placeholder='Email'
                name='email'
                value={inputs.registerEmail}
                onChange={e => {
                    inputs.setRegisterEmail(e.target.value)
                    setEmailValid('')
                }}
            />
            <span>{emailValid}</span>
            <Input
                placeholder='Password'
                name='password'
                type='password'
                value={inputs.registerPassword}
                onChange={e => {
                    inputs.setRegisterPassword(e.target.value)
                    setPasswordValid('')
                }}
            />
            <span>{passwordValid}</span>
            <Input
                placeholder='Repeat password'
                name='repeat_password'
                type='password'
                value={inputs.registerRepeatPassword}
                onChange={e => {
                    inputs.setRegisterRepeatPassword(e.target.value)
                    setRepeatPasswordValid('')
                }}
            />
            <span>{repeatPasswordValid}</span>
            <RegisterButton onClick={() => validate()}>
                <span>Зарегистрироваться!</span>
            </RegisterButton>
            {user.isLoading && <>Загрузка....</>}
        </Container>
    )
})

export default Registration;