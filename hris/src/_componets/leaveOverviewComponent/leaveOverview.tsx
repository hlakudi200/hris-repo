"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import { Button, Flex, Spin } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";

const LeaveOverview = () => {
  const { leaves, isPending, isError, currentEmployee } = useEmployeeState();
  const { getLeaves } = useEmployeeActions();

  //TODO: add use effect?
  useEffect(() => {
    if (leaves === undefined && currentEmployee){
      getLeaves(currentEmployee.id);
    }

  }, [leaves])

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }
  if (isError) {
    return (
     <div>Failed</div>
    );
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
        <div>{leaves  ? leaves.study.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Family Responsibility Leave</div>
        <div>{leaves  ? leaves.annual.toString() : "Please wait"}</div>
        <div style={{ marginTop: 20 }}>
          <Button type="primary">View more</Button>
        </div>
      </div>
    </div>
  );
};
export default LeaveOverview;
