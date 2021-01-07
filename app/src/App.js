import './App.css';
import './styles.scss';
import Home from './pages/home'
import Register from './pages/register'
import Login from './pages/login'
import { Router, Route, Switch } from 'react-router-dom'
import history from './core/history'
import Navbar from './features/navbar'

function App() {
  return (
    <Router history={history}>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
