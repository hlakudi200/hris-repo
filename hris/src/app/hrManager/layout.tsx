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
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { LeaveRequestProvider } from "@/providers/leaveRequest";
import { ItemType, MenuItemType } from "antd/es/menu/interface";
import { PayrollTransactionProvider } from "@/providers/payrolltransaction";
import { EmployeeProvider } from "@/providers/employee";
import styels from "./styles/global.module.css";

const { Header, Sider, Content } = Layout;

const HrManager = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const siderItems: ItemType<MenuItemType>[] = [
    {
      key: "/hrManager",
      icon: <HomeOutlined />,
      label: "Home",
    },
    {
      key: "/hrManager/employee",
      icon: <UsergroupAddOutlined />,
      label: "Employees",
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
      label: "Job Applications",
    },
    {
      key: "/hrManager/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
  ];

  return (
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
                defaultSelectedKeys={["profile"]}
                items={siderItems}
              />
            </Sider>
            <Layout>
              <Header style={{ padding: 0, backgroundColor: "white" }}>
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
              </Header>
              <Content className={styels.content}>{children}</Content>
            </Layout>
          </Layout>
        </LeaveRequestProvider>
      </EmployeeProvider>
    </PayrollTransactionProvider>
  );
};

export default HrManager;
