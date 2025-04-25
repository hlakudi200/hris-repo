"use client";
import React, { useState, useEffect } from "react";
import {
  Card,
  Descriptions,
  Form,
  Input,
  Switch,
  Button,
  Row,
  Col,
  Typography,
  Space,
  Divider,
  DatePicker,
  InputNumber,
  Select,
  Upload,
  Avatar,
  Tag,
  Grid,
  Spin,
} from "antd";
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  UserOutlined,
  UploadOutlined,
  EnvironmentOutlined,
  PhoneOutlined,
  IdcardOutlined,
  BankOutlined,
  BookOutlined,
} from "@ant-design/icons";
import {
  useApplicantState,
  useApplicantActions,
} from "@/providers/jobApplicant";
import { useJobApplicationActions } from "@/providers/jobApplication";
import dayjs from "dayjs";
import { toast } from "@/providers/toast/toast";
import { useAuthState } from "@/providers/auth";
const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const ApplicantProfile = () => {
  const { applicant,isPending } = useApplicantState();
  const { updateApplicant } = useApplicantActions();
  const { uploadResume } = useJobApplicationActions();
  const [isEditing, setIsEditing] = useState(false);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const screens = useBreakpoint();
  const [resumeUrl, setResumeUrl] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadingResume, setUploadingResume] = useState(false);
  const { currentUser } = useAuthState();

  useEffect(() => {
    if (applicant?.resumeUrl) {
      setResumeUrl(applicant.resumeUrl);
      const nameFromUrl = applicant.resumeUrl.split("/").pop();
      setFileName(nameFromUrl || null);
    }
  }, [applicant]);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      
      // Format date of birth to ISO string format
      const dob = values.dateofBirth ? values.dateofBirth.toISOString() : (applicant?.dateofBirth || new Date().toISOString());
      
      // Format graduation year to ISO string format (first day of the year)
      const gradYear = values.graduationYear 
        ? new Date(`${values.graduationYear}-01-01`).toISOString() 
        : (applicant?.graduationYear || new Date().toISOString());

      // Create the request object to match the backend DTO
      const request = {
        id: applicant?.id || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Use existing ID or default
        userId: currentUser.id,
        nationalIdNo: values.nationalIdNo || 0,
        gender: values.gender || "string",
        dateofBirth: dob,
        cellphoneNo: values.cellphoneNo || "string",
        alternativePhone: values.alternativePhone || "string",
        addressLine1: values.addressLine1 || "string",
        addressLine2: values.addressLine2 || "string",
        city: values.city || "string",
        province: values.province || "string",
        country: values.country || "string",
        postalCode: values.postalCode || "string",
        highestQualification: values.highestQualification || "string",
        fieldOfStudy: values.fieldOfStudy || "string",
        institution: values.institution || "string",
        graduationYear: gradYear,
        yearsOfExperience: values.yearsOfExperience || 0,
        currentEmployer: values.currentEmployer || "string",
        currentPosition: values.currentPosition || "string",
        currentSalary: values.currentSalary || 0,
        resumeUrl: resumeUrl || (applicant?.resumeUrl || "string"),
        coverletter: values.coverletter || "string",
        isWillingToRelocate: values.isWillingToRelocate || false,
        hasCriminalRecord: values.hasCriminalRecord || false
      };
      
      // Call the update function
      await updateApplicant(request);
      
      // Show success message
      toast("Profile updated successfully", "success");
      setIsEditing(false);
    } catch (error) {
      toast("Failed to update profile. Please try again.", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    const formValues = {
      ...applicant,
      dateofBirth: applicant?.dateofBirth ? dayjs(applicant.dateofBirth) : null,
      // Convert graduation year from ISO to just the year number for form
      graduationYear: applicant?.graduationYear 
        ? parseInt(dayjs(applicant.graduationYear).format('YYYY')) 
        : null,
    };
    form.setFieldsValue(formValues);
    setIsEditing(true);
  };

  const handleCustomUpload = async (options) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploadingResume(true);
      const uploadedFile = file;
      const filePath = await uploadResume(uploadedFile);
      if (filePath && typeof filePath === "string") {
        setResumeUrl(filePath);
        setFileName(uploadedFile.name);
        form.setFieldsValue({ resumeUrl: filePath });
        toast("Resume uploaded successfully", "success");
        onSuccess?.("ok");
      } else {
        throw new Error("Invalid file path returned");
      }
    } catch (err) {
      toast("Failed to upload resume", "error");
      onError?.(err);
    } finally {
      setUploadingResume(false);
    }
  };

  const getDescriptionsColumns = () => {
    if (screens.xxl) return 3;
    if (screens.xl) return 2;
    if (screens.md) return 2;
    return 1;
  };

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" tip="Loading profile data..." />
      </div>
    );
  }

  const personalInfoFields = (
    <React.Fragment>
      <Title level={5}>
        <IdcardOutlined /> Personal Information
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="National ID"
            name="nationalIdNo"
            rules={[{ required: true, message: "Please enter your National ID" }]}
          >
            <Input placeholder="Enter your National ID" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Date of Birth"
            name="dateofBirth"
            rules={[
              { required: true, message: "Please select your date of birth" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} format="YYYY-MM-DD" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Gender"
            name="gender"
            rules={[{ required: true, message: "Please select your gender" }]}
          >
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
              <Select.Option value="prefer-not-to-say">
                Prefer not to say
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  const contactInfoFields = (
    <React.Fragment>
      <Title level={5}>
        <PhoneOutlined /> Contact Information
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Cellphone No"
            name="cellphoneNo"
            rules={[
              { required: true, message: "Please enter your cellphone number" },
            ]}
          >
            <Input placeholder="Enter your cellphone number" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Alternative Phone" name="alternativePhone">
            <Input placeholder="Enter alternative phone number" />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  const addressInfoFields = (
    <React.Fragment>
      <Title level={5}>
        <EnvironmentOutlined /> Address Information
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            label="Address Line 1"
            name="addressLine1"
            rules={[{ required: true, message: "Please enter your address" }]}
          >
            <Input placeholder="Street address" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Address Line 2" name="addressLine2">
            <Input placeholder="Apartment, suite, unit, etc. (optional)" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="City"
            name="city"
            rules={[{ required: true, message: "Please enter your city" }]}
          >
            <Input placeholder="City" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Province/State"
            name="province"
            rules={[{ required: true, message: "Please enter your province" }]}
          >
            <Input placeholder="Province or state" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} lg={8}>
          <Form.Item
            label="Postal Code"
            name="postalCode"
            rules={[
              { required: true, message: "Please enter your postal code" },
            ]}
          >
            <Input placeholder="Postal code" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Please enter your country" }]}
          >
            <Select placeholder="Select country" showSearch>
              <Select.Option value="South Africa">South Africa</Select.Option>
              <Select.Option value="Canada">Canada</Select.Option>
              <Select.Option value="United States">United States</Select.Option>
              <Select.Option value="United Kingdom">
                United Kingdom
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  const educationFields = (
    <React.Fragment>
      <Title level={5}>
        <BookOutlined /> Education
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Highest Qualification"
            name="highestQualification"
            rules={[
              { required: true, message: "Please enter your qualification" },
            ]}
          >
            <Select placeholder="Select qualification">
              <Select.Option value="High School">High School</Select.Option>
              <Select.Option value="Associate's Degree">
                Associate&apos;s Degree
              </Select.Option>
              <Select.Option value="Bachelor's Degree">
                Bachelor&apos;s Degree
              </Select.Option>
              <Select.Option value="Master's Degree">
                Master&apos;s Degree
              </Select.Option>
              <Select.Option value="Doctorate">Doctorate</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Field of Study"
            name="fieldOfStudy"
            rules={[
              { required: true, message: "Please enter your field of study" },
            ]}
          >
            <Input placeholder="Field of study" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Institution"
            name="institution"
            rules={[
              { required: true, message: "Please enter your institution" },
            ]}
          >
            <Input placeholder="Name of institution" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Graduation Year"
            name="graduationYear"
            rules={[
              { required: true, message: "Please enter your graduation year" },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={1950}
              max={2030}
              placeholder="Year"
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  const experienceFields = (
    <React.Fragment>
      <Title level={5}>
        <BankOutlined /> Work Experience
      </Title>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Years of Experience"
            name="yearsOfExperience"
            rules={[
              {
                required: true,
                message: "Please enter your years of experience",
              },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0}
              max={50}
              placeholder="Years"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Current Employer" name="currentEmployer">
            <Input placeholder="Current employer name" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Current Position" name="currentPosition">
            <Input placeholder="Job title" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item label="Current Salary" name="currentSalary">
            <InputNumber
              style={{ width: "100%" }}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value?.replace(/\$\s?|(,*)/g, "") ?? ""}
              placeholder="Annual salary"
            />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  const additionalInfoFields = (
    <React.Fragment>
      <Title level={5}>Additional Information</Title>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Form.Item
            label="Resume"
            name="resumeUrl"
            rules={[{ required: true, message: "Please upload your resume" }]}
          >
            <Upload customRequest={handleCustomUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} loading={uploadingResume}>
                {uploadingResume ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
            {fileName && (
              <>
                <Text
                  type="secondary"
                  style={{ display: "block", marginTop: 8 }}
                >
                  Uploaded: {fileName}
                </Text>
                {resumeUrl && (
                  <Typography.Link
                    href={resumeUrl}
                    target="_blank"
                    style={{ display: "block", marginTop: 4 }}
                  >
                    View Uploaded Resume
                  </Typography.Link>
                )}
              </>
            )}
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Cover Letter" name="coverletter">
            <Input.TextArea
              rows={4}
              placeholder="Briefly describe why you're a good fit for the position"
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Willing to Relocate"
            name="isWillingToRelocate"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Has Criminal Record"
            name="hasCriminalRecord"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </React.Fragment>
  );

  return (
    <Card
      bordered={true}
      className="applicant-profile-card"
      style={{ width: "100%", maxWidth: 1200, margin: "auto" }}
    >
      <Row justify="space-between" align="middle" gutter={[16, 16]} wrap>
        <Col>
          <Space align="center" size="middle">
            <Avatar size={64} icon={<UserOutlined />} />
            <div>
              <Title level={3} style={{ margin: 0 }}>
                Applicant Profile
              </Title>
              <Text type="secondary">
                Review and update your application information
              </Text>
            </div>
          </Space>
        </Col>
        <Col>
          {!isEditing ? (
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={handleEditClick}
            >
              Edit Profile
            </Button>
          ) : null}
        </Col>
      </Row>

      <Divider />

      {isEditing ? (
        <Form
          layout="vertical"
          form={form}
          onFinish={onFinish}
          initialValues={applicant}
          requiredMark="optional"
          scrollToFirstError
        >
          {personalInfoFields}
          <Divider />
          {contactInfoFields}
          <Divider />
          {addressInfoFields}
          <Divider />
          {educationFields}
          <Divider />
          {experienceFields}
          <Divider />
          {additionalInfoFields}

          <Form.Item style={{ marginTop: 24 }}>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                icon={<SaveOutlined />}
                loading={loading}
              >
                Save Changes
              </Button>
              <Button
                onClick={() => setIsEditing(false)}
                icon={<CloseOutlined />}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <Descriptions
          bordered
          column={getDescriptionsColumns()}
          size="default"
          labelStyle={{ fontWeight: "bold" }}
          className="responsive-descriptions"
        >
          <Descriptions.Item
            label="Personal Information"
            span={getDescriptionsColumns()}
          >
            <Row gutter={[16, 8]}>
              <Col xs={24} sm={8}>
                <Text strong>National ID:</Text>{" "}
                {applicant?.nationalIdNo || "Not provided"}
              </Col>
              <Col xs={24} sm={8}>
                <Text strong>Gender:</Text>{" "}
                {applicant?.gender || "Not provided"}
              </Col>
              <Col xs={24} sm={8}>
                <Text strong>Date of Birth:</Text>{" "}
                {applicant?.dateofBirth
                  ? dayjs(applicant.dateofBirth).format("YYYY-MM-DD")
                  : "Not provided"}
              </Col>
            </Row>
          </Descriptions.Item>

          <Descriptions.Item label="Contact" span={getDescriptionsColumns()}>
            <Space direction="vertical" size="small">
              <div>
                <PhoneOutlined />{" "}
                {applicant?.cellphoneNo || "No cellphone provided"}
              </div>
              {applicant?.alternativePhone && (
                <div>
                  <PhoneOutlined /> {applicant.alternativePhone} (Alternative)
                </div>
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Address" span={getDescriptionsColumns()}>
            <Space direction="vertical" size="small">
              <div>{applicant?.addressLine1 || ""}</div>
              {applicant?.addressLine2 && <div>{applicant.addressLine2}</div>}
              <div>
                {applicant?.city && `${applicant.city}, `}
                {applicant?.province && `${applicant.province}, `}
                {applicant?.country || ""}
              </div>
              <div>{applicant?.postalCode || ""}</div>
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Education" span={getDescriptionsColumns()}>
            {applicant?.highestQualification ? (
              <Space direction="vertical" size="small">
                <div>
                  <Text strong>{applicant.highestQualification}</Text>
                  {applicant.fieldOfStudy && ` in ${applicant.fieldOfStudy}`}
                </div>
                <div>
                  {applicant.institution && `${applicant.institution}`}
                  {applicant.graduationYear && 
                    ` (${dayjs(applicant.graduationYear).format('YYYY')})`}
                </div>
              </Space>
            ) : (
              "No education details provided"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Experience" span={getDescriptionsColumns()}>
            <Space direction="vertical" size="small">
              {applicant?.yearsOfExperience && (
                <Tag color="blue">{`${applicant.yearsOfExperience} years of experience`}</Tag>
              )}
              {applicant?.currentPosition && applicant?.currentEmployer && (
                <div>
                  <Text strong>{applicant.currentPosition}</Text> at{" "}
                  {applicant.currentEmployer}
                </div>
              )}
              {applicant?.currentSalary && (
                <div>
                  <Text type="secondary">Current Salary:</Text> $
                  {Number(applicant.currentSalary).toLocaleString()}
                </div>
              )}
            </Space>
          </Descriptions.Item>

          <Descriptions.Item label="Documents" span={getDescriptionsColumns()}>
            {applicant?.resumeUrl ? (
              <Button
                type="link"
                href={applicant.resumeUrl}
                target="_blank"
                rel="noreferrer"
                icon={<UploadOutlined />}
              >
                View Resume
              </Button>
            ) : (
              "No resume uploaded"
            )}
          </Descriptions.Item>

          <Descriptions.Item
            label="Preferences"
            span={getDescriptionsColumns()}
          >
            <Space direction="vertical" size="small">
              <div>
                <Text strong>Willing to Relocate:</Text>{" "}
                <Tag color={applicant?.isWillingToRelocate ? "green" : "red"}>
                  {applicant?.isWillingToRelocate ? "Yes" : "No"}
                </Tag>
              </div>
              <div>
                <Text strong>Criminal Record:</Text>{" "}
                <Tag color={applicant?.hasCriminalRecord ? "red" : "green"}>
                  {applicant?.hasCriminalRecord ? "Yes" : "No"}
                </Tag>
              </div>
            </Space>
          </Descriptions.Item>

          {applicant?.coverletter && (
            <Descriptions.Item
              label="Cover Letter"
              span={getDescriptionsColumns()}
            >
              <div style={{ whiteSpace: "pre-line" }}>
                {applicant.coverletter}
              </div>
            </Descriptions.Item>
          )}
        </Descriptions>
      )}
    </Card>
  );
};

export default ApplicantProfile;