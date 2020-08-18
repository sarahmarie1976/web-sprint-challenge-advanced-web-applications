import React, {useState} from "react";
import { useHistory, NavLink } from 'react-router-dom';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import { Form, Label, Input, FormGroup, Navbar, Button, Card, CardHeader,  NavItem } from 'reactstrap';

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
        localStorage.setItem('token', res.data.payload);
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
    <div>
      <Navbar style={{  }} >
        <NavItem>
          <NavLink style={{ padding: '2px', margin: '10px' }} to='/'>Login</NavLink>
        </NavItem>

        <NavItem>
          <NavLink style={{ padding: '2px', margin: '3px' }}   to='/bubbles'>Bubbles</NavLink>
        </NavItem>

      </Navbar>
      </div>

      <Card  style={{ margin: '5%', height: '400px', marginLeft: '30%', border: 'none', background: 'transparent' }}>
        
      <CardHeader style={{ border: 'none', background: 'transparent' }} >Welcome to the Bubble App!</CardHeader>
    

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

        <Button style={{  background: 'lightseagreen', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)', fontWeight: 'bold' , textShadow: '2px 2px 8px #C0C0C0 ' }} >Submit</Button>

      </Form>
      </Card>
    </>
  );
};

export default Login;
