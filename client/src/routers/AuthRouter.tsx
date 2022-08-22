import React, {useContext} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";
import {AuthContext} from "../context/AuthContext";
import {Container, Form} from "react-bootstrap";
import classes from './css/AuthRouter.module.css';


const AuthRouter = () => {
    const {isAuth} = useContext(AuthContext);

    if (isAuth) {
        return (
            <Navigate to='/user/'/>
        )
    }
    return (
        <main className={classes.mainContainer}>
            <Container className={classes.centerContainer}>
                <Routes>
                    {AuthRoutes.map(elem => <Route path={elem.path} element={elem.component} key={elem._id}/>)}
                </Routes>
            </Container>
        </main>
    );
};

export default AuthRouter;