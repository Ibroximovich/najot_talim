import { useEffect, useState } from "react";
import { PagesCaption, StackSceleton } from "../../../components";
import instance from "../../../hooks/instance";
import type { StackType } from "../../../@types/StackType";
import {  Card,  } from "antd";
import { API } from "../../../hooks";

import { useNavigate } from "react-router-dom";

const Stack = () => {
  const [stacks, setStacks] = useState<Array<StackType>>([]);
  const [isLoading, setIsloading] = useState<boolean>(false);
  const navigate = useNavigate()

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

  

 

  return (
    <div className="p-2">
      <div className="bg-white h-[90vh] overflow-y-auto">
        <PagesCaption title="Yon'alishlar" count={stacks.length} />
        {isLoading ? (
          <StackSceleton />
        ) : (
          <div className="flex justify-between flex-wrap p-5 gap-[20px]">
            {stacks.map((item) => (
              <Card onClick={() => navigate(`${item.id}`)}
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

                
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Stack;
