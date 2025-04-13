import AttendanceForm from "@/_componets/attandanceFormComponent/attandanceForm";
import styles from "../styles/global.module.css"
import { Calendar, Card } from "antd";
import AttendanceOverview from "@/_componets/attandaceComponent/attandanceOverview";

const LogHoursPage: React.FC = () => {
  return (
    <div className={styles.employeeContainer}>
      <div className={styles.profileSection}>
      <AttendanceForm/>
      </div>
       <div className={styles.calendarSection}>
        <Card title="Calendar" style={{ width: "100%" }}>
          <Calendar fullscreen={false} />
        </Card>
      </div>
      <div className={styles.attendanceSection}>
        <AttendanceOverview/>
      </div>
    </div>
  );
};

export default LogHoursPage;
