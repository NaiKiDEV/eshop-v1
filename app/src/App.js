import './App.css';
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Router, Route, Switch } from 'react-router-dom'
import history from './core/history'
import Navbar from './features/navbar'
import Footer from './features/Footer'
import AdminPage from './pages/adminpage'
import SingleItem from './pages/singleitem'
import { useSelector } from 'react-redux'

function AdminAccessArea() {
	const user = useSelector(state => state.user.userData)
	console.log(user)
	if (user?.isAdmin) {
		return <AdminPage />
	} else {
		history.push('/')
		return <></>
	}
}

function App() {
	return (
		<Router history={history}>
			<Navbar></Navbar>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/register" component={Register} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/admin" component={AdminAccessArea} />
				<Route exact path="/product/:id" component={SingleItem} />
			</Switch>
			<Footer/>
		</Router>
	);
}

export default App;
