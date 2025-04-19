"use client";
import React, { useState } from "react";
import type { TableColumnsType } from "antd";
import {
  Table,
  Input,
  Space,
  Button,
  Modal,
} from "antd";
import { IPayrollTransaction } from "@/providers/payrolltransaction/context";
import { usePayrollTransactionActions } from "@/providers/payrolltransaction";
import { toast } from "@/providers/toast/toast";

interface DataType {
  key: string;
  id: string;
  periodStart: string;
  periodEnd: string;
  grossAmount: number;
  taxAmount?: number;
  netAmount?: number;
  isPaid: boolean;
}

interface ViewPayrollTransactionsProps {
  transactions: IPayrollTransaction[];
}

const ViewPayrollTransactions: React.FC<ViewPayrollTransactionsProps> = ({
  transactions,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { sentPaySlip } = usePayrollTransactionActions();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const showConfirmModal = (id: string) => {
    setSelectedId(id);
    setIsModalOpen(true);
  };

  const handleSendPayslip = async () => {
    if (!selectedId) return;

    try {
      setLoadingId(selectedId);
      await sentPaySlip(selectedId);
      toast("Payslip sent successfully","success")
    } catch (err) {
      toast("Failed to send payslip","error")
      console.log(err)
    } finally {
      setLoadingId(null);
      setSelectedId(null);
      setIsModalOpen(false);
    }
  };

  const filteredTransactions = transactions.filter((tx) => {
    const combined = `${tx.periodStart} ${tx.periodEnd} ${tx.grossAmount} ${tx.taxAmount} ${tx.netAmount} ${tx.isPaid}`.toLowerCase();
    return combined.includes(searchTerm);
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "From",
      dataIndex: "periodStart",
      key: "from",
      render: (value: string) =>
        new Date(value).toLocaleDateString("en-ZA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      title: "To",
      dataIndex: "periodEnd",
      key: "to",
      render: (value: string) =>
        new Date(value).toLocaleDateString("en-ZA", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
    },
    {
      title: "Gross Amount",
      dataIndex: "grossAmount",
      key: "grossAmount",
      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
        }).format(value),
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmount",
      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
        }).format(value),
    },
    {
      title: "Nett Amount",
      dataIndex: "netAmount",
      key: "netAmount",
      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
        }).format(value),
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => showConfirmModal(record.id)}
          loading={loadingId === record.id}
          disabled={!record.id}
        >
          Send Payslip
        </Button>
      ),
    },
  ];

  const dataSource: DataType[] =
    filteredTransactions.map((transaction, index) => ({
      key: index.toString(),
      id: transaction.id,
      ...transaction,
    })) || [];

  return (
    <div style={{ padding: "1rem", overflowY: "auto" }}>
      <Space style={{ marginBottom: 16 }}>
        <Input.Search
          placeholder="Search transactions..."
          onChange={handleSearch}
          allowClear
        />
      </Space>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />

      <Modal
        title="Confirm Send"
        open={isModalOpen}
        onOk={handleSendPayslip}
        confirmLoading={!!loadingId}
        onCancel={() => {
          setIsModalOpen(false);
          setSelectedId(null);
        }}
        okText="Yes, Send"
        cancelText="Cancel"
      >
        Are you sure you want to send the payslip to this employee?
      </Modal>
    </div>
  );
};

export default ViewPayrollTransactions;
