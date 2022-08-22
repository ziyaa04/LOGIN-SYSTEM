import React, {useContext, useEffect, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AuthService} from "../../services/AuthService";
import {AuthContext} from "../../context/AuthContext";

interface ILoginData {
    email?: string;
    password?: string;
}


const LoginPage = () => {
    const [loginData, setLoginData] = useState<ILoginData>({email: '', password: ''});
    const [errors, setErrors] = useState<ILoginData>({email: '', password: ''});
    const {setIsAuth} = useContext(AuthContext);

    const login = (e: React.FormEvent) => {
        e.preventDefault();
        if (loginData.email && loginData.password) {
            const promise = AuthService.Login(loginData!.email, loginData!.password);
            promise.then(response => {
                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsAuth(true);
            }).catch(err => {
                const errorData = err.response.data;
                setErrors({...errorData});
                setLoginData({...loginData, password: ''});
            });
        }
    };

    const inputPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, password: e.target.value});
    };
    const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, email: e.target.value});
    };

    return (
        <Form onSubmit={login}>
            <h2>Login Page</h2>
            <Form.Group className='mt-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Email address' required aria-required='true'
                              value={loginData.email}
                              onInput={inputEmail}/>
                {errors.email && <Form.Text className="text-danger"> {errors.email} </Form.Text>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required aria-required='true'
                              value={loginData.password}
                              onInput={inputPass}/>
                {errors.password && <Form.Text className='text-danger'> {errors.password} </Form.Text>}
            </Form.Group>
            <Button type='submit' variant='primary' className='mt-3'>Login</Button>
            <div className='mt-2'>
                <Link to='/auth/sign-up'>Don't have an account? Sign up</Link>
            </div>
        </Form>
    );
};

export default LoginPage;