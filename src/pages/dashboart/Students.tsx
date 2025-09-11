

import { Input } from "antd"
import { CustomTable, PagesCaption } from "../../components"

const Teachers = () => {
  const columns =[
    {title:"ID",dataIndex:"id"}
  ]
  return (
    <div className="p-5">
     <PagesCaption title="O'quvchilar" count={5}/>
     <div className="mt-5 flex items-center gap-5">
        <Input className="!w-[350px]" placeholder="Qidiring" size="large"/>
     </div>
     <div className="mt-5">
        <CustomTable  columns={columns} data={[]} trues ={false}/>
     </div>
    </div>
  )
}

export default Teachers
