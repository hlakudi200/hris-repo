'use client';
import React from 'react';
import { Form, Input, DatePicker, Select, Row, Col, InputNumber, FormInstance } from 'antd';
import { IJobApplicant } from '@/providers/jobApplicant/context';
import moment from 'moment';

const { Option } = Select;

interface PersonalInfoFormProps {
  form: FormInstance;
  formData: Partial<IJobApplicant>;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="nationalIdNo"
            label="Age"
            rules={[{ required: true, message: 'Please enter your Age' }]}
          >
            <InputNumber 
              style={{ width: '100%' }} 
              placeholder="Enter your age" 
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: 'Please select your gender' }]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
              <Option value="prefer_not_to_say">Prefer not to say</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="dateofBirth"
            label="Date of Birth"
            rules={[{ required: true, message: 'Please select your date of birth' }]}
            getValueFromEvent={(date) => date ? date.format('YYYY-MM-DD') : ''}
            getValueProps={(value) => ({ value: value ? moment(value) : undefined })}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="cellphoneNo"
            label="Cellphone Number"
            rules={[{ required: true, message: 'Please enter your cellphone number' }]}
          >
            <Input placeholder="Enter your cellphone number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="alternativePhone"
            label="Alternative Phone"
          >
            <Input placeholder="Enter an alternative phone number (optional)" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default PersonalInfoForm;