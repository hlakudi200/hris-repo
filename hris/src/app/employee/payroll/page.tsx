import EmployeePayroll from "@/_componets/payrollComponent/employeePayroll";
import styles from "./styles/styles.module.css"
const PayrollPage: React.FC = () => {
  return(
    <div className={styles.container}>
      <EmployeePayroll />;
    </div>
  ) 
};

export default PayrollPage;
