"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import { usePayrollActions, usePayrollState } from "@/providers/payrollProfile";
import { usePayrollTransactionActions } from "@/providers/payrolltransaction";
import {
  Card,
  Table,
  Descriptions,
  Flex,
  Spin,
  Divider,
  Tag,
  Button,
} from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import { useEmployeeState } from "@/providers/employee";

const EmployeePayroll = () => {
  const { isPending, isError, PayrollProfile } = usePayrollState();
  const { currentEmployee } = useEmployeeState();
  const { getPayrollProfileById } = usePayrollActions();
  const { generatePayrollTransactionPdf } = usePayrollTransactionActions();

  useEffect(() => {
    getPayrollProfileById(currentEmployee.id);
  }, []);

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  if (isError) {
    return <div>Failed to load payroll data</div>;
  }

  const payrollProfile = PayrollProfile;

  const columns = [
    {
      title: "Period Start",
      dataIndex: "periodStart",
      key: "periodStart",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Period End",
      dataIndex: "periodEnd",
      key: "periodEnd",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Gross Amount",
      dataIndex: "grossAmount",
      key: "grossAmount",
      render: (amount) => `R${amount.toFixed(2)}`,
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmount",
      render: (amount) => `R${amount.toFixed(2)}`,
    },
    {
      title: "Net Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (amount) => `R${amount.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (isPaid) => (
        <Tag color={isPaid ? "green" : "red"}>
          {isPaid ? "Paid" : "Pending"}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button
          icon={<DownloadOutlined />}
          onClick={() => generatePayrollTransactionPdf(record.id)}
        >
          Download Payslip
        </Button>
      ),
    },
  ];

  return (
    <div className={globals.OuterContainer}>
      <Card className={globals.InfoContainer} bordered={false}>
        <Descriptions title="Employee Info" column={1} size="middle">
          <Descriptions.Item label="Position">
            {payrollProfile?.employeePosition || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Basic Salary">
            R{payrollProfile?.basicSalary?.toFixed(2)}
          </Descriptions.Item>
          <Descriptions.Item label="Tax Rate">
            {payrollProfile?.taxRate}%
          </Descriptions.Item>
        </Descriptions>
      </Card>

      <Divider orientation="left" style={{ marginTop: 2 }}>
        Transaction History
      </Divider>

      <Card>
        <Table
          columns={columns}
          dataSource={payrollProfile?.transactions || []}
          rowKey={(record, index) => `${record.payrollProfileId}-${index}`}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
      </Card>
    </div>
  );
};

export default EmployeePayroll;
