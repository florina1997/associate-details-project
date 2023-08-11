import { Button, Form, Input, Select } from "antd";
import React, { useEffect } from "react";
import Onboarding from "./Onboarding";
import axios from "axios";
import baseUrl from "../../../common/baseUrl";
import moment from "moment";

function OnboardingMadal({
  form,
  onReset,
  editForm,
  editVal,
  setIsModalOpenAdd,
  setIsModalOpenEdit,
  setReload,
  reload,
}) {
  useEffect(() => {
    if (editForm) {
      console.log("1111", editForm, editForm?.NAME);
      form.setFieldsValue({
        name: editForm?.NAME,
        email: editForm?.EMAIL,
        mobile: editForm?.MOBILE,
        country: editForm?.COUNTRY,

        role: editForm?.ROLE,
        password: editForm?.PASSWORD,
      });
    }
  }, [editForm, form]);

  const onFinish = (values) => {
    console.log("Success:", values);
    const obj = {
      NAME: values.name,
      EMAIL: values.email,
      MOBILE: values.mobile,
      COUNTRY: values.country,
      ROLE: values.role,
      PASSWORD: values.password,
      CREATED_ON: moment().format("DD-MM-YYYY HH:mm:ss"),
    };

    const editData = form.getFieldsValue();
    const editNewData = {
      NAME: editData?.name,
      EMAIL: editData?.email,
      MOBILE: editData?.mobile,
      COUNTRY: editData?.country,
      ROLE: editData?.role,
      PASSWORD: editData?.password,
    };

    const ApiData = editForm ? editNewData : obj;

    axios
      .post(`${baseUrl}/create_user`, ApiData)
      .then(function (response) {
        console.log("response", response);
        setIsModalOpenAdd(false);
        document.getElementById("close").reset();
        setIsModalOpenEdit(false);

        // if (editNewData) {
        //   console.log(" florina");
        //   setIsModalOpenAdd(false);
        //   document.getElementById("close").reset();
        // }
        //  else if (!editNewData) {
        //   console.log("rash");
        //   setIsModalOpenEdit(false);
        // }
        // else {
        //   alert("nothing to change");
        // }

        setReload(!reload);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div>
      <Form
        id="close"
        form={form}
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={editForm ? true : null}
        onFinish={onFinish}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[
            {
              required: true,
              message: "Please input your name!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: "email",
              message: "Please input your email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Mobile No."
          name="mobile"
          rules={[
            {
              required: true,
              pattern: new RegExp(/^[0-9]+$/),
              message: "Please input your mobile no.!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Country"
          name="country"
          rules={[
            {
              required: true,
              message: "Please input your country!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[
            {
              required: true,
              message: "Please input your role!",
            },
          ]}
        >
          <Select name="category" placeholder="Please select a role">
            <Option value="HR">HR</Option>
            <Option value="Associate">Associate</Option>
            <Option value="Manager">Manager</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 5,
              message: "Username must be minimum 5 characters.",
            },
            {
              pattern: new RegExp(
                "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
              ),
              message:
                "Password must contain at least one lowercase letter, uppercase letter, number, and special character",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="validatepassword"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The new password that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
          {!editVal ? (
            <Button
              style={{ marginLeft: "0.5rem" }}
              type="primary"
              htmlType="button"
              onClick={onReset}
            >
              Reset
            </Button>
          ) : null}
        </Form.Item>
      </Form>
    </div>
  );
}

export default OnboardingMadal;
