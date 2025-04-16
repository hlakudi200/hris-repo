"use client";
import React, { useEffect, useState } from "react";
import type { TableColumnsType } from "antd";
import { Button, Modal, Spin, Table } from "antd";
import { usePayrollActions, usePayrollState } from "@/providers/payrollProfile";
import ViewPayrollTransactions from "../viewPayrollTransactions/viewPayrollTransactions";
import { IPayrollTransaction } from "@/providers/payrolltransaction/context";

interface DataType {
  key: string;
  id: string;
  employeeName: string;
  employeePosition: string;
  basicSalary: number;
  taxRate: number;
  transactions: IPayrollTransaction[];
}

const ManagerPayroll: React.FC = () => {
  const { namedPayrollProfiles, isPending } = usePayrollState();
  const { getAllNamed } = usePayrollActions();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  useEffect(() => {
    getAllNamed();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  if (isPending) return <Spin size="large" />;

  const columns: TableColumnsType<DataType> = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "name",
    },
    {
      title: "Position",
      dataIndex: "employeePosition",
      key: "position",
    },
    {
      title: "Basic Salary",
      dataIndex: "basicSalary",
      key: "basicSalary",
    },
    {
      title: "Tax Rate",
      dataIndex: "taxRate",
      key: "taxRate",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            setSelectedRecord(record.transactions);
            setIsModalVisible(true);
          }}
        >
          View transactions
        </Button>
      ),
    },
  ];

  const dataSource: DataType[] =
    namedPayrollProfiles?.map((profile, index) => ({
      key: profile.id ?? index.toString(),
      id: profile.id,
      employeeName: profile.employeeName,
      employeePosition: profile.employeePosition,
      basicSalary: profile.basicSalary,
      taxRate: profile.taxRate,
      transactions: profile.transactions,
    })) || [];

  return (
    <div style={{ padding: "1rem", overflowY: "auto", height: "76vh" }}>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="View transactions"
        open={isModalVisible}
        width={"50%"}
        height={"10%"}
        style={{ maxHeight: "70px" }}
        onCancel={handleCancel}
      >
        <ViewPayrollTransactions transactions={selectedRecord} />
      </Modal>
    </div>
  );
};

export default ManagerPayroll;
