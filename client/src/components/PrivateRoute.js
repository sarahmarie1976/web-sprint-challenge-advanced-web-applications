import React from 'react';
import {Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return(
        <Route 
        {...rest}
        render={props => 
            localStorage.getItem('token') ? (
            <Component {...props} /> 
            ) : (
            <Redirect to='/login' />
            )
        }  
     />
   )
}

export default PrivateRoute;


/* return the route and pass in the props with the spread operater
            render to pass props
            privateRoute we want to grab the token
            if that token is there we use a ternary operator (an if/else statement)
            if that token is there our privateRoute will know whether or 
            not to either render the component or
            redirect back to the login
        */