import React, {useEffect} from 'react';
import {Button, Container} from "react-bootstrap";
import {AuthService} from "../../services/AuthService";
import {useCookies} from "react-cookie";
import api from "../../http/axios";


const SignUpPage = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);
    useEffect(() => {
        const a = api.get('/auth/refresh-token');
        a.then(data => {
            console.log(data);
        })
        console.log(cookies);
    }, []);

    return (
        <div>
            <Button as="a" variant="primary"> Hello </Button>
        </div>
    );
};

export default SignUpPage;