"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { Button, Modal, Form, Input, message } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";
import globals from "../globals.module.css";

import { useAuthState } from "@/providers/auth";
import moment from "moment";

const Profile = () => {
  const { currentEmployee, isPending, isSuccess } = useEmployeeState();
  const { currentUser } = useAuthState();
  const { getEmployee, updateEmployee } = useEmployeeActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      getEmployee(currentUser.id);
    }
  }, []);

  useEffect(() => {
    if (isModalVisible && currentEmployee) {
      form.setFieldsValue({
        contactNo: currentEmployee.contactNo,
        position: currentEmployee.position,
        department: currentEmployee.department,
        nationalIdNumber: currentEmployee.nationalIdNumber,
        dateOfBirth: currentEmployee.dateOfBirth
          ? moment(currentEmployee.dateOfBirth)
          : null,
        hireDate: currentEmployee.hireDate
          ? moment(currentEmployee.hireDate)
          : null,
      });
    }
  }, [isModalVisible, currentEmployee]);

  useEffect(() => {
    if (isSuccess && isSubmitting) {
      setIsModalVisible(false);
      setIsSubmitting(false);
      message.success("Profile updated successfully");
    }
  }, [isSuccess, isSubmitting]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSubmit = async (values) => {
    if (!currentEmployee) return;

    setIsSubmitting(true);

    const updateData = {
      ...currentEmployee,
      contactNo: values.contactNo,
      position: values.position,
      department: values.department,
      nationalIdNumber: values.nationalIdNumber,
      dateOfBirth: values.dateOfBirth
        ? values.dateOfBirth.format("YYYY-MM-DD")
        : currentEmployee.dateOfBirth,
      hireDate: values.hireDate
        ? values.hireDate.format("YYYY-MM-DD")
        : currentEmployee.hireDate,
    };

    try {
      await updateEmployee(updateData);
    } catch {
      setIsSubmitting(false);
      message.error("Failed to update profile");
    }
  };

  if (isPending) {
    return (
      <div className={styles.OuterContainer}>Loading employee data...</div>
    );
  }

  if (currentEmployee === undefined) {
    return <div className={styles.OuterContainer}>No employee data found</div>;
  }

  return (
    <div className={globals.OuterContainer}>
      <div className={styles.ImgContainer}>
        <Image
          width={100}
          height={100}
          src={"/images/profile-user.png"}
          alt=""
          style={{ marginTop: 20 }}
          className={styles.profileImage}
        ></Image>
        <div
          style={{
            textAlign: "center",
          }}
          className={globals.heading}
        >
          {currentUser.name} {currentUser.surname}
        </div>
      </div>

      <div className={globals.InfoContainer}>
        <div className={globals.subheading}>Position</div>
        <div> {currentEmployee.position} </div>
        <div className={globals.subheading}>Department</div>
        <div>{currentEmployee.department} </div>
        <div className={globals.subheading}>Employee no</div>
        <div>{currentEmployee.employeeNumber}</div>
        <div className={globals.subheading}>National Id no</div>
        <div> {currentEmployee.nationalIdNumber}</div>
        <div className={styles.subheading}>Contact No</div>
        <div> {currentEmployee.contactNo}</div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Update profile
        </Button>
      </div>

      <Modal
        title="Update Profile"
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="position" label="Position">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
          <Form.Item name="nationalIdNumber" label="National ID Number">
            <Input />
          </Form.Item>
          <Form.Item name="contactNo" label="Contact Number">
            <Input />
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
              <Button type="primary" htmlType="submit" loading={isSubmitting}>
                Save Changes
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Profile;
