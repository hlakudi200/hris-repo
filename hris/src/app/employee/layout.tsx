"use client";
import React, { useState } from "react";
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

const { Header, Sider, Content } = Layout;

const Employee = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ height: "100vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "5",
              icon: <ClockCircleFilled />,
              label: "Log hours",
            },
            {
              key: "2",
              icon: <UploadOutlined />,
              label: "Leave",
            },
            {
              key: "3",
              icon: <FileFilled />,
              label: "Payroll",
            },
            {
              key: "4",
              icon: <FileSearchOutlined />,
              label: "Job post",
            },
          ]}
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
          Content
        </Content>
      </Layout>
    </Layout>
  );
};

export default Employee;
