"use client";
import React, { useEffect, useState } from "react";
import {
  App, // Import App component for notifications
  Button,
  Table,
  Modal,
  Form,
  Input,
  DatePicker,
  Select,
  Space,
  Popconfirm,
} from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import {
  useInterviewActions,
  useInterviewState,
} from "@/providers/Interview/index";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const InterviewManagement = ({
  jobApplicationId = "93C5DDD6-1590-40EF-E5D4-08DD7B2CF2CB",
}) => {
  const { message } = App.useApp(); // Use App.useApp() for notifications
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentInterviewId, setCurrentInterviewId] = useState(null);
  const [localSubmitting, setLocalSubmitting] = useState(false);

  const { isPending, isSuccess, interviews } = useInterviewState();
  const {
    createInterview,
    getAllInterviews,
    getInterviewsByJobApplication,
    updateInterview,
    deleteInterview,
  } = useInterviewActions();

  useEffect(() => {
    if (jobApplicationId) {
      fetchInterviews();
    }
  }, [jobApplicationId]);

  // Filter interviews for the current job application when all interviews are loaded
  useEffect(() => {
    if (interviews && jobApplicationId) {
      const filtered = interviews.filter(
        (interview) => interview.jobApplicationId === jobApplicationId
      );

      console.log("Filtered interviews for job application:", filtered);
    }
  }, [interviews, jobApplicationId]);

  // Modified success handler
  useEffect(() => {
    if (isSuccess && !isPending && localSubmitting) {
      setLocalSubmitting(false);
      setIsModalVisible(false);
      form.resetFields();
      setIsEditing(false);
      setCurrentInterviewId(null);

      // Fetch all interviews after a short delay to ensure state is updated
      setTimeout(() => {
        fetchAllInterviews();
      }, 300);
    }
  }, [isSuccess, isPending]);

  const fetchInterviews = async () => {
    console.log(
      "Fetching interviews for job application:",
      (jobApplicationId = "B32CF44C-C568-420C-0DF6-08DD7C07B94A")
    );
    try {
      await getInterviewsByJobApplication(jobApplicationId);
    } catch (error) {
      message.error("Failed to fetch interviews");
      console.error(error);
    }
  };

  const fetchAllInterviews = async () => {
    console.log("Fetching all interviews");
    try {
      await getAllInterviews();
    } catch (error) {
      message.error("Failed to fetch all interviews");
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
    setLocalSubmitting(true);
    try {
      if (isEditing && currentInterviewId) {
        await updateInterview({
          id: currentInterviewId,
          jobApplicationId: jobApplicationId,
          scheduledDate: values.scheduledDate.format("YYYY-MM-DD HH:mm:ss"),
          interviewer: values.interviewer,
          mode: values.mode,
          feedback: values.feedback || "",
        });
        message.success("Interview updated successfully");
      } else {
        await createInterview({
          jobApplicationId: jobApplicationId,
          scheduledDate: values.scheduledDate.format("YYYY-MM-DD HH:mm:ss"),
          interviewer: values.interviewer,
          mode: values.mode,
          feedback: values.feedback || "",
        });
        message.success("Interview created successfully");
      }

      // If the above didn't trigger isSuccess
      if (!isSuccess) {
        setIsModalVisible(false);
        form.resetFields();
        setIsEditing(false);
        setCurrentInterviewId(null);
        fetchAllInterviews(); // Use fetchAllInterviews instead of fetchInterviews
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
      // Explicitly fetch all interviews after deletion
      fetchAllInterviews();
    } catch (error) {
      message.error("Failed to delete interview");
      console.error(error);
    }
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
    },
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

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <h2>Interviews</h2>
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
        dataSource={
          interviews
            ? interviews
            : interviews?.filter(
                (i) => i.jobApplicationId === jobApplicationId
              ) || []
        }
        rowKey="id"
        loading={isPending}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title={isEditing ? "Edit Interview" : "Schedule New Interview"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
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

// Wrap with App component to provide message context
const InterviewManagementWithApp = (props) => (
  <App>
    <InterviewManagement {...props} />
  </App>
);

export default InterviewManagementWithApp;
