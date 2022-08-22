import {IRoutes, uniqueKey} from "./RoutesTypes";
import UserIndexPage from "../../pages/user/UserIndexPage";

const routes: IRoutes[] = [
    {_id: uniqueKey(), path: '/', component: <UserIndexPage/>}
]
export default routes;