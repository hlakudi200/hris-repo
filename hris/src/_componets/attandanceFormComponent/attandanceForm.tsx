"use client";

import { Form, TimePicker, Select, Button } from "antd";
import globals from "../globals.module.css";
import moment, { Moment } from "moment";
import TextArea from "antd/es/input/TextArea";
import {
  useAttandanceActions,
  useAttandanceState,
} from "@/providers/attandance";
import { IAttandance } from "@/providers/attandance/context";
import { toast } from "@/providers/toast/toast";
import { useEffect } from "react";
import { useEmployeeState } from "@/providers/employee";

const { Option } = Select;

type AttendanceFormValues = {
  clockIn: Moment;
  clockOut: Moment;
  projectId: string;
  notes: string;
};

const AttendanceForm = () => {
  const [form] = Form.useForm<AttendanceFormValues>();
  const { createAttandance, getProjects } = useAttandanceActions();
  const { projects } = useAttandanceState();
  const { currentEmployee } = useEmployeeState();
  const projectList = projects || [];

  useEffect(() => {
    getProjects();
  }, []);

  const onFinish = async (values: AttendanceFormValues) => {
    try {
      const baseDate = moment().startOf("day");

      const clockInTime = baseDate.clone().set({
        hour: values.clockIn.hour(),
        minute: values.clockIn.minute(),
      });

      let clockOutTime = baseDate.clone().set({
        hour: values.clockOut.hour(),
        minute: values.clockOut.minute(),
      });

      if (clockOutTime.isBefore(clockInTime)) {
        clockOutTime = clockOutTime.add(1, "day");
      }

      const formatted: IAttandance = {
        employeeId: currentEmployee.id,
        projectId: values.projectId,
        clockInTime: clockInTime.utc().toISOString(),
        clockOutTime: clockOutTime.utc().toISOString(),
        yearMonthWeek: `${moment().isoWeekYear()}-W${moment()
          .isoWeek()
          .toString()
          .padStart(2, "0")}`,
        note: values.notes,
      };

      createAttandance(formatted);
      toast("Attendance recorded successfully", "success");
      form.resetFields();
    } catch (error) {
      toast("Attendance submission failed. Please try again.", "error");
      console.error(error);
    }
  };

  return (
    <div className={globals.OuterContainer} style={{ width: "100%",height: "100%" }}>
      <div className={globals.InfoContainer}>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          style={{ maxWidth: 400, margin: "0 auto", paddingRight: 15 }}
        >
          <Form.Item
            label="Clock In Time"
            name="clockIn"
            rules={[{ required: true, message: "Please select clock-in time" }]}
            style={{marginBottom: "10px"}}
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
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (value && value <= getFieldValue("clockIn")) {
                    return Promise.reject(
                      "Clock-out time must be after clock-in time"
                    );
                  }
                  return Promise.resolve();
                },
              }),
            ]}
            style={{marginBottom: "15px"}}
          >
            <TimePicker
              use12Hours
              format="h:mm A"
              style={{ width: "100%", height: 50, borderRadius: 16 }}
            />
          </Form.Item>

          <Form.Item
            label="Select Project"
            name="projectId"
            rules={[{ required: true, message: "Please select a project" }]}
            style={{marginBottom: "15px"}}
          >
            <Select placeholder="Select project">
              {projectList.map((proj) => (
                <Option key={proj.id} value={proj.id}>
                  {proj.title}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Notes" name="notes" 
            style={{marginBottom: "10px"}}>
            <TextArea rows={2} />
          </Form.Item>

          <Form.Item 
            style={{marginTop: "20px"}}>
            <Button type="primary" htmlType="submit" block>
              Record Attandance
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default AttendanceForm;
