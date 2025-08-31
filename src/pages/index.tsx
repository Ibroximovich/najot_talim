
import DashboartHome from "./dashboart/DashboartHome";
import Groups from "./dashboart/Groups";
import LoginHome from "./auth/LoginHome";
import { lazy } from "react";
const Login = lazy(() => import("./auth/Login"))

export{Login,DashboartHome, Groups, LoginHome}