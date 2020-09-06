import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Input, Select, message } from 'antd';
import { withRouter } from 'react-router-dom'
import { addPost, eaitPost } from '../serives/api'
import { getHome } from '../actions/home'
import { connect } from 'react-redux';
const { Option } = Select;
const CollectionCreateForm = ({ visible, onCreate, onCancel, value, txt }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (value.id) {
      form.setFieldsValue(value)
    }
    else {
      form.resetFields()
    }
  }, [value])
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <Modal
      visible={visible}
      title={txt}
      okText={txt}
      cancelText="Cancel"
      onCancel={onCancel}
      getContainer={false}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onCreate(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >

        <Form.Item
          name="name"
          label="赛事名称"
          rules={[
            {
              required: true,
              message: 'Please input the title of name!',
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="title"
          label="所属赛事"
          rules={[
            {
              required: true,
              message: 'Please input the title of title!',
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="第一届">第一届</Option>
            <Option value="第二届">第二届</Option>
            <Option value="第三届">第三届</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="types"
          label="赛事类型"
          rules={[
            {
              required: true,
              message: 'Please input the title of types!',
            },
          ]}
        >
          <Select
            showSearch
            style={{ width: 200 }}
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="县级赛事">县级赛事</Option>
            <Option value="市级赛事">市级赛事</Option>
            <Option value="省级赛事">省级赛事</Option>
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  );
};

const Forms = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({})
  const [txt, setTxt] = useState('添加')
  useEffect(() => {
    if (props.vale.id) {
      setValue(props.vale)
      setVisible(props.flag)
      setTxt(props.txt)
    }

  }, [props])
  const onCreate = async values => {
    console.log('Received values of form: ', values);
    setVisible(false);
    if (txt === '添加') {
      const p1 = await addPost(values)
      console.log(p1)
      if (p1.data.code === 200) {
        message.success('添加成功')
        props.getHome({ limit: 20, page: 1 })
      }
      else {
        message.error('添加失败')
      }
    }
    else {
      values.id = props.vale.id
      const eait = await eaitPost(values)
      if (eait.data.code === 200) {
        message.success('编辑成功')
        props.getHome({ limit: 20, page: 1 })
      }
      else {
        message.error('编辑失败')
      }
    }
    props.clear()
    setTxt('添加')
    setValue({})


  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        添加
      </Button>
      <CollectionCreateForm
        visible={visible}
        value={value}
        txt={txt}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          setTxt('添加')
          setValue({})
          props.clear()
        }}
      />
    </div>
  );
};
export default connect(
  null,
  {
    getHome
  }
)(withRouter(Forms))