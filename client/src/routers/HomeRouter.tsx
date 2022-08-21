import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomeRoutes from "./routes/HomeRoutes";

const HomeRouter = () => {
    return (
        <Routes>
            { HomeRoutes.map(route => <Route path={route.path} element={route.component} key={route._id} /> ) }
        </Routes>
    );
};

export default HomeRouter;