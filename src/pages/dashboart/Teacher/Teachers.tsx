import { Button, Input } from "antd"
import { CustomTable, PagesCaption } from "../../../components"
import { useEffect, useState } from "react"
import instance from "../../../hooks/instance"
import { MoreOutlined } from "@ant-design/icons"
import type { TeacherType } from "../../../@types/TeacherType"
import { Debounce } from "../../../hooks"
import { useNavigate } from "react-router-dom"


const Teachers = () => {
  const columns =[
    {title:"ID",dataIndex:"id"},
    {title:"Ism",dataIndex:"name"},
    {title:"Familya",dataIndex:"surname"},
    {title:"Yo'nalish",dataIndex:"stackName"},
    {title:"Lavozim",dataIndex:"statusName"},
    {title:"Batafsil",dataIndex:"action"},
  ]

    const navigate = useNavigate()
    const [loading, setLoading] = useState<boolean>(true)
  const [searchName, setSearchName] = useState<string | undefined>("")
  const name = Debounce(searchName, 700)
  function handleSearch(e:React.ChangeEvent<HTMLInputElement>) {
    setSearchName(e.target.value)
    setLoading(true)
  }

  const [teacher,setTeacher] = useState<TeacherType[]>([])
   useEffect(() => {
    instance().get("/teachers").then(res => {
      setTeacher(res.data.data.map((item: TeacherType, index: number) => {
        item.key = index + 1
        item.stackName = item.stack.name
        item.action = <Button onClick={() => navigate(`${item.id}`)} size="middle" icon={<MoreOutlined className="!text-[18px]" />} type="primary" className="!bg-[#bc8e5b] !p-0"></Button>
        return item
      }))
    }).finally(() => {
      setLoading(false)
    })
  }, [name])


  return (
    <div className="p-5">
     <PagesCaption title="Ustozlar" count={5}/>
     <div className="mt-5 flex items-center gap-5">
        <Input onChange={ handleSearch} className="!w-[350px]" placeholder="Qidiring" size="large"/>
     </div>
     <div className="mt-5">
        <CustomTable  columns={columns} data={teacher} trues ={loading}/>
     </div>
    </div>
  )
}

export default Teachers
