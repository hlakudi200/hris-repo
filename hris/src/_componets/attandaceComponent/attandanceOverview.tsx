import React from 'react'
import globals from "../globals.module.css";
import { Button } from "antd";
import {ClockCircleFilled} from "@ant-design/icons";


 const AttandanceOverview=()=> {
  return (
    <div className={globals.OuterContainer}>
    <div className={globals.heading} style={{paddingTop:20}}>Attendance Overview <span><ClockCircleFilled style={{color:"green"}}/></span></div>
    <div className={globals.InfoContainer}>
      <div className={globals.subheading}>Date</div>
      <div>2025 March 14</div>
      <div className={globals.subheading}>Week</div>
      <div>1</div>
      <div className={globals.subheading}>Hours Recorded</div>
      <div>20Hr</div>
      <div style={{marginTop:20}}>
          <Button type="primary">Record Attandace</Button>
      </div>
    </div>
  </div>
  )
}

export default AttandanceOverview;