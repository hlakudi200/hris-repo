"use client";
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  FileFilled,
  HomeOutlined,
  FileSearchOutlined,
  ClockCircleFilled,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { EmployeeProvider, useEmployeeActions } from "@/providers/employee";
import { LeaveRequestProvider } from "@/providers/leaveRequest";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { useRouter } from "next/navigation";
import { useAuthState } from "@/providers/auth";

const { Header, Sider, Content } = Layout;

const siderItems: ItemType<MenuItemType>[] = [
  {
    key: "/employee/profile",
    icon: <HomeOutlined />,
    label: "Home",
  },
  {
    key: "/employee/logHours",
    icon: <ClockCircleFilled />,
    label: "Log hours",
  },
  {
    key: "/employee/leave",
    icon: <UploadOutlined />,
    label: "Leave",
  },
  {
    key: "/employee/payroll",
    icon: <FileFilled />,
    label: "Payroll",
  },
  {
    key: "/employee/jobPost",
    icon: <FileSearchOutlined />,
    label: "Job post",
  },
];

const Employee = ({ children }: { children: React.ReactNode }) => {
  const { currentUser } = useAuthState();
  const { getEmployee } = useEmployeeActions();

  useEffect(() => {
    if (currentUser !== null) {
      getEmployee(currentUser.id);
    }
  }, []);
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  return (
    <EmployeeProvider>
      <LeaveRequestProvider>
        <Layout style={{ height: "100vh" }}>
          <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className="demo-logo-vertical" />
            <Menu
              onClick={({ key }) => router.push(key)}
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["profile"]}
              items={siderItems}
            />
          </Sider>
          <Layout>
            <Header style={{ padding: 0, backgroundColor: "white" }}>
              <Button
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                onClick={() => setCollapsed(!collapsed)}
                style={{
                  fontSize: "16px",
                  width: 64,
                  height: 64,
                }}
              />
            </Header>
            <Content
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              {children}
            </Content>
          </Layout>
        </Layout>
      </LeaveRequestProvider>
    </EmployeeProvider>
  );
};

export default Employee;
