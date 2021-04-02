import React, { useState } from 'react'
import {
		BrowserRouter as Router,
		Switch,
		Route,
		Link
	} from 'react-router-dom'
import './index.css'

export default function Main() {

	const chama = () => {
		const axios = require('axios')

		axios.post('http://localhost:5000/signin',
			{
				email: "tester@email.com",
				password: "1234"
			})
			.then((response) => {
				console.log(response.data)
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
					</table>
					</Route>
					<Route path='/gerentes/editar'>
						<table>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
						</table>
						Editar usuários
					</Route>
					<Route path='/gerentes/excluir'>
						<table>
							<th>ID</th>
							<th>Nome</th>
							<th>Email</th>
						</table>
						Excluir usuários
					</Route>
					<Route path='/gerentes/inserir'>
						Inserir usuários
					</Route>
				</Switch>
			</main>
		</Router>
	)

}