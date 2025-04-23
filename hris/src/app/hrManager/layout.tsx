"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileFilled,
  FileSearchOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  ProjectOutlined,
  UploadOutlined,
  UsergroupAddOutlined,
  FileTextOutlined,
  LogoutOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { LeaveRequestProvider } from "@/providers/leaveRequest";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { PayrollTransactionProvider } from "@/providers/payrolltransaction";
import { EmployeeProvider } from "@/providers/employee";
import styels from "./styles/global.module.css";
import { EmailProvider } from "@/providers/email";
import { useAuthActions, useAuthState } from "@/providers/auth";
import withAuth from "../hoc/withAuth";

const { Header, Sider, Content } = Layout;

const HrManager = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();
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

  const siderItems: ItemType<MenuItemType>[] = [
    {
      key: "/hrManager",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/hrManager/employees",
      icon: <UsergroupAddOutlined />,
      label: "Employees",
    },
    {
      key: "/hrManager/manageleaverequests",
      icon: <CalendarOutlined />,
      label: "Leaves",
    },
    {
      key: "/hrManager/jobPost",
      icon: <UploadOutlined />,
      label: "Job Post",
    },
    {
      key: "/hrManager/payroll",
      icon: <FileFilled />,
      label: "Payroll",
    },
    {
      key: "/hrManager/interview",
      icon: <FileSearchOutlined />,
      label: "Interviews",
    },
    {
      key: "/hrManager/jobApplications",
      icon: <FileTextOutlined />,
      label: "Applications",
    },
    {
      key: "/hrManager/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
  ];

  return (
    <EmailProvider>
      <PayrollTransactionProvider>
        <EmployeeProvider>
          <LeaveRequestProvider>
            <Layout className={styels.layout}>
              <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical" />
                <Menu
                  onClick={({ key }) => router.push(key)}
                  theme="dark"
                  mode="inline"
                  defaultSelectedKeys={["/hrManager"]}
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
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
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
        </EmployeeProvider>
      </PayrollTransactionProvider>
    </EmailProvider>
  );
};

export default withAuth(HrManager);
