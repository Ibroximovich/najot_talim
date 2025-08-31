import { Route, Routes } from "react-router-dom"
import { LazyLoading, PATH } from "../components"
import { Login, LoginHome } from "../pages"
import { Suspense } from "react"


const LoginRoats = () => {
  return (
   <Routes>
    <Route path={PATH.home} element={<Login/>}/>
    <Route path={PATH.login} element={<Suspense fallback ={<LazyLoading/>}><LoginHome/></Suspense>}/>
   </Routes>
  )
}

export default LoginRoats
