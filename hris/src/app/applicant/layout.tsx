"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  FileSearchOutlined,
  LogoutOutlined,
  UserOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout, Menu } from "antd";
import { EmployeeProvider, useEmployeeActions } from "@/providers/employee";
import { LeaveRequestProvider } from "@/providers/leaveRequest";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
import { useAuthActions, useAuthState } from "@/providers/auth";
import styels from "./styles/global.module.css";
import { PayrollTransactionProvider } from "@/providers/payrolltransaction";
import { EmailProvider } from "@/providers/email";
import { LeaveProvider } from "@/providers/leaves";
import { ApplicantProvider } from "@/providers/jobApplicant";
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
    label: "Applicantions",
  },
  {
    key: "/applicant/interviews",
    icon: <FileSearchOutlined/>,
    label: "Interviews",
  },
  {
    key: "/applicant/profile",
    icon: <UserOutlined/>,
    label: "Profile",
  },
  
];

const Applicant = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthState();
  const { signOut } = useAuthActions();
  const { getEmployee } = useEmployeeActions();

  useEffect(() => {
    if (currentUser !== null) {
      getEmployee(currentUser.id);
    }
  }, []);
  const [collapsed, setCollapsed] = useState(false);
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
                    defaultSelectedKeys={["/employee"]}
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

export default Applicant;
