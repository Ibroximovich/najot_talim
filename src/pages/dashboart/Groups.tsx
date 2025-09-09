import { useEffect, useState } from "react";
import { CustomTable, PagesCaption } from "../../components"
import instance from "../../hooks/instance";
// import type { GroupsType } from "../../@types/GroupsType";
// import { Button } from "antd";
// import { MoreOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { Button, Input, Select } from "antd";
import type { GroupsType } from "../../@types/GroupsType";
import { MoreOutlined } from "@ant-design/icons";
import { Debounce } from "../../hooks";



const Groups = () => {

  const [groups,setGroupType] = useState([])
  const [searchLoading,setSearchLoading] = useState<boolean>(true)
  const [searchName,setSearchName] = useState<string | undefined>("")
  // const [teachers,setTeachrs] = useState<{label:string,value:string}[]>([])

  const name = Debounce(searchName,500)
    useEffect(() => {
    instance()
      .get("/groups",{
        params:{name}
      })
      .then((res) => {
        setSearchLoading(false)
        setGroupType(
          res.data.data.map((item: GroupsType, index: number) => {
            item.key = index + 1;
            item.roomName = item.room.name;
            item.stackName = item.stack.name;
            item.action = (
              <Button
                type="primary"
                size="middle"
                className="!bg-[#bc8e5b] border-0"
              >
                <MoreOutlined />
              </Button>
            );
            return item;
          })
        );
      }).catch(() =>{
        toast.error("Malumotlar yuklanmadi")
      });
  }, [name]);



  // teacher part 
    useEffect(() => {
    instance()
      .get("/teachers")
      .then((res) => {
        console.log(res);
        
        setGroupType(
          res.data.data.map((item: GroupsType, index: number) => {
            item.key = index + 1;
            item.roomName = item.room.name;
            item.stackName = item.stack.name;
            item.action = (
              <Button
                type="primary"
                size="middle"
                className="!bg-[#bc8e5b] border-0"
              >
                <MoreOutlined />
              </Button>
            );
            return item;
          })
        );
      }).catch(() =>{
        toast.error("Malumotlar yuklanmadi")
      });
  }, []);



  // useEffect(() =>{
  //   instance().get("/teachers").then(res =>{
  //     console.log(res);
      
  //   })
  // })



    const columns = [
    { title: "ID", dataIndex: "key" },
    { title: "Guruh nomi", dataIndex: "name" },
    { title: "Xona", dataIndex: "roomName" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ];

function handleInput(e:React.ChangeEvent<HTMLInputElement>){
  setSearchLoading(true)
    setSearchName(e.target.value)
}

  return (
      <div className="p-5">
        <PagesCaption title="Guruhlar" count={4}/>
        <div className="flex items-center gap-[10px]">
            <Input onChange={ handleInput } className="!w-[300px]" size="large" placeholder="Qidiring"/>
             <Select className="!w-[300px]" size="large"
                showSearch
                allowClear
                placeholder="Ustoz tanlang"
                optionFilterProp="label"
                // onSearch={onSearch}
                options={[
                ]}
              />
        </div>
        <div className="mt-[50px]">
          <CustomTable columns={columns} data={groups} trues ={searchLoading}/>
        </div>
    </div>
  )
}

export default Groups
