import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import BDreq from '../../config/axios'
import Header from '../Header/index'
import Main from '../Main/index'
import './index.css'

export default function Dashboard() {

	let history = useHistory()
	let CWdata = JSON.parse(localStorage.getItem('CWdata'))

	const logout = () => {
		localStorage.removeItem('CWdata')
		history.push('/login')
	}

	const home = () => history.push('/')
	const cadastra = () => history.push('/cadastro-usuarios')

	const [ reqUsers, setReqUsers ] = useState('')
	let corpoTabela = (
		<tr>
			<td>--</td>
			<td>---</td>
			<td>---</td>
			<td className="tableCenter">--</td>
			<td>--</td>
		</tr>)

	useEffect(() => {
		BDreq.get('users',
		{
			headers: { 'Authorization': `bearer  ${CWdata.token}`}
		})
		.then((response) => {
			let campos = response.data.map(linha => (
				<tr key={linha.id}>
					<td>{linha.name}</td>
					<td>{linha.email}</td>
					<td>{linha.curso}</td>
					<td className='table-dashboard'>{linha.admin ? 'Sim' : 'Não'}</td>
					<td className='table-dashboard'>A B</td>
				</tr>
			))
			setReqUsers(campos)
		})
		.catch((error) => {
			console.log(error)
		})
	},[])

	return (
		<>
			<Header>
				<nav id="botoes-dashboard">
					<Link to="/">Página principal</Link>
					<Link to="cadastro-usuarios">Cadastrar</Link>
					<Link onClick={logout}>Sair</Link>
				</nav>
			</Header>
			<Main>
				<h2>Painel de Administrador</h2>
				<div id="table-dashboard">
					<table>
						<thead>
							<tr>
								<th>Nome</th>
								<th>Email</th>
								<th>Curso</th>
								<th>Admin</th>
								<th>Ação</th>
							</tr>
						</thead>
						<tbody>
							{!reqUsers ? corpoTabela : reqUsers}
						</tbody>
					</table>
				</div>
			</Main>
		</>
	)
}