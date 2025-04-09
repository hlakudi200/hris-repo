"use client";
import { Button, Flex, Form, Input, Spin } from "antd";
import { MailFilled } from "@ant-design/icons";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuthState, useAuthActions } from "@/providers/auth";
import { ILoginData } from "@/providers/auth/context";
import { toast } from "@/providers/toast/toast";

const SignIn: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuthActions();
  const { isPending, isError } = useAuthState();
  const router = useRouter();

  useEffect(() => {});
  const handleSingIn = async () => {
    try {
      const loginData: ILoginData = { email: email, password: password };

      loginUser(loginData);

      toast("Authorized", "success");
      router.push("/employee");

      if (isError) {
        toast("Erorr,please check your credentials", "error");
      }
    } catch (error) {
      toast("error", error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <Flex justify="space-between" className={styles.outerContainer}>
      <div
        style={{ width: "50%", height: "100vh" }}
        className={styles.leftContainer}
      >
        <Image
          src="/images/auth-image2.jpg"
          alt="loginImage"
          sizes="100vw"
          width={100}
          height={100}
          style={{ objectFit: "fill", width: "100%", height: "100%" }}
          
        />
      </div>

      <div className={styles.rightContainer} id="rightContainer">
        <div>
          <Image
            src="/images/logo.png"
            alt="HRMS logo"
            width={677}
            height={300}
            style={{ objectFit: "contain" }}
            className={styles.logo}
          />
        </div>
        <h1 style={{ fontSize: 50, marginBottom: 20 }}>
          Login.
        </h1>
        {isPending && (
          <Flex justify="center" style={{ marginBottom: 20 }}>
            <Spin size="large" />
          </Flex>
        )}
        <Form className={styles.loginForm}>
          <Form.Item name="email" rules={[{ required: true }]}>
            <Input
              placeholder="Email"
              suffix={<MailFilled />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>
          <Form.Item rules={[{ required: true }]}>
            <Input.Password
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="center">
              <Button type="primary" onClick={handleSingIn}>
                Sign In
              </Button>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Flex justify="center">
              <p style={{ fontSize: 12 }}>
                Don&apos;t have an account?{""}
                <Link href={"/auth/signup"}> Register an account.</Link>
              </p>
            </Flex>
          </Form.Item>
        </Form>
      </div>
    </Flex>
  );
};

export default SignIn;
