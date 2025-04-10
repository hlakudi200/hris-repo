"use client";
import React from "react";
import { Form, TimePicker, Select, Button, message } from "antd";
import globals from "../globals.module.css";
import moment from "moment";

const { Option } = Select;

type AttendanceFormValues = {
  clockIn: moment.Moment;
  clockOut: moment.Moment;
  project: string;
};

const AttendanceForm = () => {
  const [form] = Form.useForm<AttendanceFormValues>();

  const onFinish = (values: AttendanceFormValues) => {
    const formatted = {
      clockIn: values.clockIn.format("HH:mm"),
      clockOut: values.clockOut.format("HH:mm"),
      project: values.project,
    };
    console.log("Submitted:", formatted);
    message.success("Attendance recorded successfully!");
  };

  return (
    <div className={globals.OuterContainer} style={{ width: "40%" }}>
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}
        >
          <Form.Item
            label="Clock In Time"
            name="clockIn"
            rules={[{ required: true, message: "Please select clock-in time" }]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              style={{ width: "100%", height: 50, borderRadius: 16 }}
            />
          </Form.Item>

          <Form.Item
            label="Clock Out Time"
            name="clockOut"
            rules={[
              { required: true, message: "Please select clock-out time" },
            ]}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              style={{ width: "100%", height: 50, borderRadius: 16 }}
            />
          </Form.Item>

          <Form.Item
            label="Select Project"
            name="project"
            rules={[{ required: true, message: "Please select a project" }]}
          >
            <Select placeholder="Select project">
              <Option value="projectAlpha">Project Alpha</Option>
              <Option value="projectBeta">Project Beta</Option>
              <Option value="internal">Internal Tasks</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AttendanceForm;
