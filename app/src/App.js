import './App.css';
import './styles.scss';
import Home from './pages/home'
import { Router, Route, Switch } from 'react-router-dom'
import history from './core/history'
import Navbar from './features/navbar'

function App() {
  return (
    <Router history={history}>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
