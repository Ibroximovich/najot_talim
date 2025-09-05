
import React, { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { LoadingOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import { API } from "../hooks";



type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (img: FileType, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const beforeUpload = (file: FileType) => {
  const isImage = file.type.startsWith("image/"); // faqat rasm fayllariga ruxsat
  if (!isImage) {
    message.error("Faqat rasm fayllarini yuklash mumkin!");
  }
  return isImage;
};


const UploadFiles: React.FC<{ image:string ,setImage: Dispatch<SetStateAction<string>>}> = ({
  setImage,image
}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();

  
  
  
  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as FileType, (url) => {
        setLoading(false);
        setImageUrl(url);

      });
      setImage(info.file.response.filename);
    }
  
  };

  const uploadButton = (
    <div className="flex flex-col items-center justify-center w-[400px] h-[200px] rounded-2xl border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-500 cursor-pointer shadow-sm hover:shadow-lg">
      {loading ? (
        <LoadingOutlined className="text-3xl text-blue-500 animate-spin" />
      ) : (
        <PlusOutlined className="text-3xl bg-gradient-to-tr from-blue-500 to-purple-500 text-transparent bg-clip-text" />
      )}
      <div className="mt-2 text-gray-600 font-semibold tracking-wide">
        Rasm qo‘shish
      </div>
    </div>
  );

  useEffect(() =>{
    if(image){
      setImageUrl(image)
    }
  },[image])
  return (
    <Flex gap="middle" wrap className="!mt-[40px] justify-center" >
      <Upload 
        name="file"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action={`${API}/file`}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >

       
        
        {imageUrl ? (
          
          <div className="relative group w-[400px] h-[200px]">
            
            
            
            
            <img
              className="w-full h-full object-cover rounded-2xl shadow-md"
              src={ imageUrl}
              alt="avatar"
            />
          
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <DeleteOutlined className="text-white text-2xl cursor-pointer hover:text-red-400 transition-colors" />
            </div>
          </div>
        ) : (
          uploadButton
        )}
      </Upload>
    </Flex>
  );
};

export default UploadFiles;
