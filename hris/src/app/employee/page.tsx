import React from "react";
import Profile from "@/_componets/profileComponent/profile";
//import LeaveOverview from "@/_componets/leaveOverviewComponent/leaveOverview";
//import AttandaceOverview from "@/_componets/attandaceComponent/attandanceOverview";
//import AttendanceForm from "@/_componets/attandanceFormComponent/attandanceForm";
// import LeaveForm from "@/_componets/leaveFormComponet/leaveForm";
import CreateEmployeeForm from "@/_componets/createEmployee/page";
//import JobPost from "@/_componets/JobPostComponent/jobPostComponent";
const Employee = () => {
  return (
    <div>
      <Profile />

      <div>
        <CreateEmployeeForm />
      </div>
    </div>
  );
};

export default Employee;
