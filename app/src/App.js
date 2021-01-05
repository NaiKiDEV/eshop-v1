import './App.css';
import './styles.scss';
import Home from './pages/home'
import Register from './pages/register'
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
      </Switch>
    </Router>
  );
}

export default App;
