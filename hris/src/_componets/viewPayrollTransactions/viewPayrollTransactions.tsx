"use client";
import React from "react";
import type { TableColumnsType } from "antd";
import { Table } from "antd";
import { IPayrollTransaction } from "@/providers/payrolltransaction/context";

interface DataType {
  key: string;
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
  const columns: TableColumnsType<DataType> = [
    {
      title: "From",
      dataIndex: "periodStart",
      key: "from",
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-Za", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      title: "To",
      dataIndex: "periodEnd",
      key: "to",
      render: (value: string) => {
        const date = new Date(value);
        return date.toLocaleDateString("en-Za", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
    },
    {
      title: "Gross Amount",
      dataIndex: "grossAmount",
      key: "grossAmount",
      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
          minimumFractionDigits: 2,
        }).format(value),
    },
    {
      title: "Tax Amount",
      dataIndex: "taxAmount",
      key: "taxAmoount",
      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
          minimumFractionDigits: 2,
        }).format(value),
    },
    {
      title: "Nett Amount",
      dataIndex: "netAmount",
      key: "netAmoount",

      render: (value: number) =>
        Intl.NumberFormat("en-ZA", {
          style: "currency",
          currency: "ZAR",
          minimumFractionDigits: 2,
        }).format(value),
    },
    {
      title: "Paid",
      dataIndex: "isPaid",
      key: "isPaid",
      render: (value: boolean) => (value ? "Yes" : "No"),
    },
  ];

  const dataSource: DataType[] =
    transactions.map((transaction, index) => ({
      key: index.toString(),
      ...transaction,
    })) || [];

  return (
    <div style={{ padding: "1rem", overflowY: "auto" }}>
      <Table<DataType>
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
      />
    </div>
  );
};

export default ViewPayrollTransactions;
