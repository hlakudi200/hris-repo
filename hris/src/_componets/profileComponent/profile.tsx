"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { Button } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";
import { useAuthState } from "@/providers/auth";

const Profile = () => {
  const { currentEmployee, isPending } = useEmployeeState();
  const { currentUser } = useAuthState();
  const { getEmployee } = useEmployeeActions();

  useEffect(() => {
    if (currentUser.id) {
      debugger;
      getEmployee(currentUser.id!);
    }
  }, []);

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
        ></Image>
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
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary">Update profile</Button>
      </div>
    </div>
  );
};

export default Profile;
