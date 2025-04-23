"use client";
import React, { useEffect } from "react";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { ILeaveRequest } from "@/providers/leaveRequest/context";
import { useLeaveRequestActions, useLeaveRequestState } from "@/providers/leaveRequest";
import { useEmployeeState } from "@/providers/employee";
import { useAuthState } from "@/providers/auth";

const LeaveCalendar: React.FC = () => {
  const { leaveRequests } = useLeaveRequestState();
  const { getByEmpId } = useLeaveRequestActions();
  const { currentEmployee } = useEmployeeState();
  const { currentUser } = useAuthState();

  useEffect(() => {
    if(currentEmployee && leaveRequests === undefined){
      getByEmpId(currentEmployee.id);
    }
  }, [currentUser, currentEmployee, leaveRequests]);

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
          padding: 4,
          background: isLeave ? "#fff1f0" : undefined,
        }}
      >
        <div>{current.date()}</div>
        {isLeave && (
          <div>
            <Badge status="processing" />
          </div>
        )}
      </div>
    );
  };

  return <Calendar fullCellRender={fullCellRender} />;
};

export default LeaveCalendar;
