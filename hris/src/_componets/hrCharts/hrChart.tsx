"use client";

import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import { Line, Bar, Pie } from "react-chartjs-2";
import moment from "moment";

import {
  usePayrollTransactionActions,
  usePayrollTransactionState,
} from "@/providers/payrolltransaction";
import globals from "../globals.module.css";
import styles from "./styles/styles.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

const HrCharts: React.FC = () => {
  const { getAllTrasactions } = usePayrollTransactionActions();
  const { payrollTransactions } = usePayrollTransactionState();

  useEffect(() => {
    getAllTrasactions();
  }, []);

  const payrollTrasactionList = payrollTransactions ?? [];

  if (payrollTrasactionList.length === 0) {
    return <p className="p-4">Loading or no data available...</p>;
  }

  const aggregatedData = payrollTrasactionList.reduce(
    (acc, item) => {
      acc.totalGross += item.grossAmount;
      acc.totalTax += item.taxAmount;
      acc.totalNet += item.netAmount;
      acc.dates.push(moment(item.periodStart).format("MMM YYYY"));
      return acc;
    },
    { totalGross: 0, totalTax: 0, totalNet: 0, dates: [] as string[] }
  );

  const { totalGross, totalTax, totalNet, dates } = aggregatedData;

  const payrollOverTimeData = {
    labels: dates,
    datasets: [
      {
        label: "Total Gross",
        data: payrollTrasactionList.map((entry) => entry.grossAmount),
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        tension: 0.3,
      },
      {
        label: "Total Tax",
        data: payrollTrasactionList.map((entry) => entry.taxAmount),
        borderColor: "#ff9800",
        backgroundColor: "#ff9800",
        tension: 0.3,
      },
      {
        label: "Total Net",
        data: payrollTrasactionList.map((entry) => entry.netAmount),
        borderColor: "#2196f3",
        backgroundColor: "#2196f3",
        tension: 0.3,
      },
    ],
  };

  const grossNetComparisonData = {
    labels: ["Gross Amount", "Net Amount"],
    datasets: [
      {
        label: "Payroll Overview",
        data: [totalGross, totalNet],
        backgroundColor: ["#4caf50", "#2196f3"],
      },
    ],
  };

  const payrollDistributionData = {
    labels: ["Gross Amount", "Tax Amount", "Net Amount"],
    datasets: [
      {
        data: [totalGross, totalTax, totalNet],
        backgroundColor: ["#4caf50", "#ff9800", "#2196f3"],
      },
    ],
  };

  return (
    <div>
      <h2 className={globals.heading}>Payroll Dashboard</h2>
      <div className={styles.container}>
        <div className={styles.chartContainer}>
          <h3 className={globals.subheading}>Total Payroll Over Time</h3>
          <Line data={payrollOverTimeData} />
        </div>

        <div className={styles.chartContainer}>
          <h3 className={globals.subheading}>Gross vs Net Comparison</h3>
          <Bar data={grossNetComparisonData} />
        </div>

        <div className={styles.chartContainer} >
          <h3 className={globals.subheading}>Payroll Distribution</h3>
          <Pie data={payrollDistributionData} style={{width:"80%",height:"90%"}}/>
        </div>
      </div>
    </div>
  );
};

export default HrCharts;
