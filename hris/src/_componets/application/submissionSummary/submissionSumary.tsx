'use client';
import React from 'react';
import { Descriptions, Divider, Typography, Tag } from 'antd';
import { IJobApplicant } from '@/providers/jobApplicant/context';

const { Title, Paragraph } = Typography;

interface SubmissionSummaryProps {
  formData: Partial<IJobApplicant>;
}

const SubmissionSummary: React.FC<SubmissionSummaryProps> = ({ formData }) => {
  return (
    <div className="submission-summary">
      <Title level={4}>Review Your Application</Title>
      <Paragraph>Please review all the information you have provided before submitting your application.</Paragraph>
      
      <Divider orientation="left">Personal Information</Divider>
      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item label="National ID">
          {formData.nationalIdNo}
        </Descriptions.Item>
        <Descriptions.Item label="Gender">
          {formData.gender && formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1)}
        </Descriptions.Item>
        <Descriptions.Item label="Date of Birth">
          {formData.dateofBirth}
        </Descriptions.Item>
        <Descriptions.Item label="Cell Phone">
          {formData.cellphoneNo}
        </Descriptions.Item>
        <Descriptions.Item label="Alternative Phone">
          {formData.alternativePhone || 'N/A'}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider orientation="left">Address</Divider>
      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item label="Address Line 1">
          {formData.addressLine1}
        </Descriptions.Item>
        <Descriptions.Item label="Address Line 2">
          {formData.addressLine2 || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="City">
          {formData.city}
        </Descriptions.Item>
        <Descriptions.Item label="Province/State">
          {formData.province}
        </Descriptions.Item>
        <Descriptions.Item label="Country">
          {formData.country}
        </Descriptions.Item>
        <Descriptions.Item label="Postal/ZIP Code">
          {formData.postalCode}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider orientation="left">Education</Divider>
      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item label="Highest Qualification">
          {formData.highestQualification && formData.highestQualification
            .split('_')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
        </Descriptions.Item>
        <Descriptions.Item label="Field of Study">
          {formData.fieldOfStudy}
        </Descriptions.Item>
        <Descriptions.Item label="Institution">
          {formData.institution}
        </Descriptions.Item>
        <Descriptions.Item label="Graduation Year">
          {formData.graduationYear}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider orientation="left">Work Experience</Divider>
      <Descriptions bordered column={{ xs: 1, sm: 2 }}>
        <Descriptions.Item label="Years of Experience">
          {formData.yearsOfExperience}
        </Descriptions.Item>
        <Descriptions.Item label="Current Employer">
          {formData.currentEmployer || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Current Position">
          {formData.currentPosition || 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Current Salary">
          {formData.currentSalary ? `$${formData.currentSalary.toLocaleString()}` : 'N/A'}
        </Descriptions.Item>
        <Descriptions.Item label="Willing to Relocate">
          {formData.isWillingToRelocate ? 
            <Tag color="green">Yes</Tag> : 
            <Tag color="red">No</Tag>}
        </Descriptions.Item>
        <Descriptions.Item label="Criminal Record">
          {formData.hasCriminalRecord ? 
            <Tag color="red">Yes</Tag> : 
            <Tag color="green">No</Tag>}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider orientation="left">Application Documents</Divider>
      <Descriptions bordered column={{ xs: 1, sm: 1 }}>
        <Descriptions.Item label="Resume/CV">
          Resume uploaded
        </Descriptions.Item>
        <Descriptions.Item label="Cover Letter">
          {formData.coverletter && (formData.coverletter.length > 100 ? 
            `${formData.coverletter.substring(0, 100)}...` : 
            formData.coverletter)}
        </Descriptions.Item>
      </Descriptions>
      
      <Divider />
      <Paragraph type="secondary">
        By submitting this application, you confirm that all the information provided is accurate and complete.
      </Paragraph>
    </div>
  );
};

export default SubmissionSummary;