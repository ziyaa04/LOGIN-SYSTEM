import React from 'react';
import {Route, Routes} from "react-router-dom";
import AuthRoutes from "./routes/AuthRoutes";

const AuthRouter = () => {
    return (
        <Routes>
            { AuthRoutes.map(elem => <Route path={elem.path} element={elem.component} key={elem._id} />) }
        </Routes>
    );
};

export default AuthRouter;