import {ReactComponentElement} from "react";

export interface IRoutes{
    _id: string,
    path: string,
    component: ReactComponentElement<any>,
}
export const  uniqueKey = () => Date.now().toString();