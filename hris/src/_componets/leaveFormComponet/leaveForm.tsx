"use client";
import React from "react";
import { Form, DatePicker, Select, Button, Flex, Spin } from "antd";
import globals from "../globals.module.css";
import moment from "moment";
import { useEmployeeState } from "@/providers/employee";
import {
  useLeaveRequestActions,
  useLeaveRequestState,
} from "@/providers/leaveRequest";
import { ILeaveRequest } from "@/providers/leaveRequest/context";
import { toast } from "@/providers/toast/toast";

const { RangePicker } = DatePicker;
const { Option } = Select;

type LeaveFormValues = {
  leaveType: string;
  dateRange: [moment.Moment, moment.Moment];
};

const LeaveForm = () => {
  const [form] = Form.useForm<LeaveFormValues>();
  const { currentEmployee } = useEmployeeState();
  const { isPending, isSuccess } = useLeaveRequestState();
  const { submitLeaveRequest } = useLeaveRequestActions();

  const onFinish = (values: LeaveFormValues) => {
    const request: ILeaveRequest = {
      employeeId: currentEmployee.Id,
      leaveType: values.leaveType,
      startDate: values.dateRange[0].format("YYYY-MM-DD"),
      endDate: values.dateRange[1].format("YYYY-MM-DD"),
      status: "pending",
    };

    submitLeaveRequest(request);
  };
  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }
  if (isSuccess) {
    toast("Request successfully submitted", "success");
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
            <RangePicker
              style={{ width: "100%", height: 50, borderRadius: 16 }}
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

export default LeaveForm;
