"use client";
import React, { useState } from "react";
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
  const [uploading, setUploading] = useState(false);

  const props: UploadProps = {
    customRequest: async ({ file, onSuccess, onError }) => {
      try {
        setUploading(true);

        const filePath = await uploadResume(file as RcFile);
     

        toast("Resume uploaded successfully", "success");
        onUploadSuccess(filePath);

        if (onSuccess) {
          onSuccess("ok");
        }
      } catch (error) {
        toast("Failed to upload resume", "error");

        if (onError) {
          onError(error as Error);
        }
      } finally {
        setUploading(false);
      }
    },
    showUploadList: false,
  };

  return (
    <Upload {...props}>
      <Button icon={<UploadOutlined />} loading={uploading}>
        {uploading ? "Uploading..." : "Click to Upload"}
      </Button>
    </Upload>
  );
};

export default FileUpload;
