import React from "react";
import styles from "./styles/styles.module.css";
import globals from "../globals.module.css";
import { Button } from "antd";

const LeaveOverview = () => {
  return (
    <div className={styles.OuterContainer}>
      <div className={globals.heading} style={{paddingTop:20}}>Leave Overview</div>
      <div className={styles.InfoContainer}>
        <div className={globals.subheading}>Annual leave</div>
        <div>Graduate Software developer</div>
        <div className={globals.subheading}>Study leave</div>
        <div>Software Engineering</div>
        <div className={globals.subheading}>Family Leave</div>
        <div>2025000245</div>
        <div style={{marginTop:20}}>
            <Button type="primary">View more</Button>
        </div>
      </div>
    </div>
  );
};

export default LeaveOverview;
