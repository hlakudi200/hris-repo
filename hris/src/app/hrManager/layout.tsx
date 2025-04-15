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
  UsergroupAddOutlined
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { ItemType, MenuItemType } from "antd/es/menu/interface";

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
      key: "/hrManager/employees",
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
      key: "/hrManager/interviews",
      icon: <FileSearchOutlined />,
      label: "Interviews",
    },
    {
      key: "/hrManager/projects",
      icon: <ProjectOutlined />,
      label: "Projects",
    },
  ];

  return (
    <Layout style={{ height: "100vh" }}>
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
  );
};

export default HrManager;
