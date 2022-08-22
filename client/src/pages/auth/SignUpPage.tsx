import React, {useContext, useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";
import {AuthService} from "../../services/AuthService";
import {AuthContext} from "../../context/AuthContext";

interface ISignUpData {
    email?: string;
    password?: string;
    confirm_password?: string;
}


const SignUpPage = () => {
    const [signUpData, setSignUpData] = useState<ISignUpData>({email: '', password: '', confirm_password: ''});
    const [signUpErrors, setSignUpErrors] = useState<ISignUpData>({});
    const {setIsAuth} = useContext(AuthContext);

    const signUp = (e: React.FormEvent) => {
        e.preventDefault();
        if (signUpData.email && signUpData.password && signUpData.confirm_password === signUpData.password) {
            const promise = AuthService.SignUp(signUpData.email, signUpData.password, signUpData.confirm_password);
            promise.then(response => {
                const data = response.data;
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('user', JSON.stringify(data.user));
                setIsAuth(true);
            }).catch(err => {
                const data = err.response.data;
                setSignUpErrors({...data});
                setSignUpData({email: signUpData.email, password: '', confirm_password: ''})
            })
        }
    }
    const inputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({...signUpData, email: e.target.value})
    };
    const inputPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({...signUpData, password: e.target.value});
    };
    const inputConfPass = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignUpData({...signUpData, confirm_password: e.target.value});
    };


    return (
        <Form onSubmit={signUp}>
            <h2>Sign Up Page</h2>
            <Form.Group className='mt-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control type='email' placeholder='Email address' required value={signUpData.email}
                              onInput={inputEmail}/>
                {signUpErrors.email && <Form.Text className="text-danger"> {signUpErrors.email} </Form.Text>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required aria-required='true'
                              value={signUpData.password}
                              onInput={inputPass}/>
                {signUpErrors.password && <Form.Text className='text-danger'> {signUpErrors.password} </Form.Text>}
            </Form.Group>

            <Form.Group className='mt-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control type='password' placeholder='Password' required aria-required='true'
                              value={signUpData.confirm_password}
                              onInput={inputConfPass}/>
                {signUpErrors.confirm_password &&
                    <Form.Text className='text-danger'> {signUpErrors.confirm_password} </Form.Text>}
            </Form.Group>

            <Button type='submit' variant='primary' className='mt-3'>Login</Button>
            <div className='mt-2'>
                <Link to='/auth/login'>Already have an account? Login </Link>
            </div>
        </Form>

    );
};

export default SignUpPage;