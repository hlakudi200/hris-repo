import React from "react";
import Image from "next/image";

const Profile = () => {
  return (
    <div
      style={{
        backgroundColor: "#ded7d742",
        width: "30%",
        borderRadius: 7,
        display: "flex",
        flexDirection: "column",
        borderWidth: 8,
        borderBlock: "white",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "70%",
          backgroundColor: "white",
          borderRadius: 8,
          paddingBottom: 20,
          marginTop: 20,
          marginBottom: 20,
          display:"flex",
          flexDirection:"column",
          justifyContent:"center",
          alignItems:"center"
        }}
      >
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

      <div
        style={{
          width: "90%",
          backgroundColor: "white",
          borderRadius: 8,
          paddingTop: 20,
          paddingLeft: 20,
          paddingBottom: 20,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 21, color: "#726D6D" }}>
          Position
        </div>
        <div>Graduate Software developer</div>
        <div style={{ fontWeight: 700, fontSize: 21, color: "#726D6D" }}>
          Department
        </div>
        <div>Software Engineering</div>
        <div style={{ fontWeight: 700, fontSize: 21, color: "#726D6D" }}>
          Employee no.
        </div>
        <div>2025000245</div>
        <div style={{ fontWeight: 700, fontSize: 21, color: "#726D6D" }}>
          National Id no.
        </div>
        <div>02145669745321</div>
      </div>
    </div>
  );
};

export default Profile;
