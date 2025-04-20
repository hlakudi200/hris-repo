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
import { subtractLeave } from "@/utils/subtractLeaves";
import { ILeaves } from "@/providers/leaves/context";
import { useLeaveActions, useLeaveState } from "@/providers/leaves";

const { RangePicker } = DatePicker;
const { Option } = Select;

type LeaveFormValues = {
  leaveType: string;
  dateRange: [moment.Moment, moment.Moment];
};

const LeaveForm = () => {
  const [form] = Form.useForm<LeaveFormValues>();
  const { currentEmployee } = useEmployeeState();
  const {leaves} = useLeaveState();
  const { updateLeaves } = useLeaveActions();
  const { isPending, isSuccess } = useLeaveRequestState();
  const { submitLeaveRequest, resetStateFlags } = useLeaveRequestActions();

  const onFinish = (values: LeaveFormValues) => {
    const request: ILeaveRequest = {
      employeeId: currentEmployee.id,
      leaveType: values.leaveType,
      startDate: values.dateRange[0].format("YYYY-MM-DD"),
      endDate: values.dateRange[1].format("YYYY-MM-DD"),
      status: "pending",
    };

    const leaveType = values.leaveType as keyof Omit<ILeaves, "id">;
    const leaveDays = values.dateRange[1].diff(values.dateRange[0], "days") + 1;

    const updatedLeave = {
      ...subtractLeave(leaves, leaveType, leaveDays),
      id: leaves.id,
    };


    submitLeaveRequest(request);
    updateLeaves(updatedLeave);
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
    resetStateFlags();
  }

  return (
    <div className={globals.OuterContainer} style={{ width: "100%" }}>
      <div className={globals.heading} style={{ paddingTop: 20 }}>
        Apply for Leave
      </div>
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
              <Option value="study">Study</Option>
              <Option value="familyResponsibility">
                Family Responsibility
              </Option>
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
              Apply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default LeaveForm;
