"use client";
import React, { useEffect, useState } from "react";
import { Button, Form, Input, DatePicker, Checkbox, message } from "antd";
import styles from "./styles/styles.module.css";
import globals from "./styles/globals.module.css";
import {
  usePayrollTransactionState,
  usePayrollTransactionActions,
} from "@/providers/payrolltransaction/index";
import { IPayrollTransaction } from "@/providers/payrolltransaction/context";
import moment from "moment";

interface PayrollFormValues {
  payrollProfileId: string;
  periodStart: moment.Moment;
  periodEnd: moment.Moment;
  grossAmount: string;
  isPaid: boolean;
}

const PayrollTransactionForm: React.FC = () => {
  const { isSuccess, isError, payrollTransaction } =
    usePayrollTransactionState();
  const { createPayrollTransaction, resetStateFlags } =
    usePayrollTransactionActions();
  const [form] = Form.useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isSuccess && isSubmitting) {
      setIsSubmitting(false);
      message.success("Payroll transaction created successfully");
    }
  }, [isSuccess, isSubmitting]);

  useEffect(() => {
    if (isError && isSubmitting) {
      setIsSubmitting(false);
      message.error("Failed to create payroll transaction");
    }
  }, [isError, isSubmitting]);

  const handleSubmit = async (values: PayrollFormValues) => {
    setIsSubmitting(true);

    const payload: IPayrollTransaction = {
      payrollProfileId: values.payrollProfileId,
      periodStart: values.periodStart.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      periodEnd: values.periodEnd.format("YYYY-MM-DDTHH:mm:ss.SSS[Z]"),
      grossAmount: parseFloat(values.grossAmount),
      isPaid: values.isPaid || false,
      taxAmount: 0,
      netAmount: 0,
    };

    try {
      await createPayrollTransaction(payload);
    } catch {
      setIsSubmitting(false);
      message.error("Failed to create payroll transaction");
    }
  };

  const handleCreateNew = () => {
    resetStateFlags();
  };

  return (
    <div className={globals.OuterContainer}>
      <div className={globals.heading}>Payroll Transaction</div>

      <div className={styles.formResultContainer}>
        {/* Form Section */}
        <div className={styles.formSection}>
          <div className={globals.InfoContainer}>
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              initialValues={{
                isPaid: false,
              }}
            >
              <Form.Item
                label="Payroll Profile ID"
                name="payrollProfileId"
                rules={[
                  {
                    required: true,
                    message: "Please enter the payroll profile ID",
                  },
                ]}
              >
                <Input placeholder="Enter payroll profile ID" />
              </Form.Item>

              <div className={styles.dateContainer}>
                <Form.Item
                  label="Period Start"
                  name="periodStart"
                  rules={[
                    {
                      required: true,
                      message: "Please select the period start date",
                    },
                  ]}
                  className={styles.dateField}
                >
                  <DatePicker className={styles.fullWidth} />
                </Form.Item>

                <Form.Item
                  label="Period End"
                  name="periodEnd"
                  rules={[
                    {
                      required: true,
                      message: "Please select the period end date",
                    },
                  ]}
                  className={styles.dateField}
                >
                  <DatePicker className={styles.fullWidth} />
                </Form.Item>
              </div>

              <Form.Item
                label="Gross Amount"
                name="grossAmount"
                rules={[
                  { required: true, message: "Please enter the gross amount" },
                  {
                    pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                    message:
                      "Please enter a valid amount (up to 2 decimal places)",
                  },
                ]}
              >
                <Input
                  prefix="$"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                />
              </Form.Item>

              <Form.Item name="isPaid" valuePropName="checked">
                <Checkbox>Mark as Paid</Checkbox>
              </Form.Item>

              <Form.Item>
                <div className={styles.buttonContainer}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={isSubmitting}
                  >
                    Create Transaction
                  </Button>
                  {isSuccess && (
                    <Button onClick={handleCreateNew} style={{ marginLeft: 8 }}>
                      Create New
                    </Button>
                  )}
                </div>
              </Form.Item>
            </Form>
          </div>
        </div>

        {isSuccess && payrollTransaction && (
          <div className={styles.resultsSection}>
            <div className={styles.resultsCard}>
              <div className={styles.resultHeader}>Transaction Results</div>
              <div className={globals.InfoContainer}>
                <div className={globals.subheading}>Payroll Profile ID</div>
                <div>{payrollTransaction.payrollProfileId}</div>

                <div className={globals.subheading}>Period</div>
                <div>
                  {moment(payrollTransaction.periodStart).format(
                    "MMM DD, YYYY"
                  )}{" "}
                  -{" "}
                  {moment(payrollTransaction.periodEnd).format("MMM DD, YYYY")}
                </div>

                <div className={globals.subheading}>Gross Amount</div>
                <div>${payrollTransaction.grossAmount.toFixed(2)}</div>

                <div className={globals.subheading}>Tax Amount</div>
                <div>${payrollTransaction.taxAmount?.toFixed(2)}</div>

                <div className={globals.subheading}>Net Amount</div>
                <div>${payrollTransaction.netAmount?.toFixed(2)}</div>

                <div className={globals.subheading}>Status</div>
                <div>{payrollTransaction.isPaid ? "Paid" : "Unpaid"}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayrollTransactionForm;
