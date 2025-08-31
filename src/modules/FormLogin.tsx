import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button,  Form, Input } from 'antd';
import { LogoIcon } from '../assets/icons';
import axios from 'axios';
import { API } from '../hooks';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify';

const FormLogin: React.FC = () => {
    const [isLoading, setIsloading] = useState<boolean>(false)
    const [,setcookies] = useCookies()
    const onFinish = (values: any) => {
    setIsloading(true)
    console.log('Received values of form: ', values);
    axios.post(`${API}/user/login`,values).then(res =>{
    
      toast.success("Muvaffaqqiyatli kirdingiz", {
        onClose: () =>{
            setIsloading(false)
            setcookies("accessToken",res.data.accessToken)
            location.pathname = "/"
        },
        autoClose:3000
      })
    })
  };

  return (
    <div className='w-full'>
        <div className='flex items-center gap-[10px] justify-center mb-[20px]'>
          <LogoIcon classlist='!w-[60px] !h-[60px]'/>
          <span className='font-medium '>Admin panel</span>
        </div>
    <Form className='w-full'
      name="login"
      initialValues={{ remember: true }}
      style={{ maxWidth: 360 }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Iltimos username kiriting!' }]}
      >
        <Input size='large' allowClear prefix={<UserOutlined />} placeholder="Kirish" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Iltimos parol kiriting!' }]}
      >
        <Input.Password size='large' allowClear prefix={<LockOutlined />} type="password" placeholder="maxfiy so'z" />
      </Form.Item>
        <Button loading ={isLoading} className='!bg-[#bc8e5b]  ' size='middle' type='primary' block  htmlType="submit">
          Kirish
        </Button>
    </Form>

    </div>
  );
};

export default FormLogin;