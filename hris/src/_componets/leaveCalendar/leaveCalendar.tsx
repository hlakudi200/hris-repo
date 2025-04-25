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
    if (currentEmployee && leaveRequests === undefined) {
      getByEmpId(currentEmployee.id);
    }
  }, [currentUser, currentEmployee, leaveRequests]);
  
  const leaveDateStatusMap: Record<string, "pending" | "approved" | "declined"> = {};

  leaveRequests?.forEach((request: ILeaveRequest) => {
    const status = request.status.toLowerCase() as "pending" | "approved" | "declined";
    const start = dayjs(request.startDate);
    const end = dayjs(request.endDate);

    for (
      let d = start;
      d.isBefore(end) || d.isSame(end);
      d = d.add(1, "day")
    ) {
      const date = d.format("YYYY-MM-DD");
      leaveDateStatusMap[date] = status;
    }
  });

  const backgroundColors: Record<string, string> = {
    approved: "#f6ffed", // light green
    pending: "#fffbe6",  // light orange
    declined: "#fff1f0", // light red
  };

  const badgeStatuses: Record<string, "success" | "warning" | "error"> = {
    approved: "success",
    pending: "warning",
    declined: "error",
  };

  const fullCellRender = (current: Dayjs) => {
    const date = current.format("YYYY-MM-DD");
    const status = leaveDateStatusMap[date];

    return (
      <div
        style={{
          height: "100%",
          padding: 4,
          backgroundColor: status ? backgroundColors[status] : undefined,
        }}
      >
        <div>{current.date()}</div>
        {status && (
          <Badge
            status={badgeStatuses[status]}
          />
        )}
      </div>
    );
  };

  return <Calendar fullCellRender={fullCellRender} />;
};

export default LeaveCalendar;
