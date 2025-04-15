"use client";

import React from "react";
import { Form, Input, DatePicker, Button } from "antd";
import dayjs from "dayjs";
import { IJobPosting } from "@/providers/jobPost/interfaces";
import globals from "../globals.module.css"; 
import styles from "./styles/styles.module.css"   

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
    <div className={globals.OuterContainer}>
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            openDate: dayjs(),
            closeDate: dayjs(),
          }}
          className={styles.form}
        >
          <div className={styles.flexGroup}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please enter the title" }]}
              className={styles.flexItem}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Department"
              name="department"
              rules={[{ required: true, message: "Please enter the department" }]}
              className={styles.flexItem}
            >
              <Input />
            </Form.Item>
          </div>

          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Please enter the description" }]}
          >
            <TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: "Please enter the location" }]}
          >
            <Input />
          </Form.Item>

          <div className={styles.flexGroup}>
            <Form.Item
              label="Open Date"
              name="openDate"
              rules={[{ required: true, message: "Please select the open date" }]}
              className={styles.flexItem}
            >
              <DatePicker style={{ width: "100%" }} />
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
              className={styles.flexItem}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CreateJobPost;
