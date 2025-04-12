"use client";
import React, { useEffect } from "react";
import globals from "../globals.module.css";
import styles from "./styles/styles.module.css";
import { Button, Spin, Alert } from "antd";
import { useJobPostingActions, useJobPostingState } from "@/providers/jobPost";

const JobPost = () => {
    const { JobPostings, isPending, isError } = useJobPostingState();
    const { getJobPostings } = useJobPostingActions();
    
    useEffect(() => {
      getJobPostings();
    }, []);
  
    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    };
  
    if (isPending) return <Spin size="large" />;
    if (isError) return <Alert message="Error loading job postings" type="error" />;

    return (
        <div style={{display:"block",overflowY:"scroll",height:"76vh"}}>
            {JobPostings?.map((post) => (
                
                <div className={styles.OuterContainer} key={post.id} style={{ marginBottom: '2rem' }}>
                    <div className={globals.heading} style={{ alignSelf: "start", marginLeft: 20 }}>
                        {post.title}
                    </div>
                    <div className={styles.ContentWrapper}>
                        <div className={styles.InfoContainer} style={{ width: "30%" }}>
                            <div className={globals.subheading} style={{ marginBottom: 10 }}>Opening Date</div>
                            <div>{formatDate(post.openDate)}</div>
                            <div className={globals.subheading} style={{ marginBottom: 10, marginTop: 10 }}>Closing Date</div>
                            <div>{formatDate(post.closeDate)}</div>
                            <div className={globals.subheading} style={{ marginBottom: 10, marginTop: 10 }}>Location</div>
                            <div>{post.location}</div>
                        </div>
                        <div className={styles.InfoContainer} style={{ width: "80%" }}>
                            <div className={globals.subheading} style={{ marginBottom: 15 }}>Role Details</div>
                            <div>{post.description}</div>
                        </div>
                    </div>
                    <div className={styles.ButtonWrapper}>
                        <Button type="primary">Apply for role</Button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default JobPost;