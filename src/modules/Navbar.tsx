import type { FC } from "react"
import { LogoIcon } from "../assets/icons"
import { Menu } from "antd"
import { OpenAIOutlined, StarOutlined, TeamOutlined, UngroupOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { PATH } from "../components"


const Navbar:FC<{collapse:boolean}> = ({collapse}) => {
  const items =[
        { key: '1', icon: <StarOutlined className='!text-[20px]'/>, label: <Link className='text-[18px]' to={PATH.stacks}>Yo'nalishlar</Link> },
      { key: '2', icon: <UngroupOutlined  className='!text-[20px]' />, label: <Link className='text-[18px]' to={PATH.groups}>Guruhlar</Link> },
      { key: '3', icon: <TeamOutlined  className='!text-[20px]'/>, label: <Link className='text-[18px]' to={PATH.teachers}>Ustozlar</Link> },
      { key: '4', icon: <OpenAIOutlined  className='!text-[20px]'/>, label: <Link className='text-[18px]' to={PATH.students}>O'quvchilar</Link> },
  
  ]
  return (
    <div className={`${collapse ? "w-[100px]" :"w-[18%]"}  bg-[#001529] h-[100vh] pl-2`}>
     <div>
        <div className="flex items-center  gap-[10px] border-b-[1px] border-white">
            <LogoIcon classlist={ `${collapse ? "!mx-auto" : ""} !w-[60px] !h-[60px]`}/>
          {collapse ? "" :  <span className="text-[18px] font-semibold text-white ">TEACHER</span>}
        </div>
        <Menu
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="inline"
        theme="dark"
        inlineCollapsed ={collapse}
        
        items={items}
      />
        
     </div>
    </div>
  )
}

export default Navbar
