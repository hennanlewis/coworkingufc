import { isAdmin, isAuthenticated } from './config/Auth' 
import Login from './components/Login/index'
import Home from './components/Home/index'
import CadastroUsuario from './components/CadastroUsuario/index'
import Dashboard from './components/PainelAdmin/index'
import Header from './components/Header/index'
import Main from './components/Main/index'
import { 
	Route,
	Switch,
	BrowserRouter,
	Redirect
} from 'react-router-dom';

export default function App() {
	document.title = "Coworking"

	return (
		<BrowserRouter>
			<Switch>
				<Route path="/login">
					<Login />
				</Route>
				<Route path="/cadastro-usuarios">
					<CadastroUsuario />
				</Route>
				<PrivateRoute path="/" exact>
					<Home />
				</PrivateRoute>
				<AdminPage path="/painel-admin">
					<Dashboard />
				</AdminPage>
				<Route path="*">
					<Header>
						<h2 id="error">Error 404</h2>
					</Header>
					<Main>Desculpe. Página não encontrada :(</Main>
				</Route>
			</Switch>
		</BrowserRouter>
	)

}

function PrivateRoute({ children, ...rest }) {
	return (
		<Route {...rest} render={({location}) => 
			isAuthenticated() ? children : <Redirect to={{ pathname: "/login", state: { from : location }}} />
		} />
	)
}

function AdminPage({ children, ...rest}) {
	return (
		<Route {...rest} render={({location}) => 
			isAdmin() ? children : <Redirect to={{ pathname: "/", state: { from: location }}} />
		} />
	)
}