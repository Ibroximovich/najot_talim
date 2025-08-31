import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboartHome, Groups } from "../pages"


const DashboartRoats = () => {
  return (
    <Routes>
        <Route path={PATH.home} element={<DashboartHome/>}/>
        <Route path={PATH.groups} element ={<Groups/>}/>
    </Routes>
  )
}

export default DashboartRoats
