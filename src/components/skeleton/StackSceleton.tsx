import { Skeleton } from "antd"

const StackSceleton = () => {
  return (
    <div className="flex justify-between flex-wrap gap-[20px] px-3">
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
        <div className="w-[240px] h-[300px]">
            <Skeleton.Button  className="!w-full !h-full" active />
        </div>
    </div>
  )
}

export default StackSceleton
