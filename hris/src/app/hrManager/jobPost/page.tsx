
import globals from "../styles/global.module.css";
import TrackJobPosts from "@/_componets/trackJobPost/trackJobPosts";

const ManagerJobPostPage: React.FC = () => {
  return (
    <div className={globals.container}>
      <TrackJobPosts/>
    </div>
  );
};

export default ManagerJobPostPage;
