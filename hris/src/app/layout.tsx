import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/providers/auth";
import { ConfigProvider } from "antd";
import ToastProvider from "@/providers/toast/toast";
import { EmployeeProvider } from "@/providers/employee";
import { AttandanceProvider } from "@/providers/attandance";
import { JobPostingProvider } from "@/providers/jobPost";

import { JobApplicationProvider } from "@/providers/jobApplication";
import { InterviewProvider } from "@/providers/Interview";
import { PayrollProvider } from "@/providers/payrollProfile";
import { EmailProvider } from "@/providers/email";
import { ApplicantProvider } from "@/providers/jobApplicant";
export const metadata: Metadata = {
  title: "Ubuntu HR",
  description: "Ubuntu HR Information System",
  icons: {icon: '/favicon.ico'}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fb9b01",
            colorInfo: "#fb9b01",
            sizeStep: 6,
            borderRadius: 5,
            wireframe: false,
            fontSize: 17,
          },
          components: {
            Button: {
              contentFontSize: 18,
              contentFontSizeLG: 17,
              contentFontSizeSM: 0,
              contentLineHeightLG: 7.5,
              paddingBlock: 4,
              controlHeight: 49,
            },
            Input: {
              controlHeight: 45,
              lineWidth: 1.7,
              borderRadius: 15,
              activeBg: "rgb(255, 255, 255)",
            },
            Layout: {
              headerHeight: 55,
              headerBg: "rgb(34,36,38)",
            },
            Spin: {
              dotSize: 57,
              fontSize: 25,
              motionDurationMid: "0.1s",
            },
            Carousel: {
              dotHeight: 12,
            },
            Select: {
              controlHeight: 49,
              borderRadius: 15,
            },
            InputNumber: {
              controlHeight: 48,
              borderRadius: 15,
              lineWidth: 2,
            },
          },
        }}
      >
        <EmailProvider>
          <InterviewProvider>
            <AuthProvider>
              <ToastProvider />
              <JobPostingProvider>
                <EmployeeProvider>
                  <ApplicantProvider>
                  <AttandanceProvider>
                    <JobApplicationProvider>
                      <PayrollProvider>
                        <body>{children}</body>
                      </PayrollProvider>
                    </JobApplicationProvider>
                  </AttandanceProvider>
                  </ApplicantProvider>
                </EmployeeProvider>
              </JobPostingProvider>
            </AuthProvider>
          </InterviewProvider>
        </EmailProvider>
      </ConfigProvider>
    </html>
  );
}
