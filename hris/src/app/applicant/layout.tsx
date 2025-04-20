"use client";
import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Layout } from "antd";
import { useRouter } from "next/navigation";
import { useAuthActions, useAuthState } from "@/providers/auth";
import styles from "./styles/global.module.css"; 

const { Header, Content } = Layout;

const Applicant = ({ children }: { children: React.ReactNode }) => {
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

  return (
    <Layout className={styles.layout}>
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
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div className={styles.profileMenu}>
            <Dropdown menu={userMenu} trigger={["click"]}>
              <Button type="text" icon={<UserOutlined />}>
                {currentUser?.emailAddress ?? "User"}
              </Button>
            </Dropdown>
          </div>
        </Header>
        <Content className={styles.content}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default Applicant;
