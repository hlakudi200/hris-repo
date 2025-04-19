"use client";
import LeaveForm from "@/_componets/leaveFormComponent/leaveForm";
import LeaveOverview from "@/_componets/leaveOverviewComponent/leaveOverview";
import styles from "./styles/global.module.css";
import ViewLeaveRequests from "@/_componets/viewLeaveRequests/viewLeaveRequests";

const LeavePage: React.FC = () => {
  return (
    <div className={styles.leaveContainer}>
      <div className={styles.subSection}>
        <LeaveOverview />
      </div>
      <div className={styles.subSection}>
        <LeaveForm />
      </div>
      <div className={styles.requestsSection}>
        <ViewLeaveRequests />
      </div>
    </div>
  );
};

export default LeavePage;
