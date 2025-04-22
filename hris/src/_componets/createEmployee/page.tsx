"use client";
import React, { useEffect, useState } from "react";
import {
  App,
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Popconfirm,
  Spin,
  Alert,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import {
  useEmployeeActions,
  useEmployeeState,
} from "@/providers/employee/index";
import moment from "moment";

const { Option } = Select;
const { Password } = Input;
const { Search } = Input;

const EmployeeManagement = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEmployeeId, setCurrentEmployeeId] = useState(null);
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const { isPending, isSuccess, isError, errorMessage, employees } =
    useEmployeeState();
  const { createEmployee, getAllEmployees, updateEmployee, deleteEmployee } =
    useEmployeeActions();

  const fetchEmployees = async () => {
    try {
      await getAllEmployees();
    } catch (error) {
      message.error("Failed to fetch employees");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    if (isSuccess && !isPending && localSubmitting) {
      setLocalSubmitting(false);
      setIsModalVisible(false);
      form.resetFields();
      setIsEditing(false);
      setCurrentEmployeeId(null);
      message.success(
        isEditing
          ? "Employee updated successfully"
          : "Employee created successfully"
      );
    }
  }, [isSuccess, isPending]);

  useEffect(() => {
    if (isError && errorMessage) {
      message.error(errorMessage);
      setLocalSubmitting(false);
    }
  }, [isError, errorMessage]);

  useEffect(() => {
    if (Array.isArray(employees)) {
      setFilteredData(employees);
    }
  }, [employees]);

  const handleSearch = (value) => {
    setSearchText(value);
    const lowerSearch = value.toLowerCase();
    const filtered = Array.isArray(employees)
      ? employees.filter(
          (employee) =>
            (employee.user?.name + " " + employee.user?.surname)
              .toLowerCase()
              .includes(lowerSearch) ||
            employee.position?.toLowerCase().includes(lowerSearch) ||
            employee.department?.toLowerCase().includes(lowerSearch)
        )
      : [];
    setFilteredData(filtered);
  };

  const showCreateModal = () => {
    form.resetFields();
    setIsEditing(false);
    setCurrentEmployeeId(null);
    setIsModalVisible(true);
  };

  const showEditModal = (employee) => {
    setIsEditing(true);
    setCurrentEmployeeId(employee.id);
    form.setFieldsValue({
      ...employee,
      dateOfBirth: employee.dateOfBirth ? moment(employee.dateOfBirth) : null,
      hireDate: employee.hireDate ? moment(employee.hireDate) : null,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsEditing(false);
    setCurrentEmployeeId(null);
  };

  const handleSubmit = async (values) => {
    setLocalSubmitting(true);
    try {
      const employeeData = {
        ...values,
        employeeNumber: " ",
        dateOfBirth: values.dateOfBirth?.format("YYYY-MM-DD"),
        hireDate: values.hireDate?.format("YYYY-MM-DD"),
      };

      if (isEditing && currentEmployeeId) {
        await updateEmployee({
          id: currentEmployeeId,
          ...employeeData,
        });
      } else {
        await createEmployee(employeeData);
      }
    } catch (error) {
      setLocalSubmitting(false);
      message.error(
        isEditing ? "Failed to update employee" : "Failed to create employee"
      );
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      message.success("Employee deleted successfully");
    } catch (error) {
      message.error("Failed to delete employee");
      console.error(error);
    }
  };

  const columns = [
    {
      title: "Employee ID",
      dataIndex: "employeeNumber",
      key: "employeeNumber",
      sorter: (a, b) => a.employeeNumber.localeCompare(b.employeeNumber),
    },
    {
      title: "Name",
      key: "fullName",
      render: (_, record) => `${record.user.name} ${record.user.surname}`,
      sorter: (a, b) =>
        `${a.user.name} ${a.user.surname}`.localeCompare(
          `${b.user.name} ${b.user.surname}`
        ),
    },
    {
      title: "Position",
      dataIndex: "position",
      key: "position",
      sorter: (a, b) => a.position.localeCompare(b.position),
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
      sorter: (a, b) => a.department.localeCompare(b.department),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      ellipsis: true,
    },
    {
      title: "Hire Date",
      dataIndex: "hireDate",
      key: "hireDate",
      render: (text) => (text ? moment(text).format("MMM DD, YYYY") : "-"),
      sorter: (a, b) => moment(a.hireDate).unix() - moment(b.hireDate).unix(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="text"
          />
          <Popconfirm
            title="Delete Employee"
            description="Are you sure you want to delete this employee?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const availableRoles = ["Employee", "Manager", "HR"];

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>Employees</h2>
        <Search
          placeholder="Search by name, position or department"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          value={searchText}
          enterButton
          allowClear
          style={{ maxWidth: 400, marginBottom: 20 }}
        />
        <Space>
          <Button
            icon={<ReloadOutlined />}
            onClick={fetchEmployees}
            loading={isPending}
          >
            Refresh
          </Button>

          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showCreateModal}
          >
            Add Employee
          </Button>
        </Space>
      </div>

      {isError && errorMessage && (
        <Alert
          message="Error"
          description={errorMessage}
          type="error"
          showIcon
          style={{ marginBottom: "16px" }}
        />
      )}

      <Table
        columns={columns}
        dataSource={filteredData}
        rowKey="id"
        loading={isPending}
        pagination={{
          pageSize: 4,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} employees`,
        }}
      />

      <Modal
        title={isEditing ? "Edit Employee" : "Add New Employee"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
        width={800}
      >
        <Spin spinning={isPending || localSubmitting} tip="Processing...">
          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            {/* Form fields remain the same */}
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

              {!isEditing && (
                <Form.Item
                  name="password"
                  label="Password"
                  rules={[
                    { required: !isEditing, message: "Please enter password" },
                  ]}
                  style={{ flex: 1 }}
                >
                  <Password placeholder="Enter password" />
                </Form.Item>
              )}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "8px",
                }}
              >
                <Button onClick={handleCancel}>Cancel</Button>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPending || localSubmitting}
                >
                  {isEditing ? "Update" : "Create"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Spin>
      </Modal>
    </div>
  );
};

// Wrap with App component to provide message context
const EmployeeManagementWithApp = () => (
  <App>
    <EmployeeManagement />
  </App>
);

export default EmployeeManagementWithApp;
