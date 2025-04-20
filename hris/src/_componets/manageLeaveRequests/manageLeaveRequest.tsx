'use client';
import React, { useEffect } from 'react'
import { useLeaveRequestActions,useLeaveRequestState } from '@/providers/leaveRequest';
import { Spin } from 'antd';

const ManageLeaveRequest=()=> {
const {getLeaveRequests}=useLeaveRequestActions();
const{leaveRequests,isPending,isSuccess}=useLeaveRequestState()

useEffect(()=>{
 getLeaveRequests()
 },[])
 
if(isPending)
{
    <Spin size="large"></Spin>
}

if(isSuccess)
{
    console.log(leaveRequests)
}

  return (
    <div>M</div>
  )
}

export default ManageLeaveRequest