import './App.css';
import { React } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"

import { BrowserRouter } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Error from './components/Error';
import Main from './components/main/Main';
import ProtectedRoute from './ProtectedRoute';
import { isAuthenticated } from "../src/services/auth"

const code = new URLSearchParams(window.location.search).get('code')

function App() {
  let token = isAuthenticated()

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/error" component={Error} />
        <ProtectedRoute exact path='*' code={code} token={token} component={Main} />
      </Switch>
    </BrowserRouter>  
  );
}

export default App;
