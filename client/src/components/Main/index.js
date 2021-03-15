import React, { useState } from 'react'
import {
		BrowserRouter as Router,
		Switch,
		Route,
		Link
	} from 'react-router-dom'
import './index.css'

export default function Main() {
	
	const [gerentes, setGerentes] = useState('')

	const chama = () => {
		const axios = require('axios')

		axios.get('http://localhost:3003/db/system/managers')
			.then((response) => {
				let campos = response.data
				setGerentes('')
				let tudo = campos.map((campo) => {
					return (
						<tr key={campo.id}>
							<td>{campo.id}</td>
							<td>{campo.nome}</td>
							<td>{campo.email}</td>
						</tr>
					)
				})
				setGerentes(tudo)
			})
			.catch((error) => {
				console.log(error)
			})

	}

	return (
		<Router>
			<main className="main">
				<button onClick={chama}>
					<Link to='/gerentes'>Exibir gerentes</Link>
				</button>
				<button onClick={chama}>
					<Link to='/gerentes/editar'>Editar gerente</Link>
				</button>
				<button onClick={chama}>
					<Link to='/gerentes/excluir'>Excluir gerente</Link>
				</button>
				<button onClick={chama}>
					<Link to='/gerentes/inserir'>Inserir gerente</Link>
				</button>
				<Switch>
					<Route path='/gerentes' exact>
					<table>
						<th>ID</th>
						<th>Nome</th>
						<th>Email</th>
						{gerentes}
					</table>
					</Route>
					<Route path='/gerentes/editar'>
						<table>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
							{gerentes}
						</table>
						<EditarGerentes />
					</Route>
					<Route path='/gerentes/excluir'>
						<table>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
							{gerentes}
						</table>
						<ExcluirGerentes />
					</Route>
					<Route path='/gerentes/inserir'>
						<InserirGerentes />
					</Route>
				</Switch>
			</main>
		</Router>
	)

}

function EditarGerentes() {
	const [id, setID] = useState('')
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const editaGerente = () => {
		const axios = require('axios')
		const data = ({
			nome: nome,
			email: email
		})
		axios.put(`http://localhost:3003/db/system/managers/${id}`, data)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<div className="inserir">
			<input name="nome" type="text" onChange={event => setID(event.target.value)} placeholder="id" value={id} />
			<input name="nome" type="text" onChange={event => setNome(event.target.value)} placeholder="nome" value={nome} />
			<input name="email" type="text" onChange={event => setEmail(event.target.value)} placeholder="email"  value={email} />
			<button onClick={editaGerente}>Inserir</button>
		</div>
	)
}

function ExcluirGerentes() {
	const [id, setID] = useState('')
	const excluiGerente = () => {
		const axios = require('axios')
		axios.delete(`http://localhost:3003/db/system/managers/${id}`)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<div className="excluir">
			<input name="nome" type="text" onChange={event => setID(event.target.value)} placeholder="id" value={id} />
			<button onClick={excluiGerente(id)}>Excluir</button>
		</div>
	)
}

function InserirGerentes() {
	const [nome, setNome] = useState('')
	const [email, setEmail] = useState('')
	const insereGerente = () => {
		const axios = require('axios')
		const data = ({
			nome: nome,
			email: email
		})
		axios.post('http://localhost:3003/db/system/managers/', data)
			.then((response) => {
				console.log(response)
			})
			.catch((error) => {
				console.log(error)
			})
	}
	return (
		<div className="inserir">
			<input name="nome" type="text" onChange={event => setNome(event.target.value)} placeholder="nome" value={nome} />
			<input name="email" type="text" onChange={event => setEmail(event.target.value)} placeholder="email"  value={email} />
			<button onClick={insereGerente}>Inserir</button>
		</div>
	)
}