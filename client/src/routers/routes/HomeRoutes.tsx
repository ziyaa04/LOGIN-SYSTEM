import {IRoutes, uniqueKey} from "./RoutesTypes";
import IndexPage from "../../pages/home/IndexPage";

const routes: IRoutes[] = [{ _id: uniqueKey(), path: '', component: <IndexPage /> }]


export default routes;