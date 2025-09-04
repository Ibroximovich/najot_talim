



import { useEffect, useState } from "react";
import { PagesCaption, StackSceleton } from "../../components";
import instance from "../../hooks/instance";
import type { StackType } from "../../@types/StackType";
import { Button, Card, message, Modal } from "antd";
import { API } from "../../hooks";
import { DeleteFilled, EditFilled } from "@ant-design/icons";

const Stack = () => {
  const [stacks, setStacks] = useState<Array<StackType>>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);

  // Ma'lumotlarni olish
  useEffect(() => {
    setIsloading(true);
    instance()
      .get("/stacks")
      .then((res) => {
        setStacks(res.data.data);
        setIsloading(false);
      })
      .catch(() => setIsloading(false));
  }, []);

  // O'chirish funksiyasi


const { confirm } = Modal;

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
          setStacks((prev) => prev.filter((item) => item.id !== id));
          message.success("Muvaffaqiyatli o‘chirildi ✅");
        })
        .catch((err) => {
          console.error("Delete error:", err.response?.data || err.message);
          message.error("O‘chirib bo‘lmadi ❌ (backendda xatolik bor)");
        });
    },
    onCancel() {
      message.info("O‘chirish bekor qilindi");
    },
  });
}


  return (
    <div className="p-2">
      <div className="bg-white h-[90vh] overflow-y-auto">
        <PagesCaption title="Yon'alishlar" count={stacks.length} />
        {isLoading ? (
          <StackSceleton />
        ) : (
          <div className="flex justify-between flex-wrap p-5 gap-[20px]">
            {stacks.map((item) => (
              <Card
  key={item.id}
  hoverable
  style={{ width: 260 }}
  className="!rounded-2xl !shadow-md hover:!shadow-2xl transition duration-300 overflow-hidden"
  cover={
    <img
      alt={item.name}
      src={`${API}/file/${item.image}`}
      className="h-[200px] object-cover rounded-t-2xl hover:scale-105 transition duration-500"
    />
  }
>
  <Card.Meta
    title={
      <span className="text-lg font-semibold text-gray-800">
        {item.name}
      </span>
    }
  />

  <div className="flex justify-between items-center mt-4">
    {/* Edit tugma */}
    <Button
      size="large"
      icon={<EditFilled />}
      className="
        !border-green-600 
        !text-green-600 
        rounded-full 
        hover:!bg-green-600 
        hover:!text-white 
        transition 
        duration-300
        shadow-sm
      "
    />

    {/* Delete tugma */}
    <Button
      onClick={() => DeleteFn(item.id)}
      size="large"
      icon={<DeleteFilled />}
      className="
        !border-red-600 
        !text-red-600 
        rounded-full 
        hover:!bg-red-600 
        hover:!text-white 
        transition 
        duration-300
        shadow-sm
      "
    />
  </div>
            </Card>
                

            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stack;
