import React, {useContext} from 'react';
import {AuthContext} from "../../context/AuthContext";
import {Button, Form} from "react-bootstrap";
import {AuthService} from "../../services/AuthService";

const UserIndexPage = () => {
    const {setIsAuth} = useContext(AuthContext);

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const promise = AuthService.Logout();
        promise.then(response => {
            const data = response.data;
            if (!data.success)
                return;
            localStorage.setItem('accessToken', '');
            setIsAuth(false);
        }).catch(err => console.log(err));
    }

    return (
        <div>
            <Form onSubmit={onSubmit}>
                <Button type='submit' variant='danger'>Logout</Button>
            </Form>

        </div>
    );
};

export default UserIndexPage;