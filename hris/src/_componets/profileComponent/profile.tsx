import React from "react";
import Image from "next/image";
import styles from "./styles/styles.module.css";
import { Button } from "antd";

const Profile = () => {
  return (
    <div className={styles.OuterContainer}>
      <div className={styles.ImgContainer}>
        <Image
          width={150}
          height={150}
          src={"/images/profile-user.png"}
          alt=""
          style={{ marginTop: 20 }}
        ></Image>
        <div style={{ fontWeight: 700, fontSize: 31, color: "#726D6D" }}>
          Rapudi Hlakudi
        </div>
      </div>

      <div className={styles.InfoContainer}>
        <div className={styles.subheading}>Position</div>
        <div>Graduate Software developer</div>
        <div className={styles.subheading}>Department</div>
        <div>Software Engineering</div>
        <div className={styles.subheading}>Employee no.</div>
        <div>2025000245</div>
        <div className={styles.subheading}>National Id no.</div>
        <div>02145669745321</div>
      </div>
      <div style={{marginBottom:20}}>
        <Button type="primary">Update profile</Button>
      </div>
    </div>
  );
};

export default Profile;
