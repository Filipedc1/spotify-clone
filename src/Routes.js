import { Switch, Redirect } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Search from './components/Search';

import ProtectedRoute from './ProtectedRoute';

import { isAuthenticated } from "../src/services/auth"

export default function Routes({code}) {
    let token = isAuthenticated()

    return (
        <Switch>
          <ProtectedRoute exact path={["/", "/dashboard"]} token={token} component={Dashboard} />
          <ProtectedRoute path='/search' token={token} component={Search} />

          {/* redirect user to Error page if route does not exist */}
          <Redirect to='/error'/>
        </Switch>
    );
}