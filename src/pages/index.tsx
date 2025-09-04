
import DashboartHome from "./dashboart/DashboartHome";
import Groups from "./dashboart/Groups";
import LoginHome from "./auth/LoginHome";
import { lazy } from "react";
const Login = lazy(() => import("./auth/Login"))
import Stack from "./dashboart/Stack";
import Teachers from "./dashboart/Teachers";
import Students from "./dashboart/Students";
import StackCreate from "./dashboart/StackCreate";

export{Login,DashboartHome, Groups, LoginHome,Stack,Teachers,Students,StackCreate}