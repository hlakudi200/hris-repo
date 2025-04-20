'use client';
import React, { useEffect, useState } from 'react';
import { Input, Table, Spin, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLeaveRequestActions, useLeaveRequestState } from '@/providers/leaveRequest';
import { ILeaveRequest } from '@/providers/leaveRequest/context';
import moment from 'moment';
import globals from '../globals.module.css';
import styles from "./styles/styles.module.css";

const { Search } = Input;

const ManageLeaveRequest = () => {
  const { getLeaveRequests } = useLeaveRequestActions();
  const { leaveRequests, isPending, isSuccess } = useLeaveRequestState();
  const [filteredData, setFilteredData] = useState<ILeaveRequest[]>([]);
  const [searchText, setSearchText] = useState('');

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

  const columns: ColumnsType<ILeaveRequest> = [
    {
      title: 'Employee Name',
      dataIndex: ['employee', 'user', 'fullName'],
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
  ];

  return (
    <div className={styles.OuterContainer}>
      <h2 style={{ marginBottom: '1rem' }} className={globals.heading} >📅 Manage Leave Requests</h2>

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
    </div>
  );
};

export default ManageLeaveRequest;
