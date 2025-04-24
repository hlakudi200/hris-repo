"use client";
import React, { useState } from "react";
import { Form, Button, Steps, Card, Row, Col} from "antd";
import {
  UserOutlined,
  IdcardOutlined,
  BankOutlined,
  FileDoneOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import PersonalInfoForm from "@/_componets/application/personalDetailsForm/personalInformation";
import AddressForm from "@/_componets/application/addressInForm/addressForm";
import EducationForm from "@/_componets/application/educationForm/educationalForm";
import ExperienceForm from "@/_componets/application/experienceForm/experienceForm";
import DocumentsForm from "@/_componets/application/DocumentUpload/documentUpload";
import SubmissionSummary from "@/_componets/application/submissionSummary/submissionSumary";
import { IJobApplicant } from "@/providers/jobApplicant/context";
import Styles from "./styles/styles.module.css";
import { useApplicantActions } from "@/providers/jobApplicant";
import { toast } from "@/providers/toast/toast";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/providers/auth";
const { Step } = Steps;

const JobApplicationPage: React.FC = () => {
 const router = useRouter();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<IJobApplicant>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [coverletter, setCoverletter] = useState<string | null>(null);
  const { createApplicant } = useApplicantActions();
  const{currentUser}=useAuthState();
  const steps = [
    {
      title: "Personal Information",
      content: <PersonalInfoForm form={form} formData={formData} />,
      icon: <UserOutlined />,
    },
    {
      title: "Address",
      content: <AddressForm form={form} formData={formData} />,
      icon: <IdcardOutlined />,
    },
    {
      title: "Education",
      content: <EducationForm form={form} formData={formData} />,
      icon: <BankOutlined />,
    },
    {
      title: "Experience",
      content: <ExperienceForm form={form} formData={formData} />,
      icon: <FileDoneOutlined />,
    },
    {
      title: "Documents",
      content: (
        <DocumentsForm
          form={form}
          formData={formData}
          resumeUrl={resumeUrl}
          setResumeUrl={setResumeUrl}
          setCoverletter={setCoverletter}
        />
      ),
      icon: <FileDoneOutlined />,
    },
    {
      title: "Review & Submit",
      content: <SubmissionSummary formData={formData} />,
      icon: <CheckCircleOutlined />,
    },
  ];

  const next = async () => {
    try {
      const values = await form.validateFields();
      setFormData((prevData) => ({ ...prevData, ...values }));
      setCurrentStep(currentStep + 1);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
  
    try {
      setIsSubmitting(true);
      const values = await form.validateFields();
      const fullFormData = {
        ...formData,
        ...values,
        resumeUrl,
        coverletter,
        
      };
      
      const request: IJobApplicant = {
        userId: currentUser.id,
        nationalIdNo: fullFormData.nationalIdNo,
        gender: fullFormData.gender,
        dateofBirth: new Date(`${fullFormData.dateofBirth}T00:00:00.000Z`).toISOString(),
        cellphoneNo: fullFormData.cellphoneNo,
        alternativePhone: fullFormData.alternativePhone,
        addressLine1: fullFormData.addressLine1,
        addressLine2: fullFormData.addressLine2,
        city: fullFormData.city,
        province: fullFormData.province,
        country: fullFormData.country,
        postalCode: fullFormData.postalCode,
        highestQualification: fullFormData.highestQualification, 
        fieldOfStudy: fullFormData.fieldOfStudy,
        institution: fullFormData.institution,
        graduationYear: new Date(`${fullFormData.graduationYear}-01-01T00:00:00Z`).toISOString(),
        yearsOfExperience: fullFormData.yearsOfExperience,
        currentEmployer: fullFormData.currentEmployer,
        currentPosition: fullFormData.currentPosition,
        currentSalary: fullFormData.currentSalary,
        resumeUrl: fullFormData.resumeUrl,
        coverletter: fullFormData.coverletter,
        isWillingToRelocate: fullFormData.isWillingToRelocate,
        hasCriminalRecord: fullFormData.hasCriminalRecord??false,
      };
  
      
      createApplicant(request);

      console.log("requestBody:", request);
      toast("Application Porfile Created.","success")
      router.push("/applicant")
    } catch (error) {
      console.error("Submission failed:", error);
      toast("Application Porfile Creation failed.","error")
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={Styles.container}>
      <Card title="Job Application Profile" className="application-card">
        <Steps current={currentStep} className="application-steps" responsive>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} icon={item.icon} />
          ))}
        </Steps>

        <div className="steps-content" style={{ margin: "40px 0" }}>
          <Form
            form={form}
            layout="vertical"
            initialValues={formData}
            scrollToFirstError
          >
            {steps[currentStep].content}
          </Form>
        </div>

        <div className="steps-action">
          <Row justify="space-between">
            <Col>
              {currentStep > 0 && (
                <Button onClick={prev} style={{ marginRight: 8 }}>
                  Previous
                </Button>
              )}
            </Col>
            <Col>
              {currentStep < steps.length - 1 && (
                <Button type="primary" onClick={next}>
                  Next
                </Button>
              )}
              {currentStep === steps.length - 1 && (
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  loading={isSubmitting}
                >
                  Submit Application
                </Button>
              )}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
};

export default JobApplicationPage;
