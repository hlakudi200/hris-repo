'use client';
import React, { useEffect, useState } from 'react';
import {
  useAttandanceActions,
  useAttandanceState,
} from '@/providers/attandance';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Spin,
  Alert,
  Card,
  notification,
  Space,
} from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import type { IProject } from '@/providers/attandance/context';

const Projects = () => {
  const { getProjects, createProject } = useAttandanceActions();
  const { isPending, isError, isSuccess, projects } = useAttandanceState();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [searchText, setSearchText] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<IProject[]>([]);

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    if (projects) {
      const filtered = projects.filter((project) =>
        [project.projectCode, project.title, project.description]
          .join(' ')
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
      setFilteredProjects(filtered);
    }
  }, [searchText, projects]);

  const handleAddProject = async () => {
    try {
      const values = await form.validateFields();
      await createProject(values);
      setIsModalVisible(false);
      form.resetFields();
      getProjects();
      notification.success({
        message: 'Project Created',
        description: 'Your project was created successfully.',
      });
    } catch (error) {
      notification.error({
        message: 'Creation Failed',
        description: 'Something went wrong while creating the project.',
      });

      console.error(error)
    }
  };
  const columns = [
    {
      title: 'Project Code',
      dataIndex: 'projectCode',
      key: 'projectCode',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];

  return (
    <div className="p-4">
      <Card
        title="Projects"
        extra={
          <Space>
            <Input
              placeholder="Search projects..."
              prefix={<SearchOutlined />}
              allowClear
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: 250 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setIsModalVisible(true)}
            >
              New Project
            </Button>
          </Space>
        }
      >
        {isPending && <Spin />}
        {isError && <Alert message="Failed to load projects." type="error" />}
        {isSuccess && (
          <Table
            dataSource={filteredProjects ?? []}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 3 }}
          />
        )}
      </Card>

      <Modal
        title="Add New Project"
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleAddProject}
        okText="Create"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="projectCode"
            label="Project Code"
            rules={[{ required: true, message: 'Please enter the project code' }]}
          >
            <Input placeholder="PRJ1006" />
          </Form.Item>
          <Form.Item
            name="title"
            label="Project Title"
            rules={[{ required: true, message: 'Please enter the project title' }]}
          >
            <Input placeholder="Project Title" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Project Description"
            rules={[{ required: true, message: 'Please enter the project description' }]}
          >
            <Input.TextArea placeholder="Project Description" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Projects;
