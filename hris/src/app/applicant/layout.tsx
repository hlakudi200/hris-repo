"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  LogoutOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { EmployeeProvider } from "@/providers/employee";
import { LeaveRequestProvider } from "@/providers/leaveRequest";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
import { useAuthActions, useAuthState } from "@/providers/auth";
import styels from "./styles/global.module.css";
import { PayrollTransactionProvider } from "@/providers/payrolltransaction";
import { EmailProvider } from "@/providers/email";
import { LeaveProvider } from "@/providers/leaves";
import {
  ApplicantProvider,
  useApplicantActions,
} from "@/providers/jobApplicant";

import withAuth from "../hoc/withAuth";

const { Header, Sider, Content } = Layout;

const siderItems: ItemType<MenuItemType>[] = [
  {
    key: "/applicant",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/applicant/applications",
    icon: <FormOutlined />,
    label: "Applications",
  },
  {
    key: "/applicant/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "/applicant/createProfile",
    icon: <UserOutlined />,
    label: "Create Profile",
  },
];

const Applicant = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();
  const { getApplicantById } = useApplicantActions();
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (currentUser !== null) {
      getApplicantById(currentUser.id);
    }
  }, [currentUser]);
  const router = useRouter();
  const userMenu = {
    items: [
      {
        key: "signOut",
        label: "Sign Out",
        icon: <LogoutOutlined />,
        onClick: () => {
          router.replace("/");
          signOut();
        },
      },
    ],
  };

  return (
    <EmailProvider>
      <PayrollTransactionProvider>
        <EmployeeProvider>
          <ApplicantProvider>
            <LeaveProvider>
              <LeaveRequestProvider>
                <Layout className={styels.layout}>
                  <Sider trigger={null} collapsible collapsed={collapsed}>
                    <div className="demo-logo-vertical" />
                    <Menu
                      onClick={({ key }) => router.push(key)}
                      theme="dark"
                      mode="inline"
                      defaultSelectedKeys={["/applicant"]}
                      items={siderItems}
                    />
                  </Sider>
                  <Layout>
                    <Header
                      style={{
                        padding: 0,
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Button
                        type="text"
                        icon={
                          collapsed ? (
                            <MenuUnfoldOutlined />
                          ) : (
                            <MenuFoldOutlined />
                          )
                        }
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                          fontSize: "16px",
                          width: 64,
                          height: 64,
                        }}
                      />
                      <div className={styels.profileMenu}>
                        <Dropdown menu={userMenu} trigger={["click"]}>
                          <Button type="text" icon={<UserOutlined />}>
                            {currentUser?.emailAddress ?? "User"}
                          </Button>
                        </Dropdown>
                      </div>
                    </Header>
                    <Content className={styels.content}>{children}</Content>
                  </Layout>
                </Layout>
              </LeaveRequestProvider>
            </LeaveProvider>
          </ApplicantProvider>
        </EmployeeProvider>
      </PayrollTransactionProvider>
    </EmailProvider>
  );
};

export default withAuth(Applicant);
