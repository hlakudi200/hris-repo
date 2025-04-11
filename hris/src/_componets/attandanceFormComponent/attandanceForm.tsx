"use client";
import React from "react";
import { Form, TimePicker, Select, Button} from "antd";
import globals from "../globals.module.css";
import moment from "moment";
import TextArea from "antd/es/input/TextArea";
import { useAttandanceActions} from "@/providers/attandance";
import { IAttandance } from "@/providers/attandance/context";
import { toast } from "@/providers/toast/toast";


const { Option } = Select;

type AttendanceFormValues = {
  clockIn: moment.Moment;
  clockOut: moment.Moment;
  project: string;
  notes:string;
};

const AttendanceForm = () => {
  const [form] = Form.useForm<AttendanceFormValues>();
  const {createAttandance}=useAttandanceActions() 

  const onFinish = (values: AttendanceFormValues) => {
    const formatted:IAttandance = {
      employeeId:"98aa800f-e407-4d78-ad05-08dd78d29899",
      clockInTime: values.clockIn.toString(),
      clockOutTime: values.clockOut.toString(),
      projectId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      note:values.notes
      
    };
    try{
      createAttandance(formatted)
      console.log("Submitted:", formatted);
    }catch(error){
      console.error("Error submitting food data:", error);
      toast("Error submitting clock data:Please try again!", "error");
    }
  
  };

  return (
    <div className={globals.OuterContainer} style={{ width: "40%" ,marginTop:-40}}>
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
