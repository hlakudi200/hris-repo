// "use client";
// import React, { useEffect } from "react";
// import Image from "next/image";
// import styles from "./styles/styles.module.css";
// import { Button } from "antd";
// import { useEmployeeActions, useEmployeeState } from "@/providers/employee";
// import { useAuthState } from "@/providers/auth";

// const Profile = () => {
//   const { currentEmployee, isPending } = useEmployeeState();
//   const { currentUser } = useAuthState();
//   const { getEmployee } = useEmployeeActions();

//   useEffect(() => {
//     if (currentUser.id) {
//       debugger;
//       getEmployee(currentUser.id!);
//     }
//   }, []);

//   if (isPending) {
//     return (
//       <div className={styles.OuterContainer}>Loading employee data...</div>
//     );
//   }

//   if (currentEmployee === undefined) {
//     return <div className={styles.OuterContainer}>No employee data found</div>;
//   }

//   return (
//     <div className={styles.OuterContainer}>
//       <div className={styles.ImgContainer}>
//         <Image
//           width={150}
//           height={150}
//           src={"/images/profile-user.png"}
//           alt=""
//           style={{ marginTop: 20 }}
//         ></Image>
//         <div
//           style={{
//             fontWeight: 700,
//             fontSize: 31,
//             color: "#726D6D",
//             textAlign: "center",
//           }}
//         >
//           {currentUser.name} {currentUser.surname}
//         </div>
//       </div>

//       <div className={styles.InfoContainer}>
//         <div className={styles.subheading}>Position</div>
//         <div> {currentEmployee.position} </div>
//         <div className={styles.subheading}>Department</div>
//         <div>{currentEmployee.department} </div>
//         <div className={styles.subheading}>Employee no</div>
//         <div>{currentEmployee.employeeNumber}</div>
//         <div className={styles.subheading}>National Id no</div>
//         <div> {currentEmployee.nationalIdNumber}</div>
//       </div>
//       <div style={{ marginBottom: 20 }}>
//         <Button type="primary">Update profile</Button>
//       </div>
//     </div>
//   );
// };

// export default Profile;

// Replace the entire file with this updated version
"use client";
import React, { useEffect, useState } from "react"; // Add useState
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { Button, Modal, Form, Input, message } from "antd"; // Add Modal, Form, Input, DatePicker, message
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";
import { useAuthState } from "@/providers/auth";
import moment from "moment"; // Add moment import

const Profile = () => {
  const { currentEmployee, isPending, isSuccess } = useEmployeeState(); // Add isSuccess
  const { currentUser } = useAuthState();
  const { getEmployee, updateEmployee } = useEmployeeActions(); // Add updateEmployee
  const [isModalVisible, setIsModalVisible] = useState(false); // Add state for modal visibility
  const [form] = Form.useForm(); // Add form hook
  const [isSubmitting, setIsSubmitting] = useState(false); // Add submission state

  useEffect(() => {
    if (currentUser.id) {
      getEmployee(currentUser.id);
    }
  }, []);

  // Add useEffect for form values
  useEffect(() => {
    // Reset form with current employee data when modal is opened
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

  // Add useEffect for success handling
  useEffect(() => {
    // Close modal when update is successful
    if (isSuccess && isSubmitting) {
      setIsModalVisible(false);
      setIsSubmitting(false);
      message.success("Profile updated successfully");
    }
  }, [isSuccess, isSubmitting]);

  // Add modal handlers
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Add form submission handler
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
    <div className={styles.OuterContainer}>
      <div className={styles.ImgContainer}>
        <Image
          width={150}
          height={150}
          src={"/images/profile-user.png"}
          alt=""
          style={{ marginTop: 20 }}
        />
        <div
          style={{
            fontWeight: 700,
            fontSize: 31,
            color: "#726D6D",
            textAlign: "center",
          }}
        >
          {currentUser.name} {currentUser.surname}
        </div>
      </div>

      <div className={styles.InfoContainer}>
        <div className={styles.subheading}>Position</div>
        <div> {currentEmployee.position} </div>
        <div className={styles.subheading}>Department</div>
        <div>{currentEmployee.department} </div>
        <div className={styles.subheading}>Employee no</div>
        <div>{currentEmployee.employeeNumber}</div>
        <div className={styles.subheading}>National Id no</div>
        <div> {currentEmployee.nationalIdNumber}</div>
        <div className={styles.subheading}>Contact No</div>
        <div> {currentEmployee.contactNo}</div>
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={showModal}>
          Update profile
        </Button>
      </div>

      {/* Add Modal and Form */}
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
