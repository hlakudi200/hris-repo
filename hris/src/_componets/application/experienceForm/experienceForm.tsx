'use client';
import React from 'react';
import { Form, Input, InputNumber, Switch, Row, Col, FormInstance } from 'antd';
import { IJobApplicant } from '@/providers/jobApplicant/context';

interface ExperienceFormProps {
  form: FormInstance;
  formData: Partial<IJobApplicant>;
}

const ExperienceForm: React.FC<ExperienceFormProps> = () => {
  return (
    <>
      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="yearsOfExperience"
            label="Years of Experience"
            rules={[{ required: true, message: 'Please enter your years of experience' }]}
          >
            <InputNumber
              min={0}
              max={50}
              style={{ width: '100%' }}
              placeholder="Enter years of experience"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="currentEmployer"
            label="Current Employer"
          >
            <Input placeholder="Enter your current employer (if any)" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="currentPosition"
            label="Current Position"
          >
            <Input placeholder="Enter your current position (if any)" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="currentSalary"
            label="Current Salary"
          >
            <InputNumber
              style={{ width: '100%' }}
              formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value ? value.replace(/\$\s?|(,*)/g, '') : ''}
              placeholder="Enter your current salary"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="isWillingToRelocate"
            label="Are you willing to relocate?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="hasCriminalRecord"
            label="Do you have a criminal record?"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default ExperienceForm;