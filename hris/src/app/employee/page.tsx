import React from "react";
import {Calendar, Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";
import Profile from "@/_componets/profileComponent/profile";
import styles from "./styles/global.module.css";


const Employee = () => {
  return (
    <div className={styles.employeeContainer} style={{marginTop: -40 }}>
      <div className={styles.profileSection}>
        <Profile />
      </div>
      <div className={styles.calendarSection}>
        <Card title="Calendar" style={{ width: "100%", height: "100%" }}>
          <Calendar fullscreen={false} style={{height: 50}}/>
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview />
        {/* <Button onClick={()=>{()=>{router.push()}}}>Record Attandace</Button> */}
      </div>
    </div>
  );
};

export default Employee;
