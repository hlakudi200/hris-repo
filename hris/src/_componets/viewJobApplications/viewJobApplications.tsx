import React, { useEffect } from "react";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";
import { Alert, Spin, Table, Button, Tag, Space, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { IJobApplication } from "@/providers/jobApplication/context";
import { toast } from "@/providers/toast/toast";

const ViewJobApplications = () => {
  const { getJobApplications, updateJobApplication } = useJobApplicationActions();
  const { isPending, isSuccess, isError, jobApplications } = useJobApplicationState();

  useEffect(() => {
    getJobApplications();
  }, []);

  const handleUpdateStatus = (record: IJobApplication, newStatus: string) => {
    try{
      updateJobApplication({ ...record, status: newStatus });
      getJobApplications();
      toast("Application status updated Sucessfuly","success");
    }catch{
      toast("Failed update status ! please try again","error")
    }
    
  };

  const columns: ColumnsType<IJobApplication> = [
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Resume",
      dataIndex: "resumePath",
      key: "resumePath",
      render: (path: string) => (
        <a href={path} target="_blank" rel="noopener noreferrer">
          View Resume
        </a>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Pending"
            ? "orange"
            : status === "Approved"
            ? "green"
            : status === "Declined"
            ? "red"
            : "default";
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: unknown, record: IJobApplication) => {
        const isPending = record.status === "Pending";
        return (
          <Space>
            <Popconfirm
              title="Approve Application"
              description="Are you sure you want to approve this application?"
              onConfirm={() => handleUpdateStatus(record, "Approved")}
              okText="Yes"
              cancelText="No"
              disabled={!isPending}
            >
              <Button type="primary" disabled={!isPending}>
                Approve
              </Button>
            </Popconfirm>
    
            <Popconfirm
              title="Decline Application"
              description="Are you sure you want to decline this application?"
              onConfirm={() => handleUpdateStatus(record, "Declined")}
              okText="Yes"
              cancelText="No"
              disabled={!isPending}
            >
              <Button danger disabled={!isPending}>
                Decline
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    }
    ,
  ];

  return (
    <div>
      {isPending && <Spin />}
      {isError && <Alert message="Error loading applications" type="error" />}
      {isSuccess && (
        <Table
          columns={columns}
          dataSource={jobApplications ?? []}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }}
        />
      )}
    </div>
  );
};

export default ViewJobApplications;
