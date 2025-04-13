import React from "react";
import { Calendar, Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";
// import LeaveOverview from "@/_componets/leaveOverviewComponent/leaveOverview";
import Profile from "@/_componets/profileComponent/profile";
import styles from "./styles/global.module.css"// Adjust the path if needed

const Employee = () => {
  return (
    <div className={styles.employeeContainer}>
      <div className={styles.profileSection}>
        <Profile />
      </div>
      <div className={styles.calendarSection}>
        <Card title="Calendar" style={{ width: "100%" }}>
          <Calendar fullscreen={false} />
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview />
        {/* <LeaveOverview /> */}
      </div>
    </div>
  );
};

export default Employee;
