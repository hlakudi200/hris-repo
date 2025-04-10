
'use client';
import React from "react";
import { Form, DatePicker, Select, Button, message } from "antd";
import globals from "../globals.module.css";
import moment from "moment";

const { RangePicker } = DatePicker;
const { Option } = Select;

type LeaveFormValues = {
  leaveType: string;
  dateRange: [moment.Moment, moment.Moment];
};

const LeaveForm = () => {
  const [form] = Form.useForm<LeaveFormValues>();

  const onFinish = (values: LeaveFormValues) => {
    const formatted = {
      leaveType: values.leaveType,
      startDate: values.dateRange[0].format("YYYY-MM-DD"),
      endDate: values.dateRange[1].format("YYYY-MM-DD"),
    };
    console.log("Submitted:", formatted);
    message.success("Leave submitted successfully!");
  };

  return (
    <div className={globals.OuterContainer} style={{width:"40%"}}>
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}
        >
          <Form.Item
            label="Leave Type"
            name="leaveType"
            rules={[{ required: true, message: "Please select a leave type" }]}
          >
            <Select placeholder="Select leave type">
              <Option value="annual">Annual Leave</Option>
              <Option value="sick">Sick Leave</Option>
              <Option value="family">Family Responsibility</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Leave Period"
            name="dateRange"
            rules={[{ required: true, message: "Please select date range" }]}
          >
            <RangePicker style={{ width: "100%",height:50,borderRadius:16 }} />
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

export default LeaveForm;
