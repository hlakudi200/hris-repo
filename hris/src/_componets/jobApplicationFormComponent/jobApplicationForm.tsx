"use client";
import { Form, Button, Input, Flex, Spin } from "antd";
import globals from "../globals.module.css";
import React, { useState } from "react";
import { MailFilled, UserOutlined } from "@ant-design/icons";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";
import { IJobApplication } from "@/providers/jobApplication/context";
import { toast } from "@/providers/toast/toast";

type JobApplicationFormValues = {
  name: string;
  email: string;
};

const JobApplicationForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { isPending, isSuccess, isError } = useJobApplicationState();
  const { submitJobApplication, resetStateFlags } = useJobApplicationActions();

  const [form] = Form.useForm<JobApplicationFormValues>();

  function onFinish(values: JobApplicationFormValues): void {
    const application: IJobApplication = {
      //TODO: Use value from job posting provider
      jobPostingId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      applicantName: values.name,
      email: values.email,
      resumePath: "",
      status: "Pending",
    };

    submitJobApplication(application);
  }

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isSuccess) {
    toast("Application submitted", "success");
  }

  if (isError) {
    toast("Submission failed", "error");
    resetStateFlags();
  }

  return (
    <div className={globals.OuterContainer} style={{ width: "40%" }}>
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}
        >
          <Form.Item name="name" rules={[{ required: true }]}>
            <Input
              placeholder="Name"
              suffix={<UserOutlined />}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input
              placeholder="Email"
              suffix={<MailFilled />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Request
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
