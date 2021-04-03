import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, code, token, ...rest }) => {
  return (
    <Route {...rest} render = {
        props => { 
            if (code || token) {
                return <Component {...rest} code={code} token={token} {...props} />
            }
            else {
                return <Redirect to={
                    {
                      pathname: '/login',
                      state: {
                        from: props.location
                      }
                    }
                } />
            }
        }
    } />
  )
}

export default ProtectedRoute;