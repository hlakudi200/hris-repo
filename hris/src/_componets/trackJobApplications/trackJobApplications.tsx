"use client";
import React, { useEffect } from "react";
import { useApplicantActions, useApplicantState } from "@/providers/jobApplicant";
import { Collapse, Card, Tag, Timeline, Empty } from "antd";
import { CalendarOutlined, MailOutlined, FileTextOutlined } from "@ant-design/icons";
import globals from "../globals.module.css"

const { Panel } = Collapse;

const TrackJobApplications = () => {
  const { applicant, JobApplications } = useApplicantState(); 
  const { getApplicantJobApplications } = useApplicantActions();

  useEffect(() => {
    if (applicant?.id) {
      getApplicantJobApplications(applicant.id);
    }
  }, [applicant?.id]);

  return (
    <div className="p-4">
      <h2 className={globals.heading} style={{marginBottom:15}}>Your Job Applications</h2>

      {JobApplications?.length > 0 ? (
        <Collapse accordion>
          {JobApplications.map((app, index) => (
            <Panel header={`Application to Job ID: ${app.id}`} key={index}>
              <Card
                type="inner"
                title={app.applicantName}
                extra={<Tag color="blue">{app.status}</Tag>}
              >
                <p><MailOutlined /> <strong>Email:</strong> {app.email}</p>
                <p><FileTextOutlined /> <strong>Resume Path:</strong> {app.resumePath}</p>
                <p><strong>Application ID:</strong> {app.id}</p>

                {app.interviews?.length > 0 && (
                  <>
                    <h4 className="mt-4 font-medium">Interviews</h4>
                    <Timeline>
                      {app.interviews.map((interview, idx) => (
                        <Timeline.Item key={idx} color="green">
                          <p><CalendarOutlined /> <strong>Date:</strong> {new Date(interview.scheduledDate).toLocaleString()}</p>
                          <p><strong>Mode:</strong> {interview.mode}</p>
                          <p><strong>Interviewer:</strong> {interview.interviewer}</p>
                          <p><strong>Feedback:</strong> {interview.feedback}</p>
                        </Timeline.Item>
                      ))}
                    </Timeline>
                  </>
                )}
              </Card>
            </Panel>
          ))}
        </Collapse>
      ) : (
        <Empty description="No job applications yet." />
      )}
    </div>
  );
};

export default TrackJobApplications;
