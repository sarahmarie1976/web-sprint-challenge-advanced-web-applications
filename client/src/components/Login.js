import React, {useState} from "react";
import { useHistory, NavLink } from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import { Form, Label, Input, FormGroup, Navbar, Button, Card, CardHeader, } from 'reactstrap';

const Login = () => {
  const [login, setLogin] = useState({ 
    username: '',
    password: ''
  })

  const { username, password } = login;
  const { push } = useHistory();
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const handleChange = (e) => {
    setLogin({ 
      ...login,
      [e.target.name]: e.target.value
    })
    console.log(login);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post(`api/login`, login)
      .then((res) => {
        window.localStorage.setItem('token', res.data.payload);
        setLogin({
           username: '', password: ''
        })
        push('/bubbles');
      })
      .catch((err) => {
        console.log(err);
      })
  }



  return (
    <>
    <header>
      <Navbar style={{  }} >
        <NavLink style={{ margin: '3%'  }} to='/'>Login</NavLink>
        <NavLink style={{ margin: '3%'}} to='/bubbles'>Bubbles</NavLink>
      </Navbar>
      </header>

      <Card  style={{ margin: '5%', height: '400px' }}>
        
      <CardHeader>Welcome to the Bubble App!</CardHeader>
    

      <Form onSubmit={handleSubmit} >

        <FormGroup >
          <Label >Username</Label>
          <Input 
            type='text'
            name='username'
            value={username}
            onChange={handleChange}
            placeholder='Enter Username'
            />
        </FormGroup>

        <FormGroup >
          <Label >Password</Label>
          <Input 
            type='text'
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='Enter Password'
            />
        </FormGroup>

        <Button >Submit</Button>

      </Form>
      </Card>
    </>
  );
};

export default Login;
