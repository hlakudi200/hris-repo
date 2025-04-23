"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Upload,
  Button,
  Input,
  Row,
  Col,
  FormInstance,
  Typography,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useJobApplicationActions } from "@/providers/jobApplication";
import { toast } from "@/providers/toast/toast";
import type { RcFile } from "antd/es/upload";
import type { UploadRequestOption } from "rc-upload/lib/interface";
import { IJobApplicant } from "@/providers/jobApplicant/context";

interface DocumentsFormProps {
  form: FormInstance;
  formData: Partial<IJobApplicant>;
  resumeUrl: string | null;
  setResumeUrl: (url: string) => void;
  setCoverletter: (letter: string) => void;
}
const DocumentsForm: React.FC<DocumentsFormProps> = ({
  form,
  formData,
  resumeUrl,
  setResumeUrl,
  setCoverletter,
}) => {
  const { uploadResume } = useJobApplicationActions();
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  useEffect(() => {
    if (formData?.resumeUrl) {
      setResumeUrl(formData.resumeUrl);
      const nameFromUrl = formData.resumeUrl.split("/").pop();
      if (nameFromUrl) setFileName(nameFromUrl);
    }

    if (formData?.coverletter) {
      form.setFieldsValue({ coverletter: formData.coverletter });
    }
  }, [formData, form, setResumeUrl]);

  const handleCustomUpload = async (options: UploadRequestOption) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploading(true);
      const uploadedFile = file as RcFile;
      const filePath = await uploadResume(uploadedFile);
      if (filePath && typeof filePath === "string") {
        setResumeUrl(filePath);
        setFileName(uploadedFile.name);
        toast("Resume uploaded successfully", "success");
        onSuccess?.("ok");
      } else {
        throw new Error("Invalid file path returned");
      }
    } catch (err) {
      toast("Failed to upload resume", "error");
      onError?.(err as Error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label="Resume/CV" required>
            <Upload customRequest={handleCustomUpload} showUploadList={false}>
              <Button icon={<UploadOutlined />} loading={uploading}>
                {uploading ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>

            {fileName && (
              <>
                <Typography.Text
                  type="secondary"
                  style={{ display: "block", marginTop: 8 }}
                >
                  Uploaded: {fileName}
                </Typography.Text>
                {resumeUrl && (
                  <Typography.Link
                    href={resumeUrl}
                    target="_blank"
                    style={{ display: "block", marginTop: 4 }}
                  >
                    View Uploaded Resume
                  </Typography.Link>
                )}
              </>
            )}
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="coverletter"
            label="Cover Letter"
            rules={[
              { required: true, message: "Please provide a cover letter" },
            ]}
          >
            <Input.TextArea
              rows={8}
              maxLength={2000}
              showCount
              placeholder="Enter your cover letter"
              onChange={(e) => setCoverletter(e.target.value)}
            />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};
export default DocumentsForm;
