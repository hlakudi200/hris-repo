import React from 'react'
import ManageLeaveRequest from '@/_componets/manageLeaveRequests/manageLeaveRequest';
import globals from "../styles/global.module.css";

const ManageleaveRequests=()=> {
  return (
    <div className={globals.container}><ManageLeaveRequest/></div>
  )
}

export default ManageleaveRequests;