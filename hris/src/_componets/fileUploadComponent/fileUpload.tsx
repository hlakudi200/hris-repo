"use client";
import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { Button, Upload } from 'antd';
import { toast } from '@/providers/toast/toast';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
const props: UploadProps = {
  name: 'file',
  action: `${baseUrl}/DocumentUpload`,
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
        toast(`${info.file.name} file uploaded successfully`,"success");
    } else if (info.file.status === 'error') {
        toast(`${info.file.name} file upload failed.`, "error");
    }
  },
};

const FileUpload: React.FC = () => (
  <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
);

export default FileUpload;