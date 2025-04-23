"use client";
import {
  useInterviewActions,
  useInterviewState,
} from "@/providers/Interview/index";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Typography,
} from "antd";
import moment from "moment";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles/styles.module.css";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const InterviewManagement = ({ jobApplicationId: propJobApplicationId }) => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInterviewId, setCurrentInterviewId] = useState(null);
  const [localSubmitting, setLocalSubmitting] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);

  const searchParams = useSearchParams();
  const urlJobApplicationId = searchParams.get("jobApplicationId");

  const jobApplicationId = propJobApplicationId || urlJobApplicationId;

  const { isPending, isSuccess, interviews } = useInterviewState();
  const {
    createInterview,
    getInterviewsByJobApplication,
    updateInterview,
    deleteInterview,
    getAllInterviews,
  } = useInterviewActions();

  useEffect(() => {
    if (jobApplicationId) {
      fetchInterviewsByJobApplication();
      setIsFiltered(true);
    } else {
      fetchAllInterviews();
      setIsFiltered(false);
    }
  }, [jobApplicationId]);

  useEffect(() => {}, [interviews]);

  useEffect(() => {
    if (isSuccess && !isPending && localSubmitting) {
      setLocalSubmitting(false);
      setIsModalVisible(false);
      form.resetFields();
      setIsEditing(false);
      setCurrentInterviewId(null);

      if (isFiltered && jobApplicationId) {
        fetchInterviewsByJobApplication();
      } else {
        fetchAllInterviews();
      }
    }
  }, [isSuccess, isPending]);

  const fetchInterviewsByJobApplication = async () => {
    if (!jobApplicationId) {
      message.error("No job application ID provided");
      return;
    }

    try {
      await getInterviewsByJobApplication(jobApplicationId);
    } catch (error) {
      message.error("Failed to fetch interviews");
      console.error(error);
    }
  };

  const fetchAllInterviews = async () => {
    try {
      await getAllInterviews();
    } catch (error) {
      message.error("Failed to fetch interviews");
      console.error(error);
    }
  };

  const showCreateModal = () => {
    form.resetFields();
    setIsEditing(false);
    setCurrentInterviewId(null);
    setIsModalVisible(true);
  };

  const showEditModal = (interview) => {
    setIsEditing(true);
    setCurrentInterviewId(interview.id);
    form.setFieldsValue({
      jobApplicationId: interview.jobApplicationId,
      scheduledDate: moment(interview.scheduledDate),
      interviewer: interview.interviewer,
      mode: interview.mode,
      feedback: interview.feedback,
    });
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setIsEditing(false);
    setCurrentInterviewId(null);
  };

  const handleSubmit = async (values) => {
    const targetJobApplicationId = isFiltered
      ? jobApplicationId
      : values.jobApplicationId;

    if (!targetJobApplicationId) {
      message.error("Please select a job application");
      return;
    }

    setLocalSubmitting(true);
    try {
      if (isEditing && currentInterviewId) {
        await updateInterview({
          id: currentInterviewId,
          jobApplicationId: targetJobApplicationId,
          scheduledDate: values.scheduledDate.format("YYYY-MM-DD HH:mm:ss"),
          interviewer: values.interviewer,
          mode: values.mode,
          feedback: values.feedback || "",
        });
        message.success("Interview updated successfully");
      } else {
        await createInterview({
          jobApplicationId: targetJobApplicationId,
          scheduledDate: values.scheduledDate.format("YYYY-MM-DD HH:mm:ss"),
          interviewer: values.interviewer,
          mode: values.mode,
          feedback: values.feedback || "",
        });
        message.success("Interview created successfully");
      }
    } catch (error) {
      setLocalSubmitting(false);
      message.error(
        isEditing ? "Failed to update interview" : "Failed to create interview"
      );
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteInterview(id);
      message.success("Interview deleted successfully");

      if (isFiltered && jobApplicationId) {
        fetchInterviewsByJobApplication();
      } else {
        fetchAllInterviews();
      }
    } catch (error) {
      message.error("Failed to delete interview");
      console.error(error);
    }
  };

  const clearFilter = () => {
    fetchAllInterviews();
    setIsFiltered(false);
  };

  const columns = [
    {
      title: "Date & Time",
      dataIndex: "scheduledDate",
      key: "scheduledDate",
      render: (text) => moment(text).format("MMM DD, YYYY - HH:mm"),
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
      render: (mode) => <Tag color={getTagColor(mode)}>{mode}</Tag>,
    },

    ...(isFiltered
      ? []
      : [
          {
            title: "Job Application ID",
            dataIndex: "jobApplicationId",
            key: "jobApplicationId",
            ellipsis: true,
          },
        ]),
    {
      title: "Feedback",
      dataIndex: "feedback",
      key: "feedback",
      ellipsis: true,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="small">
          <Button
            icon={<EditOutlined />}
            onClick={() => showEditModal(record)}
            type="text"
          />
          <Popconfirm
            title="Delete Interview"
            description="Are you sure you want to delete this interview?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger icon={<DeleteOutlined />} type="text" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const interviewModes = [
    "Virtual",
    "In-person",
    "Phone",
    "Technical",
    "Group",
  ];

  const getTagColor = (mode) => {
    const colors = {
      Virtual: "blue",
      "In-person": "green",
      Phone: "orange",
      Technical: "purple",
      Group: "cyan",
    };
    return colors[mode] || "default";
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
          alignItems: "center",
        }}
      >
        <div>
          <Title level={3} style={{ margin: 0 }}>
            {isFiltered ? "Interviews for Job Application" : "All Interviews"}
          </Title>
          {isFiltered && (
            <div>
              <Tag color="blue">Job Application ID: {jobApplicationId}</Tag>
              <Button type="link" size="small" onClick={clearFilter}>
                View All Interviews
              </Button>
            </div>
          )}
        </div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={showCreateModal}
        >
          Schedule Interview
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={interviews || []}
        rowKey="id"
        loading={isPending}
        pagination={{ pageSize: 10 }}
      />

      <Modal
        title={isEditing ? "Edit Interview" : "Schedule New Interview"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          {!isFiltered && (
            <Form.Item
              name="jobApplicationId"
              label="Job Application ID"
              initialValue={jobApplicationId || ""}
              rules={[
                { required: true, message: "Please enter job application ID" },
              ]}
            >
              <Input placeholder="Enter job application ID" />
            </Form.Item>
          )}

          <Form.Item
            name="scheduledDate"
            label="Interview Date & Time"
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
              {interviewModes.map((mode) => (
                <Option key={mode} value={mode}>
                  {mode}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="feedback" label="Feedback">
            <TextArea
              rows={4}
              placeholder="Enter feedback or notes about the interview"
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
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending || localSubmitting}
              >
                {isEditing ? "Update" : "Schedule"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default InterviewManagement;
