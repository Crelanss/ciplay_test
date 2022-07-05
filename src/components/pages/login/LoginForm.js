import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {CHANGE_PASSWORD_ROUTE} from '../../../utils/consts'
import {loginUser} from '../../../reduxStore/slices/appSlice'


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
    const [emailValid, setEmailValid] = useState('')
    const [passwordValid, setPasswordValid] = useState('')
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
    })

    const validate = () => {
        let emailCheck
        let passwordCheck

        emailCheck = inputs.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)

        setEmailValid(emailCheck ? '' : 'Неверный формат почти')

        passwordCheck = inputs.password.match(/^(?=.*[A-Z])(.{4,10})$/)
        setPasswordValid(passwordCheck ? '' : 'Неверный формат пароля')

        if (emailCheck && passwordCheck) {
            dispatch(loginUser({
                email: inputs.email,
                password: inputs.password
            }))
                .unwrap()
                .then(
                    () => {
                        navigate(CHANGE_PASSWORD_ROUTE)
                    },
                    () => {
                    }
                )
        }
    }

    return (
        <>
            <Input
                placeholder="Email"
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
                placeholder="Password"
                type="password"
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
            <LoginButton onClick={() => {
                validate()
            }}>Войти</LoginButton>
        </>
    )
}

export default LoginForm
