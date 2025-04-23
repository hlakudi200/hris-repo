import React from "react";
import {Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";
import Profile from "@/_componets/profileComponent/profile";
import styles from "./styles/global.module.css";
import LeaveCalendar from "@/_componets/leaveCalendar/leaveCalendar";


const Employee = () => {
  return (
    <div className={styles.container} style={{marginTop: -20 }}>
      <div className={styles.leftSection}>
        <Profile />
      </div>
      <div className={styles.midSection}>
        <Card title="Calendar" style={{ width: "100%", height: "100%" }}>
          <LeaveCalendar />
        </Card>
      </div>
      <div className={styles.rightSection}>
        <AttendanceOverview />
      </div>
    </div>
  );
};

export default Employee;
