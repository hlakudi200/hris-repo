"use client";
import React from "react";
import globals from "../globals.module.css";
import styles from "./styles/styles.module.css";
import { Button } from "antd";

const JobPost = () => {
  return (
    <div className={styles.OuterContainer}>
      <div
        className={globals.heading}
        style={{ alignSelf: "start", marginLeft: 20 }}
      >
        Senior software engineer
      </div>
      <div className={styles.ContentWrapper}>
        <div className={styles.InfoContainer} style={{ width: "30%" }}>
          <div className={globals.subheading} style={{marginBottom:10}} >Opening Date</div>
          <div>2025 March 14</div>
          <div className={globals.subheading} style={{marginBottom:10,marginTop:10}}>Closing Date</div>
          <div>2025 March 14</div>
          <div className={globals.subheading} style={{marginBottom:10,marginTop:10}}>Internal Post</div>
        </div>
        <div className={styles.InfoContainer} style={{ width: "80%" }}>
          <div className={globals.subheading} style={{marginBottom:15}}>Role Details</div>
          <div>
            We are looking for a highly skilled and experienced Senior Software
            Developer to join our dynamic team. In this role, you will lead the
            design, development, and deployment of scalable software solutions.
            You’ll collaborate with cross-functional teams, mentor junior
            developers, and play a key role in driving architectural decisions
            and best coding practices.
          </div>
        </div>
      </div>

      <div className={styles.ButtonWrapper}>
        <Button type="primary">Apply for role</Button>
      </div>
    </div>
  );
};

export default JobPost;
