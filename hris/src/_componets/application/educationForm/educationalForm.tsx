'use client';
import React from 'react';
import { Form, Input, Select, Row, Col, FormInstance } from 'antd';
import { IJobApplicant } from '@/providers/jobApplicant/context';

const { Option } = Select;

interface EducationFormProps {
  form: FormInstance;
  formData: Partial<IJobApplicant>;
}

const EducationForm: React.FC<EducationFormProps> = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="highestQualification"
            label="Highest Qualification"
            rules={[{ required: true, message: 'Please select your highest qualification' }]}
          >
            <Select placeholder="Select your highest qualification">
              <Option value="high_school">High School Diploma</Option>
              <Option value="associate">Associate Degree</Option>
              <Option value="bachelor">Bachelor&apos;s Degree</Option>
              <Option value="master">Master&apos;s Degree</Option>
              <Option value="phd">PhD/Doctorate</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="fieldOfStudy"
            label="Field of Study"
            rules={[{ required: true, message: 'Please enter your field of study' }]}
          >
            <Input placeholder="Enter your field of study" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="institution"
            label="Institution"
            rules={[{ required: true, message: 'Please enter your institution' }]}
          >
            <Input placeholder="Enter your institution name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="graduationYear"
            label="Graduation Year"
            rules={[{ required: true, message: 'Please select your graduation year' }]}
          >
            <Select placeholder="Select graduation year">
              {Array.from({ length: 60 }, (_, i) => {
                const year = new Date().getFullYear() - i;
                return <Option key={year} value={year.toString()}>{year}</Option>;
              })}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default EducationForm;
