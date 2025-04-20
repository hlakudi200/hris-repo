'use client';
import React, { useEffect, useState } from 'react';
import { Input, Table, Spin, Tag, Button, Modal, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLeaveRequestActions, useLeaveRequestState } from '@/providers/leaveRequest';
import { ILeaveRequest } from '@/providers/leaveRequest/context';
import moment from 'moment';
import globals from '../globals.module.css';
import styles from './styles/styles.module.css';

const { Search } = Input;

const ManageLeaveRequest = () => {
  const { getLeaveRequests } = useLeaveRequestActions();
  const { leaveRequests, isPending, isSuccess } = useLeaveRequestState();
  const [filteredData, setFilteredData] = useState<ILeaveRequest[]>([]);
  const [searchText, setSearchText] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState<'approve' | 'decline' | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<ILeaveRequest | null>(null);

  useEffect(() => {
    getLeaveRequests();
  }, []);

  useEffect(() => {
    if (isSuccess && leaveRequests) {
      setFilteredData(leaveRequests);
    }
  }, [isSuccess, leaveRequests]);

  const handleSearch = (value: string) => {
    setSearchText(value);
    const lowerSearch = value.toLowerCase();
    const filtered = leaveRequests.filter((leave) =>
      leave?.employee?.user?.name?.toLowerCase().includes(lowerSearch) ||
      leave.leaveType.toLowerCase().includes(lowerSearch) ||
      leave.status.toLowerCase().includes(lowerSearch)
    );
    setFilteredData(filtered);
  };

  const openModal = (action: 'approve' | 'decline', record: ILeaveRequest) => {
    setModalAction(action);
    setSelectedRequest(record);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!modalAction || !selectedRequest) return;

    try {
      setProcessingId(selectedRequest.id ?? null);

      // Replace this with your actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      message.success(`Leave request ${modalAction}d successfully`);
      getLeaveRequests();
    } catch (error) {
      message.error(`Failed to ${modalAction} leave request`);
    } finally {
      setProcessingId(null);
      setIsModalOpen(false);
    }
  };

  const columns: ColumnsType<ILeaveRequest> = [
    {
      title: 'Employee Name',
      dataIndex: ['employee', 'user', 'name'],
      key: 'employeeName',
      sorter: (a, b) =>
        (a.employee?.user?.name || '').localeCompare(b.employee?.user?.name || ''),
    },
    {
      title: 'Leave Type',
      dataIndex: 'leaveType',
      key: 'leaveType',
      sorter: (a, b) => a.leaveType.localeCompare(b.leaveType),
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => moment(a.startDate).unix() - moment(b.startDate).unix(),
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => moment(a.endDate).unix() - moment(b.endDate).unix(),
      render: (text) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const color = status === 'approved' ? 'green' : status === 'pending' ? 'orange' : 'red';
        return <Tag color={color}>{status.toUpperCase()}</Tag>;
      },
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            type="primary"
            disabled={processingId === record.id}
            onClick={() => openModal('approve', record)}
          >
            Approve
          </Button>
          <Button
            danger
            disabled={processingId === record.id}
            onClick={() => openModal('decline', record)}
          >
            Decline
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.OuterContainer}>
      <h2 style={{ marginBottom: '1rem' }} className={globals.heading}>
        📅 Manage Leave Requests
      </h2>

      <Search
        placeholder="Search by name, leave type or status"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        value={searchText}
        enterButton
        allowClear
        style={{ maxWidth: 400, marginBottom: 20 }}
      />

      {isPending ? (
        <Spin size="large" />
      ) : (
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey={(record) => record.id ?? ''}
          pagination={{ pageSize: 5 }}
          bordered
        />
      )}

      {/* Modal for approve/decline confirmation */}
      <Modal
        title={`Confirm ${modalAction}`}
        open={isModalOpen}
        onOk={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        confirmLoading={processingId !== null}
        okText="Yes"
        cancelText="No"
      >
        <p>Are you sure you want to <b>{modalAction}</b> this leave request?</p>
        <p>
          <strong>Employee:</strong> {selectedRequest?.employee?.user?.name} <br />
          <strong>Leave Type:</strong> {selectedRequest?.leaveType}
        </p>
      </Modal>
    </div>
  );
};

export default ManageLeaveRequest;
