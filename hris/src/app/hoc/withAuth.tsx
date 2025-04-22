"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getRole } from "@/utils/jwtDecoder";
interface LayoutProps {
  children?: React.ReactNode; // Children are optional to prevent errors
}

const withAuth = (WrappedLayout: React.ComponentType<LayoutProps>) => {
  const WithAuthWrapper: React.FC<LayoutProps> = ({ children, ...props }) => {
    const router = useRouter();

    useEffect(() => {
      const token = sessionStorage.getItem("accessToken");

      if (!token) {
        router.push("/");
        return;
      }

      try {
        const role = getRole(token);

        // Redirect based on role
        if (role === "employee") {
          router.push("/employee");
        } else if (role === "hrmanager") {
          router.push("/hrManager");
        } else if (role === "applicant") {
          router.push("/applicant");
        } else {
          router.push("/");
        }
      } catch (error) {
        console.error("Error decoding token:", error);
        router.push("/"); //if decoding fails
      }
    }, [router]);
    return <WrappedLayout {...props}>{children}</WrappedLayout>;
  };

  return WithAuthWrapper;
};

export default withAuth;
