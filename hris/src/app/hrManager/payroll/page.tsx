import ManagerPayroll from "@/_componets/managerPayroll/managerPayroll";
import { PayrollProvider } from "@/providers/payrollProfile";

const PayrollPage: React.FC = () => {
  return (
    <PayrollProvider>
      <ManagerPayroll />
    </PayrollProvider>
  );
};

export default PayrollPage;
