import { Link } from "react-router-dom"
import { useState, useContext } from "react"
// import { AuthContext } from '../../contexts/AuthContext'
// import AlertMessage from '../layout/AlertMessage'
import axios from "axios"
import "./LoginForm.scss"
import { Input, Button, Form } from "antd"
import { useForm } from "antd/lib/form/Form"

interface LoginRequest {
   username: string
   password: string
}

interface LoginResponse {
   token: string
   expiresIn: number
   role: number
   fullName: string
   phone: string
   email: string
   id: string
}

const LoginForm: React.FC = () => {
   const [form] = useForm()

   const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
      let res = await axios.post("https://trustpay-dev-cms-api.demoapp.info/cms/auth/sign-in", data)
      return res.data
   }

   const login = async (event: any) => {
      event.preventDefault()
      let data = form.getFieldsValue()
      try {
         const res = await loginUser(data)
         if (res?.token) {
            localStorage.setItem("accessToken", res.token)
            console.log("login successfully")
         }
      } catch (error) {
         console.log(error)
      }
   }

   return (
      <div className='login-form'>
         <Form
            form={form}
            name='basic'
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
         >
            <Form.Item
               label='Username'
               name='username'
               rules={[{ required: true, message: "Please input your username!" }]}
            >
               <Input />
            </Form.Item>

            <Form.Item
               label='Password'
               name='password'
               rules={[{ required: true, message: "Please input your password!" }]}
            >
               <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
               <Button type='primary' htmlType='submit' onClick={login}>
                  Submit
               </Button>
            </Form.Item>
         </Form>
      </div>
   )
}

export default LoginForm
