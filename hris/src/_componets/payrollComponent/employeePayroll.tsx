"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import { Flex, Spin } from "antd";
import { useEmployeeActions, useEmployeeState } from "@/providers/employee";

const EmployeePayroll = () => {
  const { payrollProfile, isPending, isError, currentEmployee } =
    useEmployeeState();
  const { getPayrollProfile } = useEmployeeActions();

  //TODO: add use effect?
  useEffect(() => {
    if (payrollProfile === undefined && currentEmployee) {
      getPayrollProfile(currentEmployee.id);
    }
  }, [payrollProfile]);

  if (isPending) {
    return (
      <Flex justify="center" style={{ marginBottom: 20 }}>
        <Spin size="large" />
      </Flex>
    );
  }
  if (isError) {
    return <div>Failed</div>;
  }
  return (
    <div className={globals.OuterContainer}>
      <div className={globals.heading} style={{ paddingTop: 20 }}>
        Payroll Profile
      </div>
      <div className={globals.InfoContainer}>
        <div className={globals.subheading}>Basic Salary</div>
        <div>
          {payrollProfile
            ? payrollProfile.basicSalary.toString()
            : "Please wait"}
        </div>
        <div className={globals.subheading}>Tax Rate</div>
        <div>
          {payrollProfile ? payrollProfile.taxRate.toString() : "Please wait"}
        </div>
      </div>
    </div>
  );
};
export default EmployeePayroll;
