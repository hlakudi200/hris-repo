"use client";

import React from "react";
import {
  useEmployeeActions,
  useEmployeeState,
} from "@/providers/employee/index";
import { ICreateEmployeeRequest } from "@/providers/employee/context";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  message,
  Spin,
} from "antd";

import { Moment } from "moment";

const { Option } = Select;
const { Password } = Input;

interface CreateEmployeeFormValues {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
  employeeNumber: string;
  contactNo: string;
  dateOfBirth: Moment;
  nationalIdNumber: string;
  hireDate: Moment;
  position: string;
  department: string;
  managerId: string;
  roleNames: string[];
}

const CreateEmployeeForm = () => {
  const { createEmployee } = useEmployeeActions();
  const { isPending, isSuccess, isError, errorMessage } = useEmployeeState();
  const [form] = Form.useForm<CreateEmployeeFormValues>();

  const availableRoles = ["Employee", "Manager", "HR"];

  const onFinish = async (values: CreateEmployeeFormValues) => {
    const employeeData: ICreateEmployeeRequest = {
      ...values,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : null,
      hireDate: values.hireDate ? values.hireDate.format("YYYY-MM-DD") : null,
    };

    try {
      await createEmployee(employeeData);
    } catch {}
  };

  React.useEffect(() => {
    if (isError && errorMessage) {
      message.error(errorMessage);
    }
  }, [isError, errorMessage]);

  React.useEffect(() => {
    if (isSuccess) {
      message.success("Employee created successfully!");
    }
  }, [isSuccess]);

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <Card title="Create New Employee" bordered={false}>
        <Spin spinning={isPending} tip="Creating employee...">
          <Form
            form={form}
            name="createEmployee"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="name"
                label="First Name"
                rules={[{ required: true, message: "Please enter first name" }]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter first name" />
              </Form.Item>

              <Form.Item
                name="surname"
                label="Last Name"
                rules={[{ required: true, message: "Please enter last name" }]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter last name" />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please enter email" },
                  { type: "email", message: "Please enter a valid email" },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>

              <Form.Item
                name="contactNo"
                label="Contact Number"
                rules={[
                  { required: true, message: "Please enter contact number" },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter contact number" />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Please enter username" }]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter username" />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: "Please enter password" }]}
                style={{ flex: 1 }}
              >
                <Password placeholder="Enter password" />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="nationalIdNumber"
                label="National ID Number"
                rules={[
                  {
                    required: true,
                    message: "Please enter national ID number",
                  },
                ]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter national ID number" />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="dateOfBirth"
                label="Date of Birth"
                rules={[
                  { required: true, message: "Please select date of birth" },
                ]}
                style={{ flex: 1 }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="hireDate"
                label="Hire Date"
                rules={[{ required: true, message: "Please select hire date" }]}
                style={{ flex: 1 }}
              >
                <DatePicker style={{ width: "100%" }} />
              </Form.Item>
            </div>

            <div style={{ display: "flex", gap: "20px" }}>
              <Form.Item
                name="position"
                label="Position"
                rules={[{ required: true, message: "Please enter position" }]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter position" />
              </Form.Item>

              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: "Please enter department" }]}
                style={{ flex: 1 }}
              >
                <Input placeholder="Enter department" />
              </Form.Item>
            </div>

            <Form.Item
              name="roleNames"
              label="Roles"
              rules={[
                { required: true, message: "Please select at least one role" },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Select roles"
                style={{ width: "100%" }}
              >
                {availableRoles.map((role) => (
                  <Option key={role} value={role}>
                    {role}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Create Employee
              </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    </div>
  );
};

const CreateEmployeePage = () => {
  return <CreateEmployeeForm />;
};

export default CreateEmployeePage;
