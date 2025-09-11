import { Route, Routes } from "react-router-dom"
import { PATH } from "../components"
import { DashboartHome, Groups, Stack, StackCreate, StackMore, Students, StudentsCreate, TeacherCreate, Teachers } from "../pages"
import { Header, Navbar } from "../modules"
import { useState } from "react"
import GroupCreate from "../pages/dashboart/Group/GroupCreate"
import TeachersMore from "../pages/dashboart/Teacher/TeachersMore"



const DashboartRoats = () => {
 const [collapse,setCollapse] = useState<boolean>(false)

  const routeList = [
    {id:1,path:PATH.stacks,element:<Stack/>},
    {id:2,path:PATH.teachers,element:<Teachers/>},
    {id:3,path:PATH.students,element:<Students/>},
    {id:4,path:PATH.groups,element:<Groups/>},
    {id:5,path:PATH.home,element:<DashboartHome/>},
    {id:6,path:PATH.stackCraete,element:<StackCreate/>},
    {id:7,path:PATH.stackUpdate,element:<StackCreate/>},
    {id:8,path:PATH.stackMore,element:<StackMore/>},
    {id:9,path:PATH.groupsCreate ,element:<GroupCreate/>},
    {id:10,path:PATH.teachersCreate ,element:<TeacherCreate/>},
    {id:11,path:PATH.studentsCreate ,element:<StudentsCreate/>},
    {id:12,path:PATH.teachersMore ,element:<TeachersMore/>},

  ]
  return (
    <div className="flex">
        <Navbar collapse ={collapse}/>
      <div className={`${collapse ? "w-full  " : "w-[82%] "} `}>
        <div>
          <Header setCollapse ={setCollapse} collapse ={collapse} />
        </div>
      <Routes>
          {routeList.map(item => <Route key={item.id} path={item.path} element ={item.element}/>)}
      </Routes>
      </div>

    </div>
  )
}

export default DashboartRoats
