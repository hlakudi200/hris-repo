"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { Button } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";
import globals from "../globals.module.css";

//import { useAuthState } from "@/providers/auth";

const Profile = () => {
  const { currentEmployee, isPending } = useEmployeeState();
  //const { currentUser } = useAuthState();
  const { getEmployee } = useEmployeeActions();

  useEffect(() => {
    // if (currentUser.id) {

    //   getEmployee(3);
    // }
    getEmployee(3);
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
    <div className={globals.OuterContainer}>
      <div className={styles.ImgContainer}>
        <Image
          width={150}
          height={150}
          src={"/images/profile-user.png"}
          alt=""
          style={{ marginTop: 20,}}
          className={styles.profileImage}
        ></Image>
        <div
          style={{
            textAlign: "center",
          }
        }
        className={globals.heading}
        >
          {"Rapudi"} {"Hlakudi"}
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
      </div>
      <div style={{ marginBottom: 20 }}>
        <Button type="primary">Update profile</Button>
      </div>
    </div>
  );
};

export default Profile;
