"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Spin,
  Table,
  Tooltip,
  Tag,
  Badge,
  Input,
  Space,
  DatePicker,
  message,
} from "antd";
import type { TableColumnsType } from "antd";
import dayjs from "dayjs";
import { usePayrollActions, usePayrollState } from "@/providers/payrollProfile";
import ViewPayrollTransactions from "../viewPayrollTransactions/viewPayrollTransactions";
import { IPayrollTransaction } from "@/providers/payrolltransaction/context";
import { usePayrollTransactionActions,usePayrollTransactionState } from "@/providers/payrolltransaction";
import { toast } from "@/providers/toast/toast";

const currencyFormatter = new Intl.NumberFormat("en-ZA", {
  style: "currency",
  currency: "ZAR",
});

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
  const { namedPayrollProfiles} = usePayrollState();
  const { getAllNamed} = usePayrollActions();
  const {sentPaySlips}=usePayrollTransactionActions();
  const {isSuccess,isError,isPending}=usePayrollTransactionState()
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);


  useEffect(() => {
    getAllNamed();
  }, []);

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedRecord(null);
  };

  const handleSendPayslips = async () => {
    if (!selectedDate) {
      message.warning("Please select a date");
      return;
    }

    try {
  
      await sentPaySlips(selectedDate.toDate());
      if(isSuccess){
        toast("Payslips sent successfully","success");
      }
        
      setSendModalVisible(false);
    } catch (error) {
      console.error(error);
       if (isError)
       {
        toast("Failed to send payslips","error");
       }
    } 
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

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

  const filteredData = dataSource.filter((item) => {
    return (
      item.employeeName.toLowerCase().includes(searchTerm) ||
      item.employeePosition.toLowerCase().includes(searchTerm)
    );
  });

  if (isPending) return <Spin size="large" />;

  const columns: TableColumnsType<DataType> = [
    {
      title: "Employee Name",
      dataIndex: "employeeName",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Position",
      dataIndex: "employeePosition",
      key: "position",
      render: (text) => <Tag color="geekblue">{text}</Tag>,
    },
    {
      title: (
        <Tooltip title="Monthly Base Pay (Excludes bonuses)">
          Basic Salary
        </Tooltip>
      ),
      dataIndex: "basicSalary",
      key: "basicSalary",
      sorter: (a, b) => a.basicSalary - b.basicSalary,
      render: (salary: number) => (
        <span style={{ color: salary > 20000 ? "green" : "orange" }}>
          {currencyFormatter.format(salary)}
        </span>
      ),
    },
    {
      title: (
        <Tooltip title="Percentage deducted for tax">
          Tax Rate (%)
        </Tooltip>
      ),
      dataIndex: "taxRate",
      key: "taxRate",
      render: (rate: number) => `${rate}%`,
    },
    {
      title: "Transactions",
      key: "transactions",
      render: (_, record) => (
        <Badge
          count={record.transactions.length}
          overflowCount={99}
          style={{ backgroundColor: "#52c41a" }}
        />
      ),
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
          disabled={record.transactions.length === 0}
        >
          View Transactions
        </Button>
      ),
    },
  ];

  return (
    <div style={{ padding: "1rem", overflowY: "auto", height: "76vh" }}>
      <Space direction="vertical" style={{ width: "100%", marginBottom: "1rem" }}>
        <Input.Search
          placeholder="Search employee by name or position"
          allowClear
          onChange={handleSearch}
          style={{ maxWidth: 300 }}
        />
        <Button type="primary" onClick={() => setSendModalVisible(true)}>
          Send Payslips by Date
        </Button>
      </Space>
      <Table<DataType>
        columns={columns}
        dataSource={filteredData}
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="View transactions"
        open={isModalVisible}
        width={"50%"}
        onCancel={handleCancel}
        footer={null}
      >
        <ViewPayrollTransactions transactions={selectedRecord} />
      </Modal>

      <Modal
        title="Send Payslips"
        open={sendModalVisible}
        onCancel={() => setSendModalVisible(false)}
        onOk={handleSendPayslips}
        confirmLoading={isPending}
        okText="Send"
      >
        <p>Select the date for which you want to send payslips:</p>
        <DatePicker
          onChange={(date) => setSelectedDate(date)}
          style={{ width: "100%" }}
          format="YYYY-MM-DD"
        />
      </Modal>
    </div>
  );
};

export default ManagerPayroll;
