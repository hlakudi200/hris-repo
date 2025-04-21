'use client';
import React, { useEffect, useState } from "react";
import {
  useJobApplicationActions,
} from "@/providers/jobApplication";
import {
  useJobPostingActions,
  useJobPostingState,
} from "@/providers/jobPost";
import {
  Alert,
  Spin,
  Table,
  Button,
  Tag,
  Space,
  Popconfirm,
  Input,
} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { IJobApplication, IJobPosting } from "@/providers/jobPost/interfaces";
import { toast } from "@/providers/toast/toast";
import type { ColumnType } from "antd/es/table";
import { approveApplicationTemplate,} from "@/providers/email/emailTemplates/approveApplication";
import { declineApplicationTemplate } from "@/providers/email/emailTemplates/declineApplication";
import { useEmailActions } from "@/providers/email"; 

interface ApplicationWithPostTitle extends IJobApplication {
  jobPostTitle: string;
}

type DataIndex = keyof ApplicationWithPostTitle;

const ViewJobApplications = () => {
  const { updateJobApplication } = useJobApplicationActions();
  const { getJobPostingIncluded } = useJobPostingActions();
  const { sendEmail } = useEmailActions(); 
  const {
    isPending,
    isSuccess,
    isError,
    JobPostings,
  } = useJobPostingState();

  const [applications, setApplications] = useState<ApplicationWithPostTitle[]>([]);

  useEffect(() => {
    getJobPostingIncluded();
  }, []);

  useEffect(() => {
    if (JobPostings?.length) {
      const flattenedApps: ApplicationWithPostTitle[] = JobPostings.flatMap((post: IJobPosting) =>
        (post.applications || []).map((app) => ({
          ...app,
          jobPostTitle: post.title,
        }))
      );
      setApplications(flattenedApps);
    }
  }, [JobPostings]);

  const handleUpdateStatus = async (record: ApplicationWithPostTitle, newStatus: string) => {
    try {
      const updatedRecord = {
        ...record,
        status: newStatus,
        interviews: record.interviews?.map(interview => ({
          ...interview,
          jobApplicationId: interview.jobApplicationId || record.id,
          scheduledDate: interview.scheduledDate || "",
          interviewer: interview.interviewer || "",
          mode: interview.mode || "",
          feedback: interview.feedback || "",
        })) || [],
      };
  
      await updateJobApplication(updatedRecord);
      await getJobPostingIncluded();
  
   
      const emailBody =
        newStatus === "Approved"
          ? approveApplicationTemplate(record.applicantName, record.jobPostTitle)
          : declineApplicationTemplate(record.applicantName, record.jobPostTitle, "");
  
 
      await sendEmail({
        to: record.email,
        subject: `Your Application for ${record.jobPostTitle} - ${newStatus}`,
        body: emailBody,
        isBodyHtml: true,
      });
  
      toast(`Application ${newStatus.toLowerCase()} successfully`, "success");
    } catch {
      toast("Failed to update status! Please try again.", "error");
    }
  };
  
  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<ApplicationWithPostTitle> => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => confirm()}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              confirm();
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => {
              clearFilters();
             
            }}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ?.toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
  });

  const columns: ColumnsType<ApplicationWithPostTitle> = [
    {
      title: "Job Post",
      dataIndex: "jobPostTitle",
      key: "jobPostTitle",
      sorter: (a, b) => a.jobPostTitle.localeCompare(b.jobPostTitle),
      ...getColumnSearchProps("jobPostTitle"),
    },
    {
      title: "Applicant Name",
      dataIndex: "applicantName",
      key: "applicantName",
      sorter: (a, b) => a.applicantName.localeCompare(b.applicantName),
      ...getColumnSearchProps("applicantName"),
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
      filters: [
        { text: "Pending", value: "Pending" },
        { text: "Approved", value: "Approved" },
        { text: "Declined", value: "Declined" },
      ],
      onFilter: (value, record) => record.status === value,
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
      render: (_: unknown, record: ApplicationWithPostTitle) => {
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
    },
  ];

  return (
    <div>
      {isPending && <Spin />}
      {isError && <Alert message="Error loading applications" type="error" />}
      {isSuccess && (
        <Table
          columns={columns}
          dataSource={applications}
          rowKey="id"
          pagination={{
            pageSize: 5,
            showSizeChanger: true,
            pageSizeOptions: ["5", "10"],
          }}
          scroll={{ x: "max-content" }}
        />
      )}
    </div>
  );
};

export default ViewJobApplications;
