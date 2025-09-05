// import { useEffect, useState } from "react"
// import instance from "../../../hooks/instance"
// import { useNavigate, useParams } from "react-router-dom"
// import type { StackType } from "../../../@types/StackType"
// import { ArrowLeftOutlined, DeleteFilled, EditFilled, MoreOutlined } from "@ant-design/icons"
// import { Button, message, Modal } from "antd"
// import { API } from "../../../hooks"
// import { CustomTable } from "../../../components"
// import type { GroupsType } from "../../../@types/GroupsType"



// const { confirm } = Modal;

// const StackMore = () => {
//   const { id } = useParams();
//   const [stackData, setStackData] = useState<StackType>();
//   const navigate = useNavigate();

//   useEffect(() => {
//     instance()
//       .get(`/stacks/${id}`)
//       .then((res) => {
//         setStackData(res.data);
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         message.error("Ma’lumotni yuklab bo‘lmadi ❌");
//       });
//   }, [id]);


//   const [groupType,setGroupType] =useState([])

//  const columns = [
//   {title:"ID",dataIndex:"id"},
//   {title:"Guruh nomi",dataIndex:"name"},
//   {title:"Xona",dataIndex:"roomName"},
//   {title:"Yo'nalish",dataIndex:"stackName"},
//   {title:"Batafsil",dataIndex:"action"}
//  ] 
//   useEffect(() =>{
//     instance().get("/groups",{  params:{   stackId:id }
//     }).then(res =>{
//       console.log(res.data);
      
//       setGroupType(res.data.data.map((item:GroupsType,index:number)=>{
//         item.key += index +1
//         item.roomName = item.room.name
//         item.stackName = item.stack.name
//         item.action = <Button type="primary" size="middle" className="!bg-[#bc8e5b]"><MoreOutlined/></Button>
//         return item
//       }))
      
//       console.log(res.data);
      
//     })
//   },[])
//   // O'chirish funksiyasi
//   function DeleteFn(id: number) {
//     confirm({
//       title: "O‘chirishni tasdiqlaysizmi?",
//       content: "Bu amalni ortga qaytarib bo‘lmaydi!",
//       okText: "Ha, o‘chir",
//       cancelText: "Bekor qilish",
//       okType: "danger",
//       centered: true,
//       onOk() {
//         return instance()
//           .delete(`/stacks/${id}`)
//           .then(() => {
//             message.success("Muvaffaqiyatli o‘chirildi ✅");
//             navigate(-1); // ortga qaytadi
//           })
//           .catch((err) => {
//             console.error("Delete error:", err.response?.data || err.message);
//             message.error("O‘chirib bo‘lmadi ❌ (backendda xatolik bor)");
//           });
//       },
//       onCancel() {
//         message.info("O‘chirish bekor qilindi");
//       },
//     });
//   }

//   return (
//     <div className="p-5">
//       <div className="flex justify-between">
//         <div className="flex gap-[10px] items-center">
//           <button onClick={() => navigate(-1)}>
//             <ArrowLeftOutlined className="!text-[22px]" />
//           </button>
//           <h2 className="text-[25px] font-bold">{stackData?.name}</h2>
//         </div>
//         <div className="flex items-center gap-3">
//           {/* Edit tugma */}
//           <Button
//             onClick={(e) => {
//               e.stopPropagation();
//               navigate(`/stacks/${id}/update`);
//             }}
//             size="large"
//             icon={<EditFilled />}
//             className="
//               !border-green-600 
//               !text-green-600 
//               rounded-full 
//               hover:!bg-green-600 
//               hover:!text-white 
//               transition 
//               duration-300
//               shadow-sm
//             "
//           />

//           {/* Delete tugma */}
//           <Button
//             onClick={(e) => {
//               e.stopPropagation();
//               if (stackData?.id) DeleteFn(stackData.id);
//             }}
//             size="large"
//             icon={<DeleteFilled />}
//             className="
//               !border-red-600 
//               !text-red-600 
//               rounded-full 
//               hover:!bg-red-600 
//               hover:!text-white 
//               transition 
//               duration-300
//               shadow-sm
//             "
//           />
//         </div>
//       </div>

//       <div className="mt-[50px] flex gap-5">
//         <ul className="border-[2px] border-gray-300 w-[40%] p-5 space-y-4">
//           <li>
//             <span>#</span>
//             <p>{stackData?.id}</p>
//           </li>
//           <li>
//             <span>Yo'nalish nomi</span>
//             <p>{stackData?.name}</p>
//           </li>
//           <li>
//             <span>Yaratilgan sana</span>
//             <p>
//               {stackData?.createdAt.split("T")[0]}{" "}
//               {stackData?.createdAt.split("T")[1].split(".")[0]}
//             </p>
//           </li>
//         </ul>
//         <ul className="w-[40%]">
//           <img
//             src={`${API}/file/${stackData?.image}`}
//             alt="logo"
//             width={"100%"}
//           />
//         </ul>
//       </div>
//       <div className="mt-[50px]">
//         <CustomTable columns={columns} data={groupType}/>
//       </div>
//     </div>
//   );
// };

// export default StackMore;








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

const { confirm } = Modal;

const StackMore = () => {
  const { id } = useParams();
  const [stackData, setStackData] = useState<StackType>();
  const navigate = useNavigate();

  useEffect(() => {
    instance()
      .get(`/stacks/${id}`)
      .then((res) => {
        setStackData(res.data);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        message.error("Ma’lumotni yuklab bo‘lmadi ❌");
      });
  }, [id]);

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
      .get("/groups", { params: { stackId: id } })
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
          .delete(`/stacks/${id}`)
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
            {stackData?.name}
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

        {/* Image card */}
        <Card className="shadow-md rounded-xl overflow-hidden flex items-center justify-center">
          <img
            src={`${API}/file/${stackData?.image}`}
            alt="stack logo"
            className="rounded-lg object-contain max-h-[280px]"
          />
        </Card>
      </div>

      {/* Table */}
      <Card title="Guruhlar ro‘yxati" className="shadow-lg rounded-xl">
        <CustomTable columns={columns} data={groupType}  trues ={trues}/>
      </Card>
    </div>
  );
};

export default StackMore;
