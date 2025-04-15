"use client";
import React, { useEffect } from "react";
import type { TableColumnsType } from "antd";
import { Table, Spin, Alert, Button } from "antd";
import { useJobPostingActions, useJobPostingState } from "@/providers/jobPost";
import { useAuthState } from "@/providers/auth";
import { IJobApplication } from "@/providers/jobApplication/context";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";
import { toast } from "@/providers/toast/toast";

interface DataType {
  key: string;
  id: string;
  title: string;
  openDate: string;
  closeDate: string;
  location: string;
  description: string;
}

const JobPost: React.FC = () => {
  const { currentUser } = useAuthState();
  const { JobPostings, isPending, isError } = useJobPostingState();
  const { getJobPostings } = useJobPostingActions();
  const { isError: isApplicationError, isSuccess: IsApplicationSuccess } =
    useJobApplicationState();
  const { submitJobApplication, resetStateFlags } = useJobApplicationActions();

  useEffect(() => {
    getJobPostings();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isPending) return <Spin size="large" />;
  if (isError)
    return <Alert message="Error loading job postings" type="error" />;

  if (IsApplicationSuccess) {
    toast("Applications submitted", "success");
    resetStateFlags();
  }

  if (isApplicationError) {
    toast("Failed to submit application", "error");
    resetStateFlags();
  }

  const dataSource: DataType[] =
    JobPostings?.map((post, index) => ({
      key: post.id || index.toString(),
      id: post.id,
      title: post.title,
      openDate: formatDate(post.openDate),
      closeDate: formatDate(post.closeDate),
      location: post.location,
      description: post.description,
    })) || [];

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Opening Date",
      dataIndex: "openDate",
      key: "openDate",
    },
    {
      title: "Closing Date",
      dataIndex: "closeDate",
      key: "closeDate",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            const application: IJobApplication = {
              jobPostingId: record.id,
              applicantName: currentUser.name,
              email: currentUser.emailAddress,
              resumePath: "Internal Applicant",
              status: "Pending",
            };

            submitJobApplication(application);
          }}
        >
          Apply for role
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "1rem", overflowY: "auto", height: "76vh" }}>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default JobPost;
