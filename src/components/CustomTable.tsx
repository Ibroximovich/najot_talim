

import {  Table } from 'antd';



const CustomTable: React.FC<{columns:any[],data:any[],trues:boolean}> = ({columns,data,trues}) => {

  return (
    <>
     
      <Table  size='large' className="custom-table" loading ={trues}  columns={columns} dataSource={data}  />
    </>
  );
};

export default CustomTable;