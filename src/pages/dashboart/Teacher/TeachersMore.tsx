  
import { useEffect, useState } from "react";
import instance from "../../../hooks/instance";
import { useNavigate, useParams } from "react-router-dom";
import type { StackType } from "../../../@types/StackType";
import {
  ArrowLeftOutlined,
  DeleteFilled,
  EditFilled,
  MoreOutlined,
} from "@ant-design/icons";
import { Button, message, Modal, Card, Tag } from "antd";
import { API } from "../../../hooks";
import { CustomTable } from "../../../components";
import type { GroupsType } from "../../../@types/GroupsType";
import { toast } from "react-toastify";
import type { TeacherType } from "../../../@types/TeacherType";

const { confirm } = Modal;

const StackMore = () => {
  const { id } = useParams();
  const [stackData, setStackData] = useState<TeacherType>();
  const navigate = useNavigate();


  useEffect(() => {
    instance()
      .get(`/groups/${id}`)
      .then((res) => {
        setStackData(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        message.error("Ma’lumotni yuklab bo‘lmadi ❌");
      });
  }, [id]);

     useEffect(() =>{
        instance().get(`teachers/${id}`).then(res =>{
            setStackData(res.data)
            
        }).catch(() =>{
            console.log("xato");
            
        })
    },[])

  const [groupType, setGroupType] = useState([]);
 const [trues,setTrue] = useState<boolean>(true)
 
  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Guruh nomi", dataIndex: "name" },
    { title: "Xona", dataIndex: "roomName" },
    { title: "Yo'nalish", dataIndex: "stackName" },
    { title: "Batafsil", dataIndex: "action" },
  ];

  useEffect(() => {
    instance()
      .get("/groups", { params: { stackId:"groupName" } })
      .then((res) => {
        setTrue(false)
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
        setTrue(false)
      });
  }, [id]);

  function DeleteFn(id: number) {
    confirm({
      title: "O‘chirishni tasdiqlaysizmi?",
      content: "Bu amalni ortga qaytarib bo‘lmaydi!",
      okText: "Ha, o‘chir",
      cancelText: "Bekor qilish",
      okType: "danger",
      centered: true,
      onOk() {
        return instance()
          .delete(`teachers/${id}`)
          .then(() => {
            message.success("Muvaffaqiyatli o‘chirildi ✅");
            navigate(-1);
          })
          .catch((err) => {
            console.error("Delete error:", err.response?.data || err.message);
            message.error("O‘chirib bo‘lmadi ❌");
          });
      },
      onCancel() {
        message.info("O‘chirish bekor qilindi");
      },
    });
  }

  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-200 min-h-screen h-[100vh] overflow-y-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Button
            type="text"
            onClick={() => navigate(-1)}
            icon={<ArrowLeftOutlined />}
            className="!text-lg !text-gray-700 hover:!text-purple-600"
          />
          <h2 className="text-3xl font-bold text-gray-800">
            {`${stackData?.name} ${stackData?.surname}`}
          </h2>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate(`/stacks/${id}/update`)}
            icon={<EditFilled />}
            className="!border-green-500 !text-green-600 hover:!bg-green-500 hover:!text-white rounded-lg shadow"
          >
            Tahrirlash
          </Button>
          <Button
            onClick={() => stackData?.id && DeleteFn(stackData.id)}
            icon={<DeleteFilled />}
            danger
            className="rounded-lg shadow hover:!bg-red-500 hover:!text-white"
          >
            O‘chirish
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Info card */}
        <Card className="shadow-md rounded-xl">
          <ul className="space-y-4 text-gray-700">
            <li className="flex justify-between">
              <span className="font-semibold">#ID:</span>
              <Tag className="!bg-[#bc8e5b]" color="white">{stackData?.id}</Tag>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Yo‘nalish nomi:</span>
              <p>{stackData?.name}</p>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold">Yaratilgan sana:</span>
              <p>
                {
                  stackData?.createdAt.split("T")[0]}{" "}
                {  stackData?.createdAt.split("T")[1].split(".")[0]}
              </p>
            </li>
          </ul>
        </Card>

      </div>

      <Card title="Guruhlar ro‘yxati" className="shadow-lg rounded-xl">
        <CustomTable columns={columns} data={groupType}  trues ={trues}/>
      </Card>
    </div>
  );
};

export default StackMore;

