import { ArrowLeftOutlined, PlusCircleOutlined } from "@ant-design/icons"
import { Button } from "antd"
import { useNavigate } from "react-router-dom"


const CreateCaption = ({title,isLoading}:{title:string,isLoading:boolean}) => {
    const navigate = useNavigate()
  return (
    <div className="flex justify-between items-center">
            <div className="flex gap-[10px]">
                <button className="text-[22px]" type="button" onClick={() => navigate(-1)}><ArrowLeftOutlined /></button>
                <h2 className="text-[25px] font-bold">{title} qo'shish</h2>
            </div>
            <Button loading ={isLoading} htmlType="submit" size="large" type="primary" className="!bg-[#bc8e5b]" icon={<PlusCircleOutlined/>}>Saqlash</Button>
        </div>
  )
}

export default CreateCaption



