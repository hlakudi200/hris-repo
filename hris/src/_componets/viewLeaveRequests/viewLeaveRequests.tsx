import { useEmployeeState } from "@/providers/employee";
import {
  useLeaveRequestActions,
  useLeaveRequestState,
} from "@/providers/leaveRequest";
import { Table, TableColumnsType } from "antd";
import { useEffect } from "react";

interface DataType {
  key: string;
  employeeId: string;
  startDate: string;
  endDate: string;
  leaveType: string;
  status: string;
  reason?: string;
}

const ViewLeaveRequests: React.FC = () => {
  const { currentEmployee } = useEmployeeState();
  const { leaveRequests } = useLeaveRequestState();
  const { getByEmpId } = useLeaveRequestActions();

  useEffect(() => {
    if (currentEmployee !== undefined) {
      getByEmpId(currentEmployee.id);
    }
  }, []);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Start Date",
      dataIndex: "startDate",
      key: "startDate",
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-Za", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      title: "End Date",
      dataIndex: "endDate",
      key: "endDate",
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-Za", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Reason",
      dataIndex: "reason",
      key: "reason",
    },
  ];

  const dataSource: DataType[] =
    leaveRequests?.map((leaveRequest, index) => ({
      key: index.toString(),
      ...leaveRequest,
    })) || [];

  return (
    <div style={{ padding: "1rem", overflowY: "auto" }}>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        locale={{ emptyText: "No leave requests found" }}
      />
    </div>
  );
};

export default ViewLeaveRequests;
