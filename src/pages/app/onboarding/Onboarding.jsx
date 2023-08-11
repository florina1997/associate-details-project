import React, { useEffect, useState } from "react";
import "./onboarding.css";
import { Button, Col, Form, Modal, Row, Table, Popconfirm, Space } from "antd";
import baseUrl from "../../../common/baseUrl";
import axios from "axios";
import OnboardingMadal from "./OnboardingMadal";

function Onboarding() {
  const [form] = Form.useForm();
  const [reload, setReload] = useState(false);
  const [data, setData] = useState([]);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [editForm, setEditForm] = useState();
  const [editVal, setEditVal] = useState();

  useEffect(() => {
    axios
      .post(`${baseUrl}/get_all`, {})
      .then(function (response) {
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.log("myArray is not an array");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [reload]);

  const showModal = () => {
    form.resetFields();
    setIsModalOpenAdd(true);
  };
  const handleOk = () => {
    setIsModalOpenAdd(false);
  };
  const handleCancel = () => {
    form.resetFields();
    setIsModalOpenAdd(false);
  };
  const handleDelete = (key) => {
    console.log("delete", key);
    axios
      .get(`${baseUrl}/delete_user/${key._id}`)
      .then(function (response) {
        console.log("response", response);
        setReload(!reload);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleEdit = (record, edit) => {
    setEditVal(edit);
    console.log(edit);
    setEditForm(record);
    setIsModalOpenEdit(true);
  };

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "NAME",
    },
    {
      title: "Email",
      dataIndex: "EMAIL",
    },
    {
      title: "Mobile No.",
      dataIndex: "MOBILE",
    },
    {
      title: "Country",
      dataIndex: "COUNTRY",
    },
    {
      title: "Role",
      dataIndex: "ROLE",
    },

    {
      title: "operation",
      dataIndex: "operation",
      render: (_, record) =>
        data.length >= 1 ? (
          <>
            <Space>
              <Button type="link">
                <Popconfirm
                  title="Sure to delete?"
                  onConfirm={() => handleDelete(record)}
                >
                  <a>Delete</a>
                </Popconfirm>
              </Button>

              <Button type="link" onClick={() => handleEdit(record, "edit")}>
                Edit
              </Button>
            </Space>
          </>
        ) : null,
    },
  ];

  return (
    <div className="onboarding-container">
      <Row gutter={[24, 24]}>
        <Col span={20}>
          <h2>User Onboarding</h2>
        </Col>

        <Col>
          <Button
            type="primary"
            onClick={() => {
              showModal();
            }}
          >
            Add User
          </Button>

          <Modal
            title="User Form"
            open={isModalOpenAdd}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            destroyOnClose={true}
          >
            <OnboardingMadal
              form={form}
              onReset={onReset}
              setIsModalOpenAdd={setIsModalOpenAdd}
              setIsModalOpenEdit={setIsModalOpenEdit}
              setReload={setReload}
              reload={reload}
            />
          </Modal>
        </Col>
      </Row>

      <div>
        <Table columns={columns} dataSource={data} />
      </div>
      <Modal
        title="Edit Form"
        open={isModalOpenEdit}
        onOk={() => setIsModalOpenEdit(false)}
        onCancel={() => setIsModalOpenEdit(false)}
        footer={false}
        destroyOnClose={true}
      >
        <OnboardingMadal
          form={form}
          onReset={onReset}
          editForm={editForm}
          editVal={editVal}
          setIsModalOpenEdit={setIsModalOpenEdit}
          setIsModalOpenAdd={setIsModalOpenAdd}
          setReload={setReload}
          reload={reload}
        />
      </Modal>
    </div>
  );
}

export default Onboarding;
