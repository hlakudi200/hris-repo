"use client";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { Button, Upload } from "antd";
import { toast } from "@/providers/toast/toast";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface FileUploadProps {
  onUploadSuccess: (filePath: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const props: UploadProps = {
    name: "file",
    action: `${baseUrl}/DocumentUpload`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status === "done") {
        toast(`${info.file.name} uploaded successfully`, "success");
        const filePath = info.file.response?.result.filePath; 
        if (filePath) onUploadSuccess(filePath);
      } else if (info.file.status === "error") {
        toast(`${info.file.name} upload failed.`, "error");
      }
    },
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default FileUpload;
