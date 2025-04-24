"use client";
import ApplicantJobView from "@/_componets/applicantJobView/applicantJobView";
import React, { useEffect } from "react";
import { useAuthState } from "@/providers/auth";
import {
  useApplicantActions,
  useApplicantState,
} from "@/providers/jobApplicant";
import { useRouter } from "next/navigation";
import { Spin } from "antd";

const Applicant = () => {
  const { currentUser } = useAuthState();
  const { applicant, isError, isPending, isSuccess } = useApplicantState();
  const { getApplicantById } = useApplicantActions();
  const router = useRouter();

  useEffect(() => {
    if (currentUser !== null) {
      getApplicantById(currentUser.id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (isError || (!applicant?.id && isSuccess)) {
      router.push("/applicant/createProfile");
    }
  }, [isError, isSuccess, applicant, router]);

  if (isPending) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Spin size="large" tip="Loading applicant..." />
      </div>
    );
  }

  return (
    <div>
      {applicant?.id && <ApplicantJobView />}
    </div>
  );
};

export default Applicant;
