import {  BellOutlined, LoginOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Badge, Button, Modal } from "antd"
import { useState, type Dispatch, type FC, type SetStateAction } from "react"
import { useCookies } from "react-cookie"


const Header:FC<{collapse:boolean,setCollapse:Dispatch<SetStateAction<boolean>>}> = ({collapse,setCollapse}) => {
  const [showModale,setshowmodal] = useState<boolean>(false)
 const [,,removeCookies] = useCookies(["accessToken"])

  function handleOkbtn(){
    removeCookies("accessToken")
    location.pathname ="/"
  }
  return (
    <div className="flex justify-between items-center bg-[#001529] p-[10.5px]">
       <button onClick={() => setCollapse(!collapse)}>{collapse ? <MenuUnfoldOutlined className="!text-white !text-[22px]" /> : <MenuFoldOutlined className="!text-white !text-[22px]"/>}</button>
       <div className="flex items-center">
        <Badge  overflowCount={9} count ={10}>
            <Button size="middle" icon ={<BellOutlined className="!text-[20px]"/>}></Button>
        </Badge>
        <Button onClick={() =>setshowmodal(true)} className="!text-white" type="text" size="large" iconPosition="end" icon ={<LoginOutlined/>}>Chiqish</Button>
       </div>
       <Modal cancelText ={"Bekor qilish"} okText ={"Ha"} open={showModale} okButtonProps={{type:"primary", className:"!bg-[#bc8e5b]"}  } title ={" Tizimdan chiqmoqchimisz ?"} onCancel={() => setshowmodal(false)} onOk={handleOkbtn}>
       </Modal>
        
    </div>
  )
}

export default Header
