import React from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import { loginPost } from '../../serives/api'
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 10,
  },
};

const Login = (props) => {
  const onFinish = values => {
    console.log('Success:', values);
    loginPost(values).then(res => {
      if (res.data.code === 200) {
        message.success('登录成功')
        localStorage.setItem('token', res.data.result)
        props.history.push('/home')
      }
      else {
        message.error('登陆失败')
      }
    })
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="userName"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="passWord"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>
      <div
        style={{ paddingLeft: '35%', boxSizing: 'border-box' }}
        onClick={() => { props.history.push('/reg') }}
      >
        点击前往注册
         </div>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default Login
