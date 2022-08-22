import React, {useContext, useState} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";
import {AuthContext} from "../context/AuthContext";
import {IUser} from "../services/responses/AuthResponse";
import {UserContext} from "../context/UserContext";
import VerifyAccountPage from "../pages/user/VerifyAccountPage";

const UserRouter = () => {
    const {isAuth} = useContext(AuthContext);

    // check Auth
    if (!isAuth) {
        return (
            <Navigate to='/auth/login'/>
        )
    }

    const user: IUser = JSON.parse(localStorage.getItem('user')!);
    console.log(user);
    if (!user.isActivated) {
        return <VerifyAccountPage/>
    }

    return (
        <UserContext.Provider value={{user}}>
            <Routes>
                {UserRoutes.map(route => <Route path={route.path} element={route.component} key={route._id}/>)}
            </Routes>
        </UserContext.Provider>

    );
};

export default UserRouter;