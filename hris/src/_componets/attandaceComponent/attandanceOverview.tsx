"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import { Alert, Button, Spin } from "antd";
import { ClockCircleFilled } from "@ant-design/icons";
import moment from "moment";
import {
  useAttandanceActions,
  useAttandanceState,
} from "@/providers/attandance";

const AttendanceOverview = () => {
  const { weeklyHours, isPending, isError } = useAttandanceState();
  const { getWeeklyHours } = useAttandanceActions();

  useEffect(() => {
    let isActive = true;
    const controller = new AbortController();
    
    const fetchData = async () => {
      try {
        await getWeeklyHours("4E01ED41-CF32-4699-D4D0-08DD790588F3");
      } catch (error) {
        if (isActive && !controller.signal.aborted) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
    return () => {
      isActive = false;
      controller.abort();
    };
  }, []); 
  
  const currentDate = moment().format("YYYY MMMM D");

  const getWeekOfMonth = (date: moment.Moment): number => {
    const startOfMonth = date.clone().startOf("month");
    const weekOfMonth = date.week() - startOfMonth.week() + 1;
    return weekOfMonth < 1 ? 1 : weekOfMonth;
  };
  
  const currentWeek = getWeekOfMonth(moment());

  return (
    <div className={globals.OuterContainer} style={{paddingBottom:20}}>
      <div className={globals.heading} style={{ paddingTop: 20}}>
        Attendance Overview{" "}
        <span>
          <ClockCircleFilled style={{ color: "green" }} />
        </span>
      </div>
      <div className={globals.InfoContainer}>
        <div className={globals.subheading}>Date</div>
        <div>{currentDate}</div>
        <div className={globals.subheading}>Current Week</div>
        <div>Week {currentWeek}</div>
        <div className={globals.subheading}>Hours Recorded</div>
        <div>
          {isPending && <Spin size="small" />}
          {isError && <Alert message="Error loading hours" type="error" />}
          {!isPending && !isError && `${weeklyHours?.result ?? 0} hours`}
        </div>
      
      </div>
      <div style={{ marginTop: 20 }}>
          <Button type="primary">Record Attendance</Button>
        </div>
    </div>
  );
};

export default AttendanceOverview;
