import CreateJobPost from "@/_componets/createJobPost/createJobPost";
import globals from "../styles/global.module.css";
import styles from "./styles/styles.module.css"

const ManagerJobPostPage: React.FC = () => {
  return (
    <div className={globals.container}>
      <div className={styles.leftSection} >
        <CreateJobPost />
      </div>
      <div className={globals.midddleSection}></div>
      <div className={globals.rightSection}></div>
    </div>
  );
};

export default ManagerJobPostPage;
