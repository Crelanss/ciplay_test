import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {observer} from 'mobx-react'
import {useNavigate} from 'react-router-dom'

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

const ChangePassword = observer(() => {
    const {user, inputs} = useContext(Context)
    const navigate = useNavigate()
    const [oldPasswordValid, setOldPasswordValid] = useState('')
    const [newPasswordValid, setNewPasswordValid] = useState('')
    const [repeatPasswordValid, setRepeatPasswordValid] = useState('')

    const validate = () => {
        let oldPasswordCheck
        let newPasswordCheck
        let repeatPasswordCheck
        let passwordsEqual

        user.setIsLoading(true)

        setTimeout(() => {
            passwordsEqual = user.userCredentials.password === inputs.changePasswordOldPassword

            oldPasswordCheck = inputs.changePasswordOldPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setOldPasswordValid(oldPasswordCheck ? passwordsEqual ? '' : 'Пароли не совпадают' : 'Неверный формат пароля')

            newPasswordCheck = inputs.changePasswordNewPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
            setNewPasswordValid(newPasswordCheck ? '' : 'Неверный формат пароля')

            repeatPasswordCheck = inputs.changePasswordNewPassword === inputs.changePasswordRepeatPassword
            setRepeatPasswordValid(repeatPasswordCheck ? '' : 'Пароли не совпадают')

            if(newPasswordCheck && repeatPasswordCheck && passwordsEqual) {
                user.users.forEach(u => {
                    if(u.email === user.userCredentials.email) {
                        u.password = inputs.changePasswordNewPassword
                        user.setIsAuth(false)
                        user.setUserCredentials({
                            email: '',
                            password: ''
                        })
                        navigate(LOGIN_ROUTE)
                        alert('Пароль сменен, войдите в систему заново')
                    }
                })
            }

            user.setIsLoading(false)
        }, 1000)

    }

    return (
        <Container>
            <Input
                placeholder='Old password'
                value={inputs.changePasswordOldPassword}
                type='password'
                onChange={e => {
                    inputs.setChangePasswordOldPassword(e.target.value)
                    setOldPasswordValid('')
                }}
            />
            <span>{oldPasswordValid}</span>
            <Input
                placeholder='New password'
                type='password'
                value={inputs.changePasswordNewPassword}
                onChange={e => {
                    inputs.setChangePasswordNewPassword(e.target.value)
                    setNewPasswordValid('')
                }}
            />
            <span>{newPasswordValid}</span>
            <Input
                placeholder='Repeat password'
                type='password'
                value={inputs.changePasswordRepeatPassword}
                onChange={e => {
                    inputs.setChangePasswordRepeatPassword(e.target.value)
                    setRepeatPasswordValid('')
                }}
            />
            <span>{repeatPasswordValid}</span>
            <ChangePasswordButton onClick={() => {validate()}}>Сменить пароль!</ChangePasswordButton>
            {user.isLoading && <>Загрузка...</>}
        </Container>
    )
})

export default ChangePassword;