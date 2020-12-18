import './App.css';
import './styles.scss';
import Home from './pages/home'
import { Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <Router history={history}>
      <Navbar></Navbar>
      <Modal></Modal>
      <Switch>
        <Route exact path="/" component={Home} />
      </Switch>
    </Router>
  );
}

export default App;
