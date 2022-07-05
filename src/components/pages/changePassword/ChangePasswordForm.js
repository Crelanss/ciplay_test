import React, {useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'

import {LOGIN_ROUTE} from '../../../utils/consts'
import {changePassword} from '../../../reduxStore/slices/appSlice'


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

        oldPasswordCheck = inputs.oldPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
        setOldPasswordValid(oldPasswordCheck ? '' : 'Неверный формат пароля')

        newPasswordCheck = inputs.newPassword.match(/^(?=.*[A-Z])(.{4,10})$/)
        setNewPasswordValid(newPasswordCheck ? '' : 'Неверный формат пароля')

        repeatPasswordCheck = inputs.newPassword === inputs.repeatPassword
        setRepeatPasswordValid(repeatPasswordCheck ? '' : 'Пароли не совпадают')

        if (newPasswordCheck && repeatPasswordCheck && oldPasswordCheck) {
            dispatch(changePassword({
                oldPassword: inputs.oldPassword,
                newPassword: inputs.newPassword,
            }))
                .unwrap()
                .then(
                    () => {
                        navigate(LOGIN_ROUTE)
                    },
                    () => {
                    }
                )
        }
    }

    return (
        <>
            <Input
                placeholder="Old password"
                value={inputs.oldPassword}
                type="password"
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
                placeholder="New password"
                type="password"
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
                placeholder="Repeat password"
                type="password"
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
            <ChangePasswordButton onClick={() => {
                validate()
            }}>Сменить пароль!</ChangePasswordButton>
        </>
    )
}

export default ChangePasswordForm
