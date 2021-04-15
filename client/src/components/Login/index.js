import React, { useState } from 'react'
import BDreq from '../../config/axios'
import { Link, useHistory } from 'react-router-dom'
import Header from '../Header/index'
import Main from '../Main/index'
import brasaoUFC from '../../assets/brasao.png'
import './index.css'

export default function Login() {

	let history = useHistory()
	document.title = "Coworking"

	const [ email, setEmail ] = useState()
	const [ password, setPassword ] = useState()
	const [ msg, setMsg ] = useState()

	if (localStorage.getItem('CWdata'))
		history.push('/')

	const login = (event) => {
		event.preventDefault()
		
		BDreq.post('/signin', {
			email: email,
			password: password
		})
		.then(response => {
			localStorage.setItem('CWdata', JSON.stringify(response.data))
			if (response) history.push('/')
		}).catch(error => {
			if (error.response) setMsg(error.response.data)
		})
	}

	return (
		<>
			<Header>
			</Header>
			<Main>
				<img src={brasaoUFC} width="260" />
				<h2>Login</h2>
				<form id="form-login">
					<label htmlFor="email"><input id="email" type="email" onChange={(event) => setEmail(event.target.value)} placeholder="Email" /></label>
					<label htmlFor="password"><input id="password" type="password" onChange={(event) => setPassword(event.target.value)} placeholder="Senha" /></label>
					<button id="login-login" onClick={login}>Entrar</button>
					<Link to="cadastro-usuarios">Não possui registro? Cadastre-se</Link>
					{msg ? <div id="msg-login">{msg}</div> : null}
				</form>
			</Main>
		</>
	)

}