"use client";

import React, { useEffect, useState } from "react";
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
import { Spin, Alert, Modal, Radio } from "antd";
import { CalendarOutlined, FilterOutlined, InfoCircleOutlined } from "@ant-design/icons";

import {
  usePayrollTransactionActions,
  usePayrollTransactionState,
} from "@/providers/payrolltransaction";
import {
  useLeaveRequestActions,
  useLeaveRequestState,
} from "@/providers/leaveRequest";
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
  const { payrollTransactions, isPending, isSuccess, isError } = usePayrollTransactionState();
  const { getLeaveRequests } = useLeaveRequestActions();
  const { leaveRequests } = useLeaveRequestState();
 
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalChart, setModalChart] = useState<{ title: string; element: React.ReactNode } | null>(null);
  const [yearFilter, setYearFilter] = useState("current");

  const openChartModal = (title: string, chartElement: React.ReactNode) => {
    setModalChart({ title, element: chartElement });
    setIsModalVisible(true);
  };

  const closeChartModal = () => {
    setIsModalVisible(false);
    setModalChart(null);
  };

  useEffect(() => {
    getAllTrasactions();
    getLeaveRequests();
  }, []);

  const payrollTrasactionList = payrollTransactions ?? [];
  const leaveRequestList = leaveRequests ?? [];

  if (isPending) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "60vh" }}>
        <Spin size="large" tip="Loading payroll data..." />
      </div>
    );
  }

  if (isError) {
    return (
      <div style={{ padding: "2rem" }}>
        <Alert message="Failed to load payroll data." type="error" showIcon />
      </div>
    );
  }

  if (isSuccess && payrollTrasactionList.length === 0) {
    return (
      <div style={{ padding: "2rem" }}>
        <Alert message="No payroll data available." type="info" showIcon />
      </div>
    );
  }

  // Function to filter data based on the selected year
  const filterDataByYear = (data) => {
    const currentYear = moment().year();
    
    switch(yearFilter) {
      case "current":
        return data.filter(item => moment(item.periodStart).year() === currentYear);
      case "last":
        return data.filter(item => moment(item.periodStart).year() === currentYear - 1);
      case "three":
        return data.filter(item => moment(item.periodStart).year() === currentYear - 3);
      case "five":
        return data.filter(item => moment(item.periodStart).year() === currentYear - 5);
      case "all":
        return data;
      default:
        return data;
    }
  };

  const filteredPayrollData = filterDataByYear(payrollTrasactionList);

  // PAYROLL CHARTS
  const aggregatedData = filteredPayrollData.reduce(
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
        data: filteredPayrollData.map((entry) => entry.grossAmount),
        borderColor: "#4caf50",
        backgroundColor: "#4caf50",
        tension: 0.3,
      },
      {
        label: "Total Tax",
        data: filteredPayrollData.map((entry) => entry.taxAmount),
        borderColor: "#ff9800",
        backgroundColor: "#ff9800",
        tension: 0.3,
      },
      {
        label: "Total Net",
        data: filteredPayrollData.map((entry) => entry.netAmount),
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

  // Filter leave requests based on the selected year
  const filteredLeaveRequests = filterDataByYear(leaveRequestList);

  // LEAVE CHARTS
  const leaveVolumeByMonth = filteredLeaveRequests.reduce((acc, req) => {
    const month = moment(req.startDate).format("YYYY-MM");
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedLeaveMonths = Object.keys(leaveVolumeByMonth).sort();
  const leaveVolumeData = {
    labels: sortedLeaveMonths.map((m) => moment(m).format("MMM YYYY")),
    datasets: [
      {
        label: "Leave Requests",
        data: sortedLeaveMonths.map((m) => leaveVolumeByMonth[m]),
        borderColor: "#673ab7",
        backgroundColor: "#9575cd",
        tension: 0.3,
      },
    ],
  };

  const upcomingLeaves = filteredLeaveRequests.filter(req =>
    moment(req.startDate).isBetween(moment(), moment().add(60, 'days'), undefined, '[]')
  );

  const upcomingLeaveCounts = upcomingLeaves.reduce((acc, req) => {
    const day = moment(req.startDate).format("MMM D");
    acc[day] = (acc[day] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const upcomingLeaveChartData = {
    labels: Object.keys(upcomingLeaveCounts),
    datasets: [
      {
        label: "Upcoming Leaves",
        data: Object.values(upcomingLeaveCounts),
        backgroundColor: "#ff7043",
      },
    ],
  };

  const getYearLabel = () => {
    const currentYear = moment().year();
    switch(yearFilter) {
      case "current":
        return `Current Year (${currentYear})`;
      case "last":
        return `Last Year (${currentYear - 1})`;
      case "three":
        return `3 Years Ago (${currentYear - 3})`;
      case "five":
        return `5 Years Ago (${currentYear - 5})`;
      case "all":
        return "All Years";
      default:
        return "All Years";
    }
  };

  return (
    <div style={{ width: "100%", marginTop: -20, height: '90vh' }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 15 }}>
        <h2 className={globals.heading}>
          HR Dashboard
        </h2>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FilterOutlined style={{ marginRight: 8 }} />
          <span style={{ marginRight: 8 }}>Filter by: </span>
          <Radio.Group 
            value={yearFilter} 
            onChange={(e) => setYearFilter(e.target.value)}
            optionType="button"
            buttonStyle="solid"
            size="middle"
          >
            <Radio.Button value="current">Current Year</Radio.Button>
            <Radio.Button value="last">Last Year</Radio.Button>
            <Radio.Button value="three">3 Years Ago</Radio.Button>
            <Radio.Button value="five">5 Years Ago</Radio.Button>
            <Radio.Button value="all">All Years</Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className={styles.filterInfo} style={{ marginBottom: 15, padding: "8px 16px", background: "#f0f5ff", borderRadius: 4, display: "flex", alignItems: "center" }}>
        <InfoCircleOutlined style={{ marginRight: 8, color: "#1890ff" }} />
        <span>Currently showing data for: <strong>{getYearLabel()}</strong></span>
      </div>

      <div className={styles.container}>
        <div className={styles.chartContainer} onClick={() => openChartModal(`Total Payroll Over Time - ${getYearLabel()}`, <Line data={payrollOverTimeData} />)}>
          <h3 className={globals.subheading}>Total Payroll Over Time</h3>
          <Line data={payrollOverTimeData} />
        </div>

        <div className={styles.chartContainer} onClick={() => openChartModal(`Gross vs Net Comparison - ${getYearLabel()}`, <Bar data={grossNetComparisonData} />)}>
          <h3 className={globals.subheading}>Gross vs Net Comparison</h3>
          <Bar data={grossNetComparisonData} />
        </div>

        <div className={styles.chartContainer} onClick={() => openChartModal(`Payroll Distribution - ${getYearLabel()}`, <Pie data={payrollDistributionData} />)}>
          <h3 className={globals.subheading}>Payroll Distribution</h3>
          <Pie data={payrollDistributionData} style={{ width: "80%", height: "90%" }} />
        </div>

        <div className={styles.chartContainer} onClick={() => openChartModal(`Monthly Leave Volume - ${getYearLabel()}`, <Line data={leaveVolumeData} />)}>
          <h3 className={globals.subheading}>Monthly Leave Volume</h3>
          <Line data={leaveVolumeData} />
        </div>

        <div className={styles.chartContainer} onClick={() => openChartModal(`Upcoming Leaves - ${getYearLabel()}`, <Bar data={upcomingLeaveChartData} />)}>
          <h3 className={globals.subheading}>
            <CalendarOutlined style={{ marginRight: 8 }} />
            Upcoming Leaves (Next 60 Days)
          </h3>
          <Bar data={upcomingLeaveChartData} />
        </div>
      </div>

      <Modal
        title={modalChart?.title}
        open={isModalVisible}
        onCancel={closeChartModal}
        footer={null}
        width={800}
      >
        <div style={{ height: 400 }}>{modalChart?.element}</div>
      </Modal>
    </div>
  );
};

export default HrCharts;