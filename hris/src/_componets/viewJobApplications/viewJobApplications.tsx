import React, { useEffect } from "react";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";
import { Alert, Spin, Table, Button, Tag, Space } from "antd";

interface JobApplication {
  id?: string;
  applicantName: string;
  email: string;
  resumePath: string;
  status: string;
}

const ViewJobApplications = () => {
  const { getJobApplications } = useJobApplicationActions();
  const { isPending, isSuccess, isError, jobApplications } =
    useJobApplicationState();
  const jobAppsList = jobApplications || [];

  useEffect(() => {
    getJobApplications();
  }, []);

  const columns = [
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
      render: () => (
        <Space>
          <Button type="primary">Approve</Button>
          <Button danger>Decline</Button>
        </Space>
      ),
    },
  ];

  const dataSource = jobAppsList.map((item: JobApplication, index: number) => ({
    ...item,
    key: item.id || index,
  }));

  return (
    <div>
      {isPending && <Spin />}
      {isError && <Alert message="Error loading applications" type="error" />}
      {isSuccess && (
        <Table
          columns={columns}
          dataSource={dataSource}
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
