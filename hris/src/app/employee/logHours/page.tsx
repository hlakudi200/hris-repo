"use client";
import AttendanceForm from "@/_componets/attandanceFormComponent/attandanceForm";
import styles from "./styles/styles.module.css";
import { Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";
import LeaveCalendar from "@/_componets/leaveCalendar/leaveCalendar";

const LogHoursPage: React.FC = () => {
  return (
    <div className={styles.mainContainer} style={{ marginTop: -20 }}>
      <div className={styles.subSection}>
        <AttendanceForm />
      </div>
      <div className={styles.calendarSection}>
        <Card
          title="Calendar"
          style={{ width: "100%", height: "100%", padding: 0 }}
        >
          <LeaveCalendar />
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview showRecordButton={false} />
      </div>
    </div>
  );
};

export default LogHoursPage;
