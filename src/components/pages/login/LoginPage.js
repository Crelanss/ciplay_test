import React from 'react'
import styled from 'styled-components'

import LoginForm from './LoginForm'


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

const LoginPage = () => {
    return (
        <Container>
            <LoginForm/>
        </Container>
    )
}

export default LoginPage
