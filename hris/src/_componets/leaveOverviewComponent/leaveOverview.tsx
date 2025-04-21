"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import { Flex, Spin } from "antd";
import {useEmployeeState } from "@/providers/employee";
import { useLeaveActions, useLeaveState } from "@/providers/leaves";

const LeaveOverview = () => {
  const {currentEmployee } = useEmployeeState();
  const { leaves, isPending, isError } = useLeaveState();
  const { getLeaves } = useLeaveActions();

  //TODO: add use effect?
  useEffect(() => {
    if (leaves === undefined && currentEmployee) {
      getLeaves(currentEmployee.id);
    }
  }, [leaves]);

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }
  if (isError) {
    return <div>Failed to retrieve leave information</div>;
  }

  return (
    <div className={globals.OuterContainer}>
      <div className={globals.heading} style={{ paddingTop: 20 }}>
        Leave Overview
      </div>
      <div className={globals.InfoContainer}>
        <div className={globals.subheading}>Annual Leave</div>
        <div>{leaves ? leaves.annual.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Sick Leave</div>
        <div>{leaves ? leaves.sick.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Study Leave</div>
        <div>{leaves ? leaves.study.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Family Responsibility Leave</div>
        <div>{leaves ? leaves.annual.toString() : "Please wait"}</div>
      </div>
    </div>
  );
};
export default LeaveOverview;
