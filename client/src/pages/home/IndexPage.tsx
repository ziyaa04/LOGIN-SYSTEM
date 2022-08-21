import React, {useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import classes from './css/index-page.module.css';

const IndexPage = () => {

    return (
        <Container className={classes.mainContainer} fluid='sm'>
            <h1>Home page</h1>
            <div className={classes.buttons}>
                <Button as='a' href="/auth/login" variant="primary">Login </Button>
                <Button as='a' href="/auth/sign-up" variant="primary">Sign-up</Button>
            </div>
        </Container>
    );
};

export default IndexPage;