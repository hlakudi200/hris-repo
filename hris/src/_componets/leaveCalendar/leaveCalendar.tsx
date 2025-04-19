"use client";
import React, { useContext } from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import {
  ILeaveRequest,
  LeaveRequestStateContext,
} from "@/providers/leaveRequest/context";

const LeaveCalendar: React.FC = () => {
  const { leaveRequests } = useContext(LeaveRequestStateContext);

  const getLeaveDates = (): string[] => {
    if (!leaveRequests) return [];

    const allDates: string[] = [];

    leaveRequests.forEach((request: ILeaveRequest) => {
      const start = dayjs(request.startDate);
      const end = dayjs(request.endDate);

      for (
        let d = start;
        d.isBefore(end) || d.isSame(end);
        d = d.add(1, "day")
      ) {
        allDates.push(d.format("YYYY-MM-DD"));
      }
    });

    return allDates;
  };

  const leaveDates = getLeaveDates();

  const fullCellRender = (current: Dayjs) => {
    const date = current.format("YYYY-MM-DD");
    const isLeave = leaveDates.includes(date);

    return (
      <div
        style={{
          height: "100%",
          padding: 8,
          background: isLeave ? "#fff1f0" : undefined,
          borderRadius: 4,
        }}
      >
        <div>{current.date()}</div>
        {isLeave && (
          <div style={{ marginTop: 4 }}>
            <Badge status="error" text="Leave" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 24, background: "#fff" }}>
      <h2>Leave Calendar</h2>
      <Calendar fullCellRender={fullCellRender} />
    </div>
  );
};

export default LeaveCalendar;
