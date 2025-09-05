import { PlusOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import  { type FC } from 'react'
import { useNavigate } from 'react-router-dom'

const PagesCaption:FC<{title:string,count:number}> = ({title,count}) => {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-between p-2'>
        <div>
            <h2 className='text-[25px] font-bold '>{title}</h2>
            <span>{count} {title.toLowerCase()}</span>
        </div>
        <Button   onClick={() =>navigate("create")} className='!bg-[#bc8e5b]'  type='primary' size='large'  icon ={<PlusOutlined/>}>Qo'shish</Button>
    </div>
  )
}

export default PagesCaption
