"use client";
import React from "react";
import { Button, Flex, Typography, Image } from "antd";
import { useRouter } from "next/navigation";

const { Title, Text } = Typography;

export default function Home() {
  const router = useRouter();

  return (
    <div
      style={{
        height: "100vh",
        backgroundImage: 'url("/images/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
      }}
    >
      <div style={{ backgroundColor: "rgba(0, 0, 0, 0.6)", padding: "40px", borderRadius: "10px" }}>
       
        <Image
          src="/images/logoBG.png"
          alt="Gym Logo"
          preview={false}
          style={{ marginBottom: "20px" }}
        />

    
        <Title level={2} style={{ color: "white" }}>
        Empower Your Workforce, Streamline HR
        </Title>
        <Text style={{ fontSize: "18px", color: "#ddd" }}>
        Join the leading HR Information System to optimize your human resource management and drive organizational success.
        </Text>


        <Flex justify="center" style={{ marginTop: "20px" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/auth/signup")}
            style={{ marginRight: "10px" }}
          >
            Sign Up
          </Button>
          <Button
            size="large"
            onClick={() => router.push("/auth/login")}
            style={{ backgroundColor: "#fff", color: "#000" }}
          >
            Sign In
          </Button>
        </Flex>
      </div>
    </div>
  );
}