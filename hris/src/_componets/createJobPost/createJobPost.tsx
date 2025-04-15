'use client'
import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { IJobPosting } from "@/providers/jobPost/interfaces";
import globals from "../globals.module.css";
const { TextArea } = Input;

interface FormValues {
  id: string;
  title: string;
  department: string;
  description: string;
  location: string;
  openDate: string;
  closeDate: string;
}

const CreateJobPost: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: FormValues) => {
    const payload: IJobPosting = {
      title: values.title,
      department: values.department,
      description: values.description,
      location: values.location,
      openDate: values.openDate.toString(),
      closeDate: values.closeDate.toString(),
      status: "Open",
    };

    console.log("Payload:", payload);
  };

  return (
    <div
      className={globals.OuterContainer}
      style={{ width: "100%", height: "100%" }}
    >
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            openDate: dayjs(),
            closeDate: dayjs(),
          }}
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Department"
            name="department"
            rules={[{ required: true, message: "Please enter the department" }]}
          >
            <Input />c
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Please enter the description" },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Open Date"
            name="openDate"
            rules={[{ required: true, message: "Please select the open date" }]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item
            label="Close Date"
            name="closeDate"
            rules={[
              { required: true, message: "Please select the close date" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const openDate = getFieldValue("openDate");
                  if (!value || !openDate || value.isAfter(openDate)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Close date must be after the open date")
                  );
                },
              }),
            ]}
          >
            <DatePicker showTime />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateJobPost;
