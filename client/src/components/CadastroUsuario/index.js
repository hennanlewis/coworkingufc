import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import BDreq from '../../config/axios'
import { isAuthenticated } from '../../config/Auth'
import Header from '../Header/index'
import Main from '../Main/index'
import './index.css'

export default function Cadastro() {
	
	const [ nome, setNome ] = useState('')
	const [ email, setEmail ] = useState('')
	const [ curso, setCurso ] = useState('')
	const [ senha, setSenha ] = useState('')
	const [ senhaCheck, setSenhaCheck ] = useState('')
	const [ msg, setMsg ] = useState('')
	const [ msgErro, setMsgErro ] = useState('')

	let history = useHistory()

	const cadastra = (event) => {

		event.preventDefault()

		BDreq.post('signup',
			{
				name: nome,
				email: email,
				curso: curso,
				password: senha,
				confirmPassword: senhaCheck
			}
		)
		.then(response => {
			setMsg('Usuário cadastrado com sucesso!')
			setMsgErro('')
			
		}).catch(error => {
			setMsg('')
			setMsgErro(error.response.data)
		})

	}

	const logout = () => {
		localStorage.removeItem('CWdata', '')
		history.push('/login')
	}

	return (
		<>
			<Header>
				<nav>
					{!isAuthenticated() ? <Link to="/login">Página de Login</Link> : null}
					{isAuthenticated() ? <Link to="/login">Página principal</Link> :null}
					{isAuthenticated() ? <Link onClick={logout} >Sair</Link> :null}
				</nav>
			</Header>
			<Main>
				<h2>Cadastro</h2>
				<form id="form-cadastro">
					<label htmlFor="nome"><input id="nome" type="text" onChange={event => setNome(event.target.value)} placeholder="Nome" /></label>
					<label htmlFor="email"><input id="email" type="email" onChange={event => setEmail(event.target.value)} placeholder="Email" /></label>
					<label htmlFor="curso"><input id="curso" type="text" onChange={event => setCurso(event.target.value)} placeholder="Curso" /></label>
					<label htmlFor="senha"><input id="senha" type="password" onChange={event => setSenha(event.target.value)} placeholder="Senha" /></label>
					<label htmlFor="senhaCheck"><input id="senhaCheck" type="password" onChange={event => setSenhaCheck(event.target.value)} placeholder="Confirmar senha" /></label>
					<button id="cadastro-cadastro" onClick={cadastra}>Cadastrar usuário</button>
				</form>
				{msg ? <div id="msg">{msg}</div> : null}
				{msgErro ? <div id="msgErro">{msgErro}</div> : null}
			</Main>
		</>
	)
}