import React from 'react';
import {Route, Routes} from "react-router-dom";
import UserRoutes from "./routes/UserRoutes";

const UserRouter = () => {
    return (
        <Routes>
            { UserRoutes.map(route => <Route path={route.path} element={route.component}  key={route._id} />)}
        </Routes>
    );
};

export default UserRouter;