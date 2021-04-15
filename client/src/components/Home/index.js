import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAdmin } from '../../config/Auth'
import BDreq from '../../config/axios'
import Header from '../Header/index'
import Main from '../Main/index'
import './index.css'

export default function Home() {
	
	let history = useHistory()
	let CWdata = JSON.parse(localStorage.getItem('CWdata'))
	let token = 'bearer '+CWdata.token

	const [ reservas, setReservas ] = useState('')
	const [ projetos, setProjetos ] = useState('')
	const [ usuarios, setUsuarios ] = useState('')

	const usu = () => {
		BDreq.get('/users/', { headers: { 'Authorization': token} })
		.then(response => setUsuarios(response.data.name))
		.catch(error => { if (error) console.log(error) })
	}

	useEffect(() => {

		BDreq.get('/reservations',
		{
			headers: { 'Authorization': `bearer  ${CWdata.token}`}
		})
		.then(response => {
			let campos = response.data.map(linha => (<tr key={linha.id}>
					<td>{linha.description}</td>
					<td>{linha.dateTime}</td>
					<td>{linha.duration} min</td>
					<td>{linha.activity}</td>
					<td>{linha.projectName}</td>
					<td>{linha.userName}</td>
				</tr>
			))
			setReservas(campos)
		})
		.catch(error => {
			if (error) console.log(error)
		})

	},[])
		
	const logout = () => {
			localStorage.removeItem('CWdata', '')
			history.push('/login')
	}
	
	const admin = () => {
		if (isAdmin()) history.push('/painel-admin')
	}

	return (
		<>
			<Header>
				<nav>
					{CWdata.admin ? <Link onClick={admin}>Painel de administrador</Link> : null}
					<Link to="/cadastro-usuarios">Cadastrar</Link>
					<Link onClick={logout}>Sair</Link>
				</nav>
			</Header>
			<Main>
				<h2> Página inicial</h2>
				<div id="home-page">
					<nav>
					</nav>

					<div id="table-reservas">
						<table>
							<thead>
								<tr>
									<th>Descrição</th>
									<th>Início</th>
									<th>Duração</th>
									<th>Atividade</th>
									<th>Projeto</th>
									<th>Membros</th>
								</tr>
							</thead>
							<tbody>
								{reservas}
							</tbody>
						</table>
					</div>
				</div>
			</Main>
		</>
	)

}