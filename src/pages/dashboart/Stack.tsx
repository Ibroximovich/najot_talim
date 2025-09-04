



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
                style={{ width: 240 }}
                cover={
                  <img
                    alt="example"
                    src={`${API}/file/${item.image}`}
                    className="h-[200px] object-cover"
                  />
                }
              >
                <Card.Meta title={item.name} />
                <div className="flex justify-between items-center mt-[20px]">
                  <Button
                    size="large"
                    className="!border-green-600 !text-green-600"
                    icon={<EditFilled />}
                  ></Button>
                  <Button
                    onClick={() => DeleteFn(item.id)}
                    size="large"
                    className="!border-red-600 !text-red-600"
                    icon={<DeleteFilled />}
                  ></Button>
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
