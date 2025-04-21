"use client";

import {
  useInterviewActions,
  useInterviewState,
} from "@/providers/Interview/index";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  App,
  Button,
  DatePicker,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tabs,
} from "antd";
import moment from "moment";
import { useEffect, useState } from "react";

const { Option } = Select;
const { TextArea } = Input;

const InterviewsPage = () => {
  const { message } = App.useApp();
  const [form] = Form.useForm();
  const interviewActions = useInterviewActions();
  const interviewState = useInterviewState();
  const [selectedTab, setSelectedTab] = useState("all");
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [pendingApplications, setPendingApplications] = useState([]);
  const [selectedJobApplication, setSelectedJobApplication] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);

  useEffect(() => {
    loadInterviews();
    loadPendingApplications();
  }, []);

  const loadInterviews = async () => {
    try {
      await interviewActions.getAllInterviews();
    } catch (error) {
      message.error("Failed to load interviews");
      console.error("Failed to load interviews", error);
    }
  };

  const loadPendingApplications = async () => {
    try {
      const applications = await interviewActions.getPendingApplications();
      setPendingApplications(applications);
    } catch (error) {
      message.error("Failed to load pending applications");
      console.error("Failed to load pending applications", error);
    }
  };

  const handleScheduleModalOpen = (jobApplicationId) => {
    if (jobApplicationId) {
      setSelectedJobApplication(jobApplicationId);
      form.setFieldsValue({
        jobApplicationId: jobApplicationId,
      });
    }
    setIsScheduleModalOpen(true);
  };

  const handleScheduleModalClose = () => {
    setIsScheduleModalOpen(false);
    form.resetFields();
    setSelectedJobApplication("");
  };

  const handleScheduleInterview = async (values) => {
    setLocalSubmitting(true);
    try {
      await interviewActions.scheduleInterview({
        jobApplicationId: values.jobApplicationId,
        scheduledDate: values.scheduledDate.format("YYYY-MM-DD HH:mm:ss"),
        interviewer: values.interviewer,
        mode: values.mode,
        location: values.location || "",
        additionalInformation: values.additionalInformation || "",
      });
      message.success("Interview scheduled successfully");
      handleScheduleModalClose();
      loadInterviews();
    } catch (error) {
      message.error("Failed to schedule interview");
      console.error("Failed to schedule interview", error);
    } finally {
      setLocalSubmitting(false);
    }
  };

  const handleDeleteInterview = async (id) => {
    try {
      await interviewActions.deleteInterview(id);
      message.success("Interview deleted successfully");
      loadInterviews();
    } catch (error) {
      message.error("Failed to delete interview");
      console.error("Failed to delete interview", error);
    }
  };

  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("MMM DD, YYYY - HH:mm");
  };

  const interviewColumns = [
    {
      title: "Date & Time",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
      render: (text) => formatDateTime(text),
      sorter: (a, b) =>
        moment(a.scheduledDate).unix() - moment(b.scheduledDate).unix(),
    },
    {
      title: "Interviewer",
      dataIndex: "interviewer",
      key: "interviewer",
    },
    {
      title: "Mode",
      dataIndex: "mode",
      key: "mode",
    },
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      ellipsis: true,
      render: (text) => text || "-",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Popconfirm
            title="Delete Interview"
            description="Are you sure you want to delete this interview?"
            onConfirm={() => handleDeleteInterview(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const applicationColumns = [
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
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button type="link" onClick={() => handleScheduleModalOpen(record.id)}>
          Schedule Interview
        </Button>
      ),
    },
  ];

  const items = [
    {
      key: "all",
      label: "All Interviews",
      children: (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 16,
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => handleScheduleModalOpen(null)}
            >
              Schedule New Interview
            </Button>
          </div>
          <Table
            columns={interviewColumns}
            dataSource={interviewState.interviews || []}
            rowKey="id"
            loading={interviewState.isPending}
            pagination={{ pageSize: 5 }}
            locale={{
              emptyText: (
                <div style={{ padding: "40px 0", textAlign: "center" }}>
                  No interviews found. Schedule your first interview.
                </div>
              ),
            }}
          />
        </>
      ),
    },
    {
      key: "pending",
      label: "Pending Applications",
      children: (
        <>
          <h2
            style={{ fontSize: "1.25rem", fontWeight: 600, marginBottom: 16 }}
          >
            Pending Applications
          </h2>
          <Table
            columns={applicationColumns}
            dataSource={pendingApplications || []}
            rowKey="id"
            loading={interviewState.isPending}
            pagination={{ pageSize: 5 }}
            locale={{
              emptyText: (
                <div style={{ padding: "40px 0", textAlign: "center" }}>
                  No pending applications found.
                </div>
              ),
            }}
          />
        </>
      ),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "1.875rem", fontWeight: 700, marginBottom: 24 }}>
        Interviews Management
      </h1>

      <Tabs
        activeKey={selectedTab}
        onChange={setSelectedTab}
        items={items}
        style={{ marginBottom: 24 }}
      />

      <Modal
        title="Schedule Interview"
        open={isScheduleModalOpen}
        onCancel={handleScheduleModalClose}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleScheduleInterview}>
          {!selectedJobApplication && (
            <Form.Item
              name="jobApplicationId"
              label="Job Application"
              rules={[
                { required: true, message: "Please select job application" },
              ]}
            >
              <Select placeholder="Select Job Application">
                {pendingApplications.map((application) => (
                  <Option key={application.id} value={application.id}>
                    {application.applicantName} - {application.status}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          <Form.Item
            name="scheduledDate"
            label="Date and Time"
            rules={[{ required: true, message: "Please select date and time" }]}
          >
            <DatePicker
              showTime
              format="YYYY-MM-DD HH:mm"
              style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            name="interviewer"
            label="Interviewer"
            rules={[
              { required: true, message: "Please enter interviewer name" },
            ]}
          >
            <Input placeholder="Enter interviewer name" />
          </Form.Item>

          <Form.Item
            name="mode"
            label="Interview Mode"
            rules={[
              { required: true, message: "Please select interview mode" },
            ]}
          >
            <Select placeholder="Select interview mode">
              <Option value="In-person">In-person</Option>
              <Option value="Video">Video</Option>
              <Option value="Phone">Phone</Option>
            </Select>
          </Form.Item>

          <Form.Item name="location" label="Location / Link">
            <Input placeholder="Enter location or meeting link" />
          </Form.Item>

          <Form.Item
            name="additionalInformation"
            label="Additional Information"
          >
            <TextArea
              rows={3}
              placeholder="Enter additional information about the interview"
            />
          </Form.Item>

          <Form.Item>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "8px",
              }}
            >
              <Button onClick={handleScheduleModalClose}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={localSubmitting}
              >
                Schedule
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// Wrap with App component to provide message context
const InterviewsPageWithApp = () => (
  <App>
    <InterviewsPage />
  </App>
);

export default InterviewsPageWithApp;
