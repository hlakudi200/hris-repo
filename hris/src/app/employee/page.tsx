import React from "react";
import { Calendar, Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";
import Profile from "@/_componets/profileComponent/profile";
import styles from "./styles/global.module.css";

const Employee = () => {
  return (
    <div className={styles.employeeContainer}>
      <div className={styles.profileSection}>
        <Profile />
      </div>
      <div className={styles.calendarSection}>
        <Card title="Calendar" style={{ width: "100%", height: "100%" }}>
          <Calendar fullscreen={false} />
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview />
      </div>
    </div>
  );
};

export default Employee;
