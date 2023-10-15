import { Button, Col, DatePicker, Divider, Form, Input, InputNumber, Modal, Row, Upload } from 'antd';
import { useEffect, useState } from 'react';

import { ExclamationCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import useAxios from '../../../../utils/request';
import {  API_USER, deteleUserImage } from '../../../../api/user';

function AddUser() {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const UserId = useParams();
  const [form] = Form.useForm();
  const api = useAxios();

  useEffect(() => {
    if (UserId.id) {
      const fectchApi = async () => {
        try {
          const response = await api.get(API_USER + '/' + UserId.id);
          form.setFieldsValue({
            id: UserId.id,
            name: response.data.name,
            position: response.data.position,
            national: response.data.national,
            weight: response.data.weight,
            height: response.data.height,
            number: response.data.number,
            // dateOfBirth: new Date(response.data.dateOfBirth.format('dd/MM/yyyy')).toLocaleDateString(),
            image: null,
          });
        } catch (error) {
          console.log(error);
        }
      };
      fectchApi();
    }
  }, []);

  const handleImageRemoved = async (info) => {
    console.log('removed');

    if (info.fileName) {
      try {
        await api.delete(deteleUserImage(info.fileName));
      } catch (error) {
        console.log(error);
      }
    } else if (info.response && info.response.filename) {
      try {
        await api.delete(deteleUserImage(info.response.filename));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    if (e.fileList.length > 1) {
      return [e.fileList[0]];
    }

    return e && e.fileList;
  };

  const onSubmitForm = (formValue) => {
    console.log(formValue);
    if (formValue.image !== null) {
      formValue = {
        ...formValue,
        image: formValue.image[0].response,
        dateOfBirth: formValue.dateOfBirth.format('YYYY-MM-DD'),
      };
      console.log(formValue);
    }
    if (!UserId.id) {
      api
        .post(API_USER, formValue)
        .then((res) => {
          console.log(res);
          form.setFieldsValue({
            name: '',
            position: '',
            national: '',
            height: '',
            weight: '',
            number: '',
            dateOfBirth: null,
            image: null,
          });
          Modal.confirm({
            icon: <ExclamationCircleOutlined />,
            title: 'OK',
            content: 'Add Player success',
            onOk: () => navigate('/players/list'),
            cancelText: 'Continue Add Player?',
            okText: 'List Players',
          });
        })
        .catch((res) => {
          if (res.response?.status === 403) {
            setError('You are not admin, you do not have permission!');
          } else {
            setError(res.response.data.message);
          }
        });
    } else {
      api
        .patch(API_USER + '/' + UserId.id, formValue)
        .then((res) => {
          console.log(res);
          Modal.success({
            title: 'OK',
            content: 'Edit Player success',
            onOk: () => navigate('/players/list'),
            okText: 'List Players',
          });
        })
        .catch((res) => {
          if (res.response?.status === 403) {
            setError('You are not admin, you do not have permission!');
          } else {
            setError(res.response.data.message);
          }
        });
    }
  };
  return (
    <div>
      <h1>{UserId.id ? 'Update Players' : 'Add Players'}</h1>
      <Divider></Divider>
      <Form form={form} layout="vertical" className="form" onFinish={onSubmitForm} key={UserId.id}>
        <Row>
          <Col md={12}>
            <Col md={18}>
              {UserId.id && (
                <Form.Item label="Player ID" name="id">
                  <Input readOnly />
                </Form.Item>
              )}

              <Form.Item label="Name" name="name" rules={[{ required: true, min: 2 }]}>
                <Input />
              </Form.Item>

              <Form.Item label="National" name="national" rules={[{ required: true, min: 2 }]}>
                <Input />
              </Form.Item>

              <Form.Item
                label="Number"
                name="number"
                rules={[
                  { required: true, message: 'This field is required!' },
                  {
                    type: 'number',
                    message: 'Please input number!',
                  },
                ]}
              >
              <InputNumber
              style={{ width: '100%' }}
                ></InputNumber>
              </Form.Item>

              <Form.Item
                label="Height"
                name="height"
                rules={[
                  { required: true, message: 'This field is required!' },
                  {
                    type: 'number',
                    message: 'Please input number!',
                  },
                ]}
              >
              <InputNumber
              style={{ width: '100%' }}
                ></InputNumber>
              </Form.Item>

              <Form.Item
                label="Weight"
                name="weight"
                rules={[
                  { required: true, message: 'This field is required!' },
                  {
                    type: 'number',
                    message: 'Please input number!',
                  },
                ]}
              >
              <InputNumber
              style={{ width: '100%' }}
                ></InputNumber>
              </Form.Item>

            </Col>
          </Col>
          <Col md={1}>
            <Divider type="vertical" style={{ height: '100%' }}></Divider>
          </Col>
          <Col md={11}>
            <Col md={18}>
            <Form.Item label="Position" name="position" rules={[{ required: true, min: 2 }]}>
                <Input />
              </Form.Item>


              <Form.Item
                            label = 'Date Of Birth'
                            name="dateOfBirth"
                            rules = {[{required: true}]}
                            hasFeedback
                            >
                                <DatePicker></DatePicker>
                        </Form.Item>


              <Form.Item
                label="Main Image"
                name="image"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                rules={[{ required: UserId.id ? false : true }]}
              >
                <Upload
                  listType="picture"
                  accept=".jpg,.png,.gif"
                  maxCount={1}
                  onRemove={handleImageRemoved}
                  action={API_USER + '/images'}
                >
                  <Button icon={<UploadOutlined />}></Button>
                </Upload>
              </Form.Item>


            </Col>
            <span style={{ color: 'red' }}>{error}</span>
            <Divider></Divider>
            <Col md={18}>
              <Button htmlType="submit" type="primary" style={{ float: 'left' }}>
                Submit
              </Button>
            </Col>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AddUser;
