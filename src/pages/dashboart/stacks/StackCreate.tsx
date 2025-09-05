import { useEffect, useState } from "react";
import { CreateCaption, UploadFiles } from "../../../components";
import { Input, message } from "antd";
import instance from "../../../hooks/instance";
import { toast } from "react-toastify";
import {  useNavigate, useParams } from "react-router-dom";
import { API } from "../../../hooks";

const StackCreate = () => {
  const [image, setImage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const {id} = useParams()
  const navigate = useNavigate();
  function handleSubmitFn(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
        if (!image) {
        message.error("Iltimos, rasm yuklang!");
        return;
      }
      else if(name == ""){
        message.error("Iltimos, maydonni  to'ldiring!");
      }

      else if(image && name){
        const data = { name, image };
        if(id){
          if(data.image.includes("http")){
            data.image = data.image.split(`${API}/file/`)[1]
          }
          setIsloading(true);
          instance()
            .patch(`/stacks/${id}`, data)
            .then(() => {
              toast.success("Muvaffaqqiyatli o'zgartirildi", {
                onClose: () => {
                  navigate(-1);
                },
                autoClose: 2000,
              });
            });
          
        }
        else{
          setIsloading(true);
          instance()
            .post("/stacks", data)
            .then(() => {
              toast.success("Muvaffaqqiyatli qo'shildi", {
                onClose: () => {
                  navigate(-1);
                },
                autoClose: 2000,
              });
            });
        }
      }
  }
  useEffect(() =>{
    if(id){
      instance().get(`/stacks/${id}`).then(res =>{
        setName(res.data.name)
        setImage(`${API}/file/${res.data.image}`)
      })
    }
  },[])
  

  return (
    <form onSubmit={handleSubmitFn} className="p-5 ">
      <CreateCaption title="Yo'nalish" isLoading={isLoading} />
      <div className="flex flex-col  gap-[20px] mt-5">
        <div className="w-[400px] mx-auto flex flex-col gap-[20px]">
          <label className="block text-gray-700 font-medium  ">
            Rasm yuklash
          </label>
         
          <UploadFiles image ={image} setImage={setImage}  />

          <br />
        </div>
        <div className="w-[400px] mx-auto">
          <label className="block text-gray-700 font-medium mb-2">
            Yo'nalish nomi
          </label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masalan: Frontend, Backend..."
            className="!w-[400px] !h-[55px] !rounded-xl border border-dashed border-gray-300 bg-gray-50 shadow-sm px-4 text-[16px] 
               placeholder-gray-400 focus:!border-[#bc8e5b] focus:!ring-2 focus:!ring-[#bc8e5b]/30 
               hover:border-[#bc8e5b] transition-all duration-300"
          />
        </div>
      </div>
    </form>
  );
};

export default StackCreate;
