"use client";
import React from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload } from "antd";
import type { UploadProps } from "antd";
import type { RcFile } from "antd/es/upload";
import { toast } from "@/providers/toast/toast";
import { useJobApplicationActions } from "@/providers/jobApplication";

interface FileUploadProps {
  onUploadSuccess: (filePath: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onUploadSuccess }) => {
  const { uploadResume } = useJobApplicationActions();

  const props: UploadProps = {
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        
        const filePath = await uploadResume(file as RcFile);
        console.log("File uploaded, public URL:", filePath); 

        
        toast("Resume uploaded successfully", "success");
        onUploadSuccess(filePath);  

        onSuccess && onSuccess("ok"); 
      } catch (error) {
        toast("Failed to upload resume", "error");
        onError && onError(error as Error); 
      }
    },
    showUploadList: false, 
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />}>Click to Upload</Button>
    </Upload>
  );
};

export default FileUpload;
