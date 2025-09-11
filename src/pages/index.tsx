
import DashboartHome from "./dashboart/DashboartHome";
import Groups from "./dashboart/Group/Groups";
import LoginHome from "./auth/LoginHome";
import { lazy } from "react";
const Login = lazy(() => import("./auth/Login"))
import Stack from "./dashboart/stacks/Stack";
import Teachers from "./dashboart/Teacher/Teachers";
import Students from "./dashboart/Students";
import StackCreate from "./dashboart/stacks/StackCreate";
import StackMore from "./dashboart/stacks/StackMore";
import TeacherCreate from "./dashboart/Teacher/TeacherCreate";
import StudentsCreate from "./dashboart/StudentsCreate";

export{Login,DashboartHome, Groups, LoginHome,Stack,Teachers,Students,StackCreate,StackMore,TeacherCreate,StudentsCreate}