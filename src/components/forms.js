import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select } from 'antd';
const { Option } = Select;
const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
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

const Forms = () => {
  const [visible, setVisible] = useState(false);

  const onCreate = values => {
    console.log('Received values of form: ', values);
    setVisible(false);
  };

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        New Collection
      </Button>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
export default Forms