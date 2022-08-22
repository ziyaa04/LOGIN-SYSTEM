import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import api from "../../http/axios";

const VerifyAccountPage = () => {
    const [successMessage, setSuccessMessage] = useState<string>('');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const sendMail = (e: React.FormEvent) => {
        e.preventDefault();
        api.post('/auth/send-verify-mail').then(response => {
            setSuccessMessage('Mail successfully sent!');
            setErrorMessage('');
        }).catch(error => {
            setErrorMessage(error.response.data.message);
            setSuccessMessage('')
        })
    }

    return (
        <Form onSubmit={sendMail}>
            <h3>Please verify Account</h3>
            <Button type='submit' variant='primary'>Send Mail</Button>
            {errorMessage && <Form.Text className='text-danger'>{errorMessage}</Form.Text>}
            {successMessage && <Form.Text className='text-success'>{successMessage}</Form.Text>}
        </Form>
    );
};

export default VerifyAccountPage;