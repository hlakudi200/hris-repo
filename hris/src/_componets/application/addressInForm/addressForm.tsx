
'use client';
import React from 'react';
import { Form, Input, Select, Row, Col, FormInstance } from 'antd';
import { IJobApplicant } from '@/providers/jobApplicant/context';
const { Option } = Select;

interface AddressFormProps {
  form: FormInstance;
  formData: Partial<IJobApplicant>;
}

const AddressForm: React.FC<AddressFormProps> = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine1"
            label="Address Line 1"
            rules={[{ required: true, message: 'Please enter your address' }]}
          >
            <Input placeholder="Enter your street address" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="addressLine2"
            label="Address Line 2"
          >
            <Input placeholder="Apartment, suite, unit, building, floor, etc." />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="city"
            label="City"
            rules={[{ required: true, message: 'Please enter your city' }]}
          >
            <Input placeholder="Enter your city" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="province"
            label="Province/State"
            rules={[{ required: true, message: 'Please enter your province/state' }]}
          >
            <Input placeholder="Enter your province or state" />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col xs={24} sm={12}>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: 'Please select your country' }]}
          >
            <Select
              showSearch
              placeholder="Select a country"
              optionFilterProp="children"
            >
              <Option value="us">United States</Option>
              <Option value="ca">Canada</Option>
              <Option value="uk">United Kingdom</Option>
              <Option value="au">Australia</Option>
              <Option value="au">South Africa</Option>
              {/* Add more countries as needed */}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            name="postalCode"
            label="Postal/ZIP Code"
            rules={[{ required: true, message: 'Please enter your postal/ZIP code' }]}
          >
            <Input placeholder="Enter your postal or ZIP code" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default AddressForm;
