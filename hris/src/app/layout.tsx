"use client";
import "./globals.css";
import { ConfigProvider, theme } from "antd";
import React from "react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  
  return (
    <html lang="en">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#fb9b01",
            colorInfo: "#fb9b01",
            sizeStep: 6,
            borderRadius: 5,
            wireframe: false,
            fontSize: 17,
          },
          components: {
            Button: {
              contentFontSize: 18,
              contentFontSizeLG: 17,
              contentFontSizeSM: 0,
              contentLineHeightLG: 7.5,
              paddingBlock: 4,
              controlHeight: 49,
            },
            Input: {
              controlHeight: 48,
              lineWidth: 2,
              borderRadius: 15,
              activeBg: "rgb(33,32,32)",
            },
            Layout: {
              headerHeight: 55,
              headerBg: "rgb(34,36,38)",
            },
            Spin: {
              dotSize: 57,
              fontSize: 25,
              motionDurationMid: "0.1s",
            },
            Carousel: {
              dotHeight: 12,
            },
            Select: {
              controlHeight: 49,
              borderRadius: 15,
            },
            InputNumber: {
              controlHeight: 48,
              borderRadius: 15,
              lineWidth: 2,
            },
          },
        }}
      >
        <body>{children}</body>
      </ConfigProvider>
    </html>
  );
}
