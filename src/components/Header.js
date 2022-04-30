import React, {useContext, useState} from 'react'
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'

import {Context} from '../index'
import {CHANGE_PASSWORD_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from '../utils/consts'


const Container = styled.div`
  width: 100%;
  height: 70px;
  background: gray;
  position: relative;
  display: flex;
  align-items: center;
  padding-right: 30px;
  padding-left: 30px;
  box-sizing: border-box;
`

const NavButton = styled.div`
  height: 60%;
  border: .5px solid white;
  border-radius: 4px;
  margin-left: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  padding-right: 3px;
  cursor: pointer;
  
  &:hover {
    span {
      color: white;
    }
  }
`

const Menu = styled.div`
  position: absolute;
  height: 120px;
  width: 150px;
  top: 70px;
  right: 10px;
  display: ${props => props.isOpen ? 'flex' : 'none'};
  background: gray;
  border: 1px solid black;
  
  ul {
    padding: 0;
    li {
      list-style: none; 
      margin-top: 10px;
      border-bottom: 1px solid white;
      cursor: pointer;
    }
  }
`

const ExitButton = styled.div`
  height: 60%;
  border: .5px solid white;
  border-radius: 4px;
  margin-right: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 3px;
  padding-right: 3px;
  cursor: pointer;

  &:hover {
    span {
      color: white;
    }
  }
`

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const exitHandler = () => {
        user.setUserCredentials({
            email: '',
            password: ''
        })
        user.setIsAuth(false)
        navigate(REGISTRATION_ROUTE)
    }

    return (
        <Container>
            {user.isAuth && <ExitButton onClick={() => {exitHandler()}}>Выйти</ExitButton>}
            <NavButton onClick={() => {setIsOpen(!isOpen)}}>
                <span>Навигация</span>
            </NavButton>
            <Menu isOpen={isOpen}>
                <ul>
                    {!user.isAuth && <li onClick={() => {navigate(LOGIN_ROUTE)}}>Логин</li>}
                    {!user.isAuth && <li onClick={() => {navigate(REGISTRATION_ROUTE)}}>Регистрация</li>}
                    {user.isAuth && <li onClick={() => {navigate(CHANGE_PASSWORD_ROUTE)}}>Смена пароля</li>}
                </ul>
            </Menu>
        </Container>
    );
};

export default Header;