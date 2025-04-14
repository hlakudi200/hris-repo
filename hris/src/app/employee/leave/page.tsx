"use client";
import LeaveForm from "@/_componets/leaveFormComponet/leaveForm";
import LeaveOverview from "@/_componets/leaveOverviewComponent/leaveOverview";
import styles from "./styles/global.module.css";

const LeavePage: React.FC = () => {
  return (
    <div className={styles.leaveContainer}>
      <div className={styles.subSection}>
        <LeaveOverview />
      </div>
      <div className={styles.subSection}>
        <LeaveForm />
      </div>
    </div>
  );
};

export default LeavePage;
