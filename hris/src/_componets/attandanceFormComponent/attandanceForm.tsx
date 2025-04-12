"use client";

import { Form, TimePicker, Select, Button } from "antd";
import globals from "../globals.module.css";
import moment, { Moment } from "moment";
import TextArea from "antd/es/input/TextArea";
import { useAttandanceActions } from "@/providers/attandance";
import { IAttandance } from "@/providers/attandance/context";
import { toast } from "@/providers/toast/toast";

const { Option } = Select;

type AttendanceFormValues = {
  clockIn: Moment;
  clockOut: Moment;
  project: string;
  notes: string;
};

const AttendanceForm = () => {
  const [form] = Form.useForm<AttendanceFormValues>();
  const { createAttandance } = useAttandanceActions();

  const PROJECT_IDS = {
    projectAlpha: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    projectBeta: "another-guid-here",
    internal: "internal-guid-here",
  };

  const onFinish = async (values: AttendanceFormValues) => {
    try {
      const baseDate = moment().startOf("day");

      const clockInTime = baseDate.clone().set({
        hour: values.clockIn.hour(), // Changed from hours()
        minute: values.clockIn.minute(), // Changed from minutes()
      });

      let clockOutTime = baseDate.clone().set({
        hour: values.clockOut.hour(), // Changed from hours()
        minute: values.clockOut.minute(), // Changed from minutes()
      });
      if (clockOutTime.isBefore(clockInTime)) {
        clockOutTime = clockOutTime.add(1, "day");
      }

      const formatted: IAttandance = {
        employeeId: "4e01ed41-cf32-4699-d4d0-08dd790588f3",
        clockInTime: clockInTime.utc().toISOString(),
        clockOutTime: clockOutTime.utc().toISOString(),
        projectId: PROJECT_IDS[values.project as keyof typeof PROJECT_IDS],
        yearMonthWeek: `${moment().isoWeekYear()}-W${moment()
          .isoWeek()
          .toString()
          .padStart(2, "0")}`,
        note: values.notes,
      };

      await createAttandance(formatted);
      console.log("supposed to be sent")
      toast("Attandace recorded successfuly", "success");
    } catch (error) {
      toast("Attandace recorded unsuccessfuly, please try again", "error");
      console.log(error);
    }
  };

  return (
    <div
      className={globals.OuterContainer}
      style={{ width: "40%", marginTop: -40 }}
    >
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

          <Form.Item label="Notes" name="notes">
            <TextArea rows={2} />
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
