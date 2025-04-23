"use client";
import React, { useEffect, useState } from "react";
import type { TableColumnsType, TablePaginationConfig } from "antd";
import { 
  Table, 
  Spin, 
  Alert, 
  Button, 
  Modal, 
  Form, 
  Input, 
  Space, 
  Select, 
  Input as AntdInput,
  Tag,
  Typography
} from "antd";
import { SearchOutlined, FilterOutlined, SortAscendingOutlined, FileTextOutlined } from "@ant-design/icons";
import { useJobPostingActions, useJobPostingState } from "@/providers/jobPost";
import {
  useJobApplicationActions,
  useJobApplicationState,
} from "@/providers/jobApplication";

import { IJobApplication } from "@/providers/jobApplication/context";
import { toast } from "@/providers/toast/toast";
import FileUpload from "../fileUploadComponent/fileUpload";
import { useEmailActions } from "@/providers/email";
import { applicationSubmittedTemplate } from "@/providers/email/emailTemplates/applicationSubmitted";
import { SortOrder } from "antd/es/table/interface";

const { Search } = AntdInput;
const { Option } = Select;
const { Paragraph} = Typography;

interface DataType {
  key: string;
  id: string;
  title: string;
  openDate: string;
  closeDate: string;
  location: string;
  description: string;
  rawOpenDate: Date; // For sorting purposes
  rawCloseDate: Date; // For sorting purposes
}

const ApplicantJobView: React.FC = () => {
  const { JobPostings, isPending, isError } = useJobPostingState();
  const { getJobPostings } = useJobPostingActions();
  const { isError: isApplicationError, isSuccess: IsApplicationSuccess } =
    useJobApplicationState();
  const { submitJobApplication, resetStateFlags } = useJobApplicationActions();
  const { sendEmail } = useEmailActions();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDescriptionModalVisible, setIsDescriptionModalVisible] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);
  const [selectedJobName, setSelectedJobName] = useState<string | null>(null);
  const [selectedJobDescription, setSelectedJobDescription] = useState<string>("");
  const [resumePath, setResumePath] = useState<string>("");
  const [searchText, setSearchText] = useState<string>("");
  const [sortField, setSortField] = useState<string>("title");
  const [sortOrder, setSortOrder] = useState<"ascend" | "descend">("ascend");
  const [locationFilter, setLocationFilter] = useState<string[]>([]);
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [filteredData, setFilteredData] = useState<DataType[]>([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getJobPostings();
  }, []);

  // Transform job postings data when job postings change
  useEffect(() => {
    if (JobPostings) {
      const transformedData = JobPostings.map((post, index) => ({
        key: post.id || index.toString(),
        id: post.id,
        title: post.title,
        openDate: formatDate(post.openDate),
        closeDate: formatDate(post.closeDate),
        location: post.location,
        description: post.description,
        rawOpenDate: new Date(post.openDate),
        rawCloseDate: new Date(post.closeDate),
      }));
      setDataSource(transformedData);
      setFilteredData(transformedData);
    }
  }, [JobPostings]);

  useEffect(() => {
    if (IsApplicationSuccess) {
      toast("Application submitted", "success");
      resetStateFlags();
    }
    if (isApplicationError) {
      toast("Failed to submit application", "error");
      resetStateFlags();
    }
  }, [IsApplicationSuccess, isApplicationError, resetStateFlags]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Extract unique locations for filter dropdown
  const uniqueLocations = Array.from(new Set(dataSource.map((item) => item.location)))
    .filter(Boolean)
    .sort();

  // Update filtered data when search, sort, or filters change
  useEffect(() => {
    let result = [...dataSource];
    
    // Apply search filter
    if (searchText) {
      const lowerCaseSearch = searchText.toLowerCase();
      result = result.filter(
        (item) =>
          item.title.toLowerCase().includes(lowerCaseSearch) ||
          item.description.toLowerCase().includes(lowerCaseSearch) ||
          item.location.toLowerCase().includes(lowerCaseSearch)
      );
    }
    
    // Apply location filter
    if (locationFilter.length > 0) {
      result = result.filter((item) => locationFilter.includes(item.location));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let comparison = 0;
      
      switch (sortField) {
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "location":
          comparison = a.location.localeCompare(b.location);
          break;
        case "openDate":
          comparison = a.rawOpenDate.getTime() - b.rawOpenDate.getTime();
          break;
        case "closeDate":
          comparison = a.rawCloseDate.getTime() - b.rawCloseDate.getTime();
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === "ascend" ? comparison : -comparison;
    });
    
    setFilteredData(result);
  }, [dataSource, searchText, sortField, sortOrder, locationFilter]);

  const openDescriptionModal = (description: string, title: string) => {
    setSelectedJobDescription(description);
    setSelectedJobName(title);
    setIsDescriptionModalVisible(true);
  };

  if (isPending) return <Spin size="large" />;
  if (isError)
    return <Alert message="Error loading job postings" type="error" />;

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: true,
      sortOrder: sortField === "title" ? sortOrder : null,
    },
    {
      title: "Opening Date",
      dataIndex: "openDate",
      key: "openDate",
      sorter: true,
      sortOrder: sortField === "openDate" ? sortOrder : null,
    },
    {
      title: "Closing Date",
      dataIndex: "closeDate",
      key: "closeDate",
      sorter: true,
      sortOrder: sortField === "closeDate" ? sortOrder : null,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      sorter: true,
      sortOrder: sortField === "location" ? sortOrder : null,
      render: (location) => location,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      ellipsis: true,
      render: (description, record) => (
        <div 
          onClick={() => openDescriptionModal(description, record.title)}
          style={{ cursor: 'pointer', color: '#1890ff', display: 'flex', alignItems: 'center' }}
        >
          <FileTextOutlined style={{ marginRight: 5 }} />
          {description.length > 50 ? `${description.substring(0, 50)}...` : description}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedJobId(record.id);
            setSelectedJobName(record.title);
            setIsModalVisible(true);
          }}
        >
          Apply for role
        </Button>
      ),
    },
  ];

  interface Sorter {
    field?: string;
    order?: SortOrder;
  }

  const handleTableChange = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, (string | number | boolean)[] | null>,
    sorter: Sorter
  ) => {
    if (sorter.field) {
      setSortField(sorter.field);
      setSortOrder(sorter.order || "ascend");
    }
  };
  return (
    <div style={{ padding: "1rem", overflowY: "auto", height: "76vh" }}>
      <div style={{ marginBottom: "1rem" }}>
        <Space style={{ width: "100%", justifyContent: "space-between", marginBottom: "1rem" }}>
          <Space>
            <Search
              placeholder="Search jobs by title, description or location"
              allowClear
              enterButton={<SearchOutlined />}
              onSearch={(value) => setSearchText(value)}
              style={{ width: 300 }}
              onChange={(e) => {
                if (e.target.value === "") {
                  setSearchText("");
                }
              }}
            />
            <Select
              placeholder={<><SortAscendingOutlined /> Sort by</>}
              style={{ width: 150 }}
              onChange={(value) => {
                const [field, order] = value.split("-");
                setSortField(field);
                setSortOrder(order as "ascend" | "descend");
              }}
              value={`${sortField}-${sortOrder}`}
            >
              <Option value="title-ascend">Title (A-Z)</Option>
              <Option value="title-descend">Title (Z-A)</Option>
              <Option value="location-ascend">Location (A-Z)</Option>
              <Option value="location-descend">Location (Z-A)</Option>
              <Option value="openDate-ascend">Open Date (Oldest)</Option>
              <Option value="openDate-descend">Open Date (Newest)</Option>
              <Option value="closeDate-ascend">Close Date (Soonest)</Option>
              <Option value="closeDate-descend">Close Date (Latest)</Option>
            </Select>
            
            <Select
              placeholder={<><FilterOutlined /> Filter by location</>}
              style={{ width: 200 }}
              mode="multiple"
              allowClear
              onChange={(values) => setLocationFilter(values)}
              value={locationFilter}
            >
              {uniqueLocations.map(location => (
                <Option key={location} value={location}>{location}</Option>
              ))}
            </Select>
          </Space>
          <div>
            <span>Found {filteredData.length} job postings</span>
          </div>
        </Space>
        
        {locationFilter.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <span>Filtered by location: </span>
            {locationFilter.map(location => (
              <Tag 
                key={location} 
                closable 
                onClose={() => setLocationFilter(locationFilter.filter(l => l !== location))}
              >
                {location}
              </Tag>
            ))}
            <Button 
              type="link" 
              size="small" 
              onClick={() => setLocationFilter([])}
            >
              Clear all filters
            </Button>
          </div>
        )}
      </div>

      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
        onChange={handleTableChange}
      />

      {/* Job Description Modal */}
      <Modal
        title={`Job Description: ${selectedJobName}`}
        open={isDescriptionModalVisible}
        onCancel={() => setIsDescriptionModalVisible(false)}
        footer={[
          <Button key="apply" type="primary" onClick={() => {
            // Close description modal and open application modal
            setIsDescriptionModalVisible(false);
            
            // Find the job ID based on the selected job name
            const job = filteredData.find(job => job.title === selectedJobName);
            if (job) {
              setSelectedJobId(job.id);
              setIsModalVisible(true);
            }
          }}>
            Apply for this role
          </Button>,
          <Button key="close" onClick={() => setIsDescriptionModalVisible(false)}>
            Close
          </Button>,
        ]}
        width={700}
      >
        <div style={{ maxHeight: '50vh', overflow: 'auto', padding: '10px' }}>
          <Paragraph>{selectedJobDescription}</Paragraph>
        </div>
      </Modal>

      {/* Job Application Modal */}
      <Modal
        title="Apply for Job"
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setResumePath("");
        }}
        onOk={() => {
          form.validateFields().then((values) => {
            if (!resumePath) {
              toast("Please upload your resume", "error");
              return;
            }

            const application: IJobApplication = {
              jobPostingId: selectedJobId,
              applicantName: values.name,
              email: values.email,
              resumePath: resumePath,
              status: "Pending",
            };

            submitJobApplication(application);
            const body = applicationSubmittedTemplate(
              values.name,
              selectedJobName
            );
              sendEmail({
                to: values.email || "",
                subject: `Application for Job post ${selectedJobName} Received`,
                body,
                isBodyHtml: true,
              });

            setIsModalVisible(false);
            form.resetFields();
            setResumePath("");
          });
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: "Please enter your name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please enter your email" },
              { type: "email", message: "Please enter a valid email" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Upload Resume (PDF)">
            <FileUpload onUploadSuccess={(path) => setResumePath(path)} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ApplicantJobView;