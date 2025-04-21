"use client";
import { Button, Flex, Form, Input } from "antd";
import { MailFilled, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { useAuthActions, useAuthState } from "@/providers/auth";
import { useRouter } from "next/navigation";
import { toast } from "@/providers/toast/toast";
import { IUser } from "@/providers/auth/context";

export interface IApplicantSignUp {
  id?: string;
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  confirmPassword: string;
}

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { signUp, resetStateFlags } = useAuthActions();
  const { isSuccess, isError } = useAuthState();
  const router = useRouter();

  if (isSuccess) {
    toast("Signup successful!", "success");
    resetStateFlags();
    router.push("/auth/login");
  }

  if (isError) {
    toast("Signup failed. Please try again.", "error");
  }

  const handleSignUp = async (values: IApplicantSignUp) => {
    setLoading(true);
    try {
      if (
        !values.username ||
        !values.name ||
        !values.surname ||
        !values.emailAddress ||
        !values.password ||
        !values.confirmPassword
      ) {
        toast("Please fill all required fields", "error");
        setLoading(false);
        return;
      }

      if (values.password !== values.confirmPassword) {
        toast("Password and Confirm Password do not match", "error");
        setLoading(false);
        return;
      }

      const userPayload: IUser = {
        userName: values.username,
        name: values.name,
        surname: values.surname,
        emailAddress: values.emailAddress,
        password: values.password,
        roles: [],
      };

      await signUp(userPayload);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <Flex justify="space-between" className={styles.outerContainer}>
      <div
        style={{ width: "50%", height: "100vh" }}
        className={styles.leftContainer}
      >
        <Image
          src="/images/SingUp.jpg"
          alt="loginImage"
          sizes="100vw"
          width={100}
          height={70}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </div>

      <div className={styles.rightContainer}>
       
        <h1 style={{ fontSize: 40, marginBottom: 20 } } className={styles.heading}>Sign Up.</h1>

        <Form form={form} className={styles.signUpForm} onFinish={handleSignUp}>
          <div>
            <Form.Item
              name="username"
              rules={[{ required: true, message: "Username is required!" }]}
            >
              <Input placeholder="Username" suffix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="name"
              rules={[{ required: true, message: "Name is required!" }]}
            >
              <Input placeholder="Name" suffix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="surname"
              rules={[{ required: true, message: "Surname is required!" }]}
            >
              <Input placeholder="Surname" suffix={<UserOutlined />} />
            </Form.Item>
            <Form.Item
              name="emailAddress"
              rules={[
                {
                  required: true,
                  type: "email",
                  message: "Valid email required!",
                },
              ]}
            >
              <Input placeholder="Email" suffix={<MailFilled />} />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required!" }]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Confirm password is required!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Flex justify="center">
              <Button type="primary" htmlType="submit" loading={loading}>
                Sign Up
              </Button>
            </Flex>
            <Form.Item>
              <Flex justify="center">
                <p style={{ fontSize: 12 }}>
                  Already have an account?{""}
                  <Link href={"/auth/login"}> Login.</Link>
                </p>
              </Flex>
            </Form.Item>
          </div>
        </Form>
      </div>
    </Flex>
  );
};

export default SignUp;
