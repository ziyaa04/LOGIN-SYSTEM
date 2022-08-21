import {IRoutes, uniqueKey} from "./RoutesTypes";
import LoginPage from "../../pages/auth/LoginPage";
import SignUpPage from "../../pages/auth/SignUpPage";


const routes: IRoutes[] = [
    { _id: uniqueKey(), path: 'login', component: <LoginPage /> },
    { _id: uniqueKey(), path: 'sign-up', component: <SignUpPage />},
];



export default routes;