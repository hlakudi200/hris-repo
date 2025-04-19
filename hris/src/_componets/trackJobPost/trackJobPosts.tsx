"use client";
import React, { useEffect, useState } from "react";
import { Statistic, Tag, Spin, Result, Empty, Button, Modal } from "antd";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useJobPostingActions, useJobPostingState } from "@/providers/jobPost";
import globals from "../globals.module.css";
import styles from "./styles/styles.module.css";
import CreateJobPost from "../createJobPost/createJobPost";
import { IJobApplication,IJobPosting } from "@/providers/jobPost/interfaces";

ChartJS.register(ArcElement, Tooltip, Legend);

const TrackJobPosts = () => {
  const { getJobPostingIncluded } = useJobPostingActions();
  const { JobPostings, isPending, isError, isSuccess } = useJobPostingState();
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    getJobPostingIncluded();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "orange";
      case "Declined":
        return "red";
      default:
        return "blue";
    }
  };

  const renderApplicationStats = (applications: IJobApplication[]) => {
    const statusMap = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(statusMap).map(([status, count]) => (
      <Tag color={getStatusColor(status)} key={status}>
        {status}: {count as number}
      </Tag>
    ));
  };

  const generatePieData = (applications: IJobApplication[]) => {
    const statusCounts: Record<string, number> = {};
    applications.forEach((app) => {
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;
    });

    const labels = Object.keys(statusCounts);
    const data = Object.values(statusCounts);
    const backgroundColors = labels.map((status) => {
      switch (status) {
        case "Approved":
          return "#52c41a";
        case "Pending":
          return "#faad14";
        case "Declined":
          return "#f5222d";
        default:
          return "#1890ff";
      }
    });

    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: backgroundColors,
          borderWidth: 1,
        },
      ],
    };
  };

  const openModal = () => setIsModalVisible(true);
  const closeModal = () => setIsModalVisible(false);

  return (
    <div className={styles.OuterContainer}>
      <div className={styles.InfoContainer}>
        <div className={styles.header}>
          <h2 className={globals.heading}>📊 Job Applications Tracker</h2>
          <Button type="primary" onClick={openModal}>
            Add Job Post
          </Button>
        </div>

        <Modal
          title="Create Job Post"
          open={isModalVisible}
          onCancel={closeModal}
          footer={null}
          destroyOnClose
        >
          <CreateJobPost
            onSuccess={() => {
              closeModal();
              getJobPostingIncluded();
            }}
          />
        </Modal>

        {isPending && (
          <div className={styles.centered}>
            <Spin size="large" />
          </div>
        )}

        {isError && (
          <Result
            status="error"
            title="Failed to load job postings"
            subTitle="Please try again later or contact support."
          />
        )}

        {isSuccess &&
          JobPostings &&
          (JobPostings.length > 0 ? (
            <div className={styles.flexGrid}>
              {JobPostings.map((job: IJobPosting) => (
                <div key={job.id} className={styles.card}>
                  <h3>{job.title}</h3>
                  <Statistic
                    title="Total Applications"
                    value={Number(job.applications?.length || 0)}
                  />
                  <div className={styles.tags}>
                    {renderApplicationStats(job.applications || [])}
                  </div>
                  {(job.applications?.length || 0) > 0 && (
                    <div className={styles.pieChart}>
                      <Pie data={generatePieData(job.applications)} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <Empty description="No job postings found" />
          ))}
      </div>
    </div>
  );
};

export default TrackJobPosts;
