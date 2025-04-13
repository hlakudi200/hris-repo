"use client";
import React from "react";
import globals from "../globals.module.css";
import { Button, Flex, Spin } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";

const LeaveOverview = () => {
  const { leaves, isPending, isSuccess, currentEmployee } = useEmployeeState();
  const { getLeaves } = useEmployeeActions();

  //TODO: add use effect?
   if (leaves === undefined){
     getLeaves(currentEmployee.id);
   }

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }

  return (
    <div className={globals.OuterContainer}>
      <div className={globals.heading} style={{ paddingTop: 20 }}>
        Leave Overview
      </div>
      <div className={globals.InfoContainer}>
        <div className={globals.subheading}>Annual Leave</div>
        <div>{isSuccess ? leaves.annual.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Sick Leave</div>
        <div>{isSuccess ? leaves.sick.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Study Leave</div>
        <div>{isSuccess ? leaves.study.toString() : "Please wait"}</div>
        <div className={globals.subheading}>Family Responsibility Leave</div>
        <div>{isSuccess ? leaves.annual.toString() : "Please wait"}</div>
        <div style={{ marginTop: 20 }}>
          <Button type="primary">View more</Button>
        </div>
      </div>
    </div>
  );
};
export default LeaveOverview;
