"use client";
import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Table, Spin, Alert, Button, Modal, Form, Input } from "antd";
import { useJobPostingActions, useJobPostingState } from "@/providers/jobPost";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";
import { IJobApplication } from "@/providers/jobApplication/context";
import { toast } from "@/providers/toast/toast";
import FileUpload from "../fileUploadComponent/fileUpload";
import { useEmailActions } from "@/providers/email";
import { applicationSubmittedTemplate } from "@/providers/email/emailTemplates/applicationSubmitted";
interface DataType {
  key: string;
  id: string;
  title: string;
  openDate: string;
  closeDate: string;
  location: string;
  description: string;
}

const ApplicantJobView: React.FC = () => {
  const { JobPostings, isPending, isError } = useJobPostingState();
  const { getJobPostings } = useJobPostingActions();
  const { isError: isApplicationError, isSuccess: IsApplicationSuccess } =
    useJobApplicationState();
  const { submitJobApplication, resetStateFlags } = useJobApplicationActions();
  const { sendEmail } = useEmailActions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJobName, setSelctedJobName] = useState<string | null>(null);
  const [resumePath, setResumePath] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    getJobPostings();
  }, []);

  useEffect(() => {
    if (IsApplicationSuccess) {
      toast("Application submitted", "success");
      resetStateFlags();
    }
    if (isApplicationError) {
      toast("Failed to submit application", "error");
      resetStateFlags();
    }
  }, [IsApplicationSuccess, isApplicationError, resetStateFlags]);

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
            setSelectedJobId(record.id);
            setSelctedJobName(record.title);
            setIsModalVisible(true);
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

      <Modal
        title="Apply for Job"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setResumePath("");
        }}
        onOk={() => {
          form.validateFields().then((values) => {
            if (!resumePath) {
              toast("Please upload your resume", "error");
              return;
            }

            const application: IJobApplication = {
              jobPostingId: selectedJobId,
              applicantName: values.name,
              email: values.email,
              resumePath: resumePath,
              status: "Pending",
            };

            submitJobApplication(application);
            const body = applicationSubmittedTemplate(
              values.name,
              selectedJobName
            );
              sendEmail({
                to: values.email || "",
                subject: `Application for Job post ${selectedJobName} Recived`,
                body,
                isBodyHtml: true,
              });

            setIsModalVisible(false);
            form.resetFields();
            setResumePath("");
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Upload Resume (PDF)">
            <FileUpload onUploadSuccess={(path) => setResumePath(path)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplicantJobView;
