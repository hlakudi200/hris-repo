"use client";
import AttendanceForm from "@/_componets/attandanceFormComponent/attandanceForm";
import styles from "./styles/styles.module.css";
import { Calendar, Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";

const LogHoursPage: React.FC = () => {
  return (
    <div className={styles.mainContainer} style={{ marginTop: -40 }}>
      <div className={styles.subSection}>
        <AttendanceForm />
      </div>
      <div className={styles.calendarSection}>
        <Card
          title="Calendar"
          style={{ width: "100%", height: "100%", padding: 0 }}
        >
          <Calendar
            fullscreen={false}
            style={{ height: 40, marginBottom: 10 }}
          />
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview showRecordButton={false} />
      </div>
    </div>
  );
};

export default LogHoursPage;
